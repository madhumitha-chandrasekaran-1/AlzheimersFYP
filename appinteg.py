from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2
import joblib

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# ✅ Load CNN Model for MRI Classification
# cnn_model = tf.keras.models.load_model("C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/model.h5")
cnn_model = tf.keras.models.load_model(
    "C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/model.h5", compile=False
)

# ✅ Load LSTM (RandomForest) Model for Cognitive Decline Prediction
lstm_model = joblib.load("C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/alzheimers_lstm_model.pkl")

# ✅ Labels for Predictions
CLASS_LABELS = ["Non Demented", "Very Mild Dementia", "Mild Dementia", "Moderate Dementia"]
TREND_LABELS = ["Declining", "Stable", "Improving"]

# ✅ Default Homepage Route
@app.route("/", methods=["GET"])
def home():
    return """
    <h1>Welcome to THOZHA API</h1>
    <p>Use this API to classify MRI scans and predict Alzheimer's progression.</p>
    """

# ✅ MRI Classification Endpoint
@app.route("/predict_stage", methods=["POST"])
def predict_stage():
    try:
        # 🔹 Get uploaded image
        file = request.files["image"]
        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        image = cv2.resize(image, (128, 128)) / 255.0  # Resize & Normalize
        image = np.expand_dims(image, axis=0)

        # 🔹 Predict Alzheimer’s stage
        prediction = cnn_model.predict(image)
        label = CLASS_LABELS[np.argmax(prediction)]

        return jsonify({"stage": label, "confidence": float(np.max(prediction))})

    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ Cognitive Decline Prediction Endpoint
@app.route("/predict_progression", methods=["POST"])
def predict_progression():
    try:
        data = request.json["features"]  # Expecting MMSE features as JSON list
        features = np.array(data).reshape(1, -1)

        # 🔹 Predict cognitive decline trend
        prediction = lstm_model.predict(features)
        trend = TREND_LABELS[int(prediction[0])]

        return jsonify({"progression_trend": trend})

    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ Run Flask App
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)








# from flask import Flask, request, jsonify
# import tensorflow as tf
# import numpy as np
# import joblib
# import cv2
# from flask_cors import CORS  # ✅ Import CORS to allow cross-origin requests

# app = Flask(__name__)
# CORS(app)  # ✅ Allow all domains to access the API

# # Load Models
# cnn_model = tf.keras.models.load_model("C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/model.h5")
# lstm_model = joblib.load("C:/Users/hi/Documents/sem 7/fyp/sem8/appThozha/alzheimers_lstm_model.pkl") 

# CLASS_LABELS = ["Non Demented", "Very Mild Dementia", "Mild Dementia", "Moderate Dementia"]
# TREND_LABELS = ["Declining", "Stable", "Improving"]

# @app.route("/predict_stage", methods=["POST"])
# def predict_stage():
#     try:
#         file = request.files["image"]
#         image = np.frombuffer(file.read(), np.uint8)
#         image = cv2.imdecode(image, cv2.IMREAD_COLOR)
#         image = cv2.resize(image, (128, 128)) / 255.0
#         image = np.expand_dims(image, axis=0)

#         prediction = cnn_model.predict(image)
#         label = CLASS_LABELS[np.argmax(prediction)]

#         return jsonify({"stage": label, "confidence": float(np.max(prediction))})

#     except Exception as e:
#         return jsonify({"error": str(e)})

# @app.route("/predict_progression", methods=["POST"])
# def predict_progression():
#     try:
#         data = request.json["features"]
#         features = np.array(data).reshape(1, -1)
#         prediction = lstm_model.predict(features)
#         trend = TREND_LABELS[int(prediction[0])]

#         return jsonify({"progression_trend": trend})

#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8080, debug=True)























# # from flask import Flask, request, jsonify
# # import tensorflow as tf
# # import numpy as np
# # import cv2
# # import joblib
# # import pandas as pd

# # app = Flask(__name__)

# # # Load CNN Model for MRI Classification
# # cnn_model = tf.keras.models.load_model("/Users/madhumithachandrasekaran/Downloads/model.h5")

# # # Load LSTM (RandomForest) Model for Cognitive Decline Prediction
# # lstm_model = joblib.load("/Users/madhumithachandrasekaran/Downloads/alzheimers_lstm_model.pkl")  # Update with actual model path

# # # Define Labels for Classification
# # CLASS_LABELS = ["Non Demented", "Very Mild Dementia", "Mild Dementia", "Moderate Dementia"]
# # TREND_LABELS = ["Declining", "Stable", "Improving"]

# # # ✅ Default Homepage Route
# # @app.route("/", methods=["GET"])
# # def home():
# #     return """
# #     <h1>Welcome to THOZHA API</h1>
# #     <p>Use this API to classify MRI scans and predict Alzheimer's progression.</p>
# #     <ul>
# #         <li><b>POST /predict_stage</b>: Upload an MRI scan to classify Alzheimer's stage.</li>
# #         <li><b>POST /predict_progression</b>: Send patient MMSE features to predict progression.</li>
# #     </ul>
# #     """

# # # MRI Classification Endpoint
# # @app.route("/predict_stage", methods=["POST"])
# # def predict_stage():
# #     try:
# #         # Get uploaded image
# #         file = request.files["image"]
# #         image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
# #         image = cv2.resize(image, (128, 128)) / 255.0  # Resize & Normalize
# #         image = np.expand_dims(image, axis=0)

# #         # Predict Alzheimer’s stage
# #         prediction = cnn_model.predict(image)
# #         label = CLASS_LABELS[np.argmax(prediction)]

# #         return jsonify({"stage": label, "confidence": float(np.max(prediction))})

# #     except Exception as e:
# #         return jsonify({"error": str(e)})

# # # Cognitive Decline Prediction Endpoint
# # @app.route("/predict_progression", methods=["POST"])
# # def predict_progression():
# #     try:
# #         data = request.json["features"]  # Expecting MMSE-related features as JSON list
# #         features = np.array(data).reshape(1, -1)

# #         # Predict cognitive decline trend
# #         prediction = lstm_model.predict(features)
# #         trend = TREND_LABELS[int(prediction[0])]

# #         return jsonify({"progression_trend": trend})

# #     except Exception as e:
# #         return jsonify({"error": str(e)})

# # # Run Flask App
# # if __name__ == "__main__":
# #     app.run(host="0.0.0.0", port=8080, debug=True)
