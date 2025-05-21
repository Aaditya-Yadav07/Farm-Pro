from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)


CORS(app)  # 👈 This enables CORS for all routes


# Load model
model = load_model("crop_disease_model.h5")

#'PlantVillage': 2, 'Potato___Early_blight': 3, 'Potato___Late_blight': 4, 'Potato___healthy': 5, 'Tomato_Bacterial_spot': 6, 'Tomato_Early_blight': 7, 'Tomato_Late_blight': 8, 'Tomato_Leaf_Mold': 9, 'Tomato_Septoria_leaf_spot': 10, 'Tomato_Spider_mites_Two_spotted_spider_mite': 11, 'Tomato__Target_Spot': 12, 'Tomato__Tomato_YellowLeaf__Curl_Virus': 13, 'Tomato__Tomato_mosaic_virus': 14, 'Tomato_healthy': 15

# Class names must match training order
class_names = sorted([
  'Pepper__bell___Bacterial_spot',
    'Pepper__bell___healthy', 
    'PlantVillage', 
    'Potato___Early_blight', 
    'Potato___Late_blight', 
    'Potato___healthy', 
    'Tomato_Bacterial_spot', 
    'Tomato_Early_blight',
      'Tomato_Late_blight', 
      'Tomato_Leaf_Mold', 
      'Tomato_Septoria_leaf_spot',
        'Tomato_Spider_mites_Two_spotted_spider_mite',
          'Tomato__Target_Spot', 
          'Tomato__Tomato_YellowLeaf__Curl_Virus',
            'Tomato__Tomato_mosaic_virus', 
            'Tomato_healthy'
])

@app.route('/')
def home():
    return "Prediction of crop disease"

@app.route('/predict', methods=['GET','POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in request'}), 400

    file = request.files['image']
    filepath = os.path.join('static/uploads', file.filename)
    file.save(filepath)

    # Preprocess
    img = image.load_img(filepath, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Predict
    prediction = model.predict(img_array)
    predicted_index = int(np.argmax(prediction))
    predicted_class = class_names[predicted_index]

    return jsonify({
        'predicted_class': predicted_class,
        'class_index': predicted_index
    })

if __name__ == '__main__':
    app.run(debug=True)
