# backend/analyzer.py
import re

from flask import jsonify, request
from PIL import Image
from PIL.ExifTags import TAGS

# Define threat levels
CRITICAL_TAGS = {
    "GPSInfo",
    "GPSLatitude",
    "GPSLongitude",
    "GPSAltitude",
    "GPSLatitudeRef",
    "GPSLongitudeRef",
    "GPSDateStamp",
    "GPSImgDirection",
    "GPSDestLatitude",
    "GPSDestLongitude",
    "SerialNumber",
    "LensSerialNumber",
    "CameraSerialNumber",
    "OwnerName",
    "Artist",
    "Copyright",
}

WARNING_TAGS = {
    "Make",
    "Model",
    "LensModel",
    "Software",
    "DateTime",
    "DateTimeOriginal",
    "DateTimeDigitized",
    "ModifyDate",
    "CreateDate",
}


def get_threat_level(tag_name):
    if any(crit in tag_name for crit in CRITICAL_TAGS):
        return "critical"
    if any(warn in tag_name for warn in WARNING_TAGS):
        return "warning"
    return "safe"


def register_analyze_route(app):
    @app.route("/analyze", methods=["POST"])
    def analyze():
        if "image" not in request.files:
            return jsonify({"success": False, "error": "No image"}), 400

        file = request.files["image"]
        try:
            img = Image.open(file.stream)
            raw_exif = img._getexif()
            exif_list = []

            if raw_exif is not None:
                for tag_id, value in raw_exif.items():
                    tag_name = TAGS.get(tag_id, f"Unknown_{tag_id}")

                    # Clean up value for display
                    if isinstance(value, bytes):
                        try:
                            value = value.decode(errors="ignore")
                        except:
                            value = "<binary data>"
                    elif isinstance(value, (list, tuple)):
                        value = list(map(str, value))

                    threat = get_threat_level(tag_name)
                    exif_list.append(
                        {
                            "tag": tag_name,
                            "value": str(value),
                            "threat": threat,  # critical | warning | safe
                        }
                    )

            # Sort: critical first, then warning, then safe
            exif_list.sort(
                key=lambda x: (
                    0
                    if x["threat"] == "critical"
                    else 1
                    if x["threat"] == "warning"
                    else 2
                )
            )

            return jsonify(
                {
                    "success": True,
                    "basic_info": {
                        "format": img.format or "Unknown",
                        "size": f"{img.width}×{img.height}",
                        "mode": img.mode,
                    },
                    "metadata": exif_list,  # Now with threat levels!
                    "summary": {
                        "critical": len(
                            [x for x in exif_list if x["threat"] == "critical"]
                        ),
                        "warning": len(
                            [x for x in exif_list if x["threat"] == "warning"]
                        ),
                        "safe": len([x for x in exif_list if x["threat"] == "safe"]),
                    },
                }
            )

        except Exception as e:
            import traceback

            traceback.print_exc()
            return jsonify({"success": False, "error": str(e)}), 500
