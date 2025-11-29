# backend/cleaner.py
from io import BytesIO

from flask import request, send_file
from PIL import Image
from werkzeug.utils import secure_filename


def register_clean_route(app):
    @app.route("/clean", methods=["POST"])
    def clean():
        if "image" not in request.files:
            return "No image uploaded", 400

        file = request.files["image"]
        if file.filename == "":
            return "Empty filename", 400

        try:
            img = Image.open(file.stream)
            output = BytesIO()

            # This removes ALL metadata (EXIF, IPTC, XMP, ICC, etc.)
            if img.format in ["JPEG", "JPG"]:
                img.save(output, format="JPEG", quality=95, exif=b"")
            else:
                # PNG, WebP, GIF, TIFF → Pillow strips metadata by default when re-saving
                img.save(output, format=img.format or "JPEG")

            output.seek(0)

            return send_file(
                output,
                mimetype=f"image/{img.format.lower() if img.format else 'jpeg'}",
                as_attachment=False,
                download_name=f"cleaned_{secure_filename(file.filename)}",
            )
        except Exception as e:
            return f"Error: {str(e)}", 500
