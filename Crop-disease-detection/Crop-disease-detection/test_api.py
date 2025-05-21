import requests

url = "http://127.0.0.1:5000/predict"
image_path = "C:/Users/HP/OneDrive/Desktop/Crop-disease-detection/dataset/train/Tomato_Early_blight/0a2726e0-3358-4a46-b6dc-563a5a9f2bdf___RS_Erly.B 7860.JPG"  # replace with actual path

with open(image_path, "rb") as img:
    response = requests.post(url, files={"image": img})

print(response.json())
