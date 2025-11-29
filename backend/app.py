# backend/app.py
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow Vite frontend to connect

# Import and register routes
from analyzer import register_analyze_route
from cleaner import register_clean_route

register_clean_route(app)
register_analyze_route(app)


@app.route("/")
def home():
    return "StripClean Backend Running — /clean & /analyze ready!"


if __name__ == "__main__":
    print("StripClean backend → http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
