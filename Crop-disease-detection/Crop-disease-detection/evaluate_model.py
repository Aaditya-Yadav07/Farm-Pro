import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

# Load the trained model
model = tf.keras.models.load_model('crop_disease_model.h5')

# Path to your validation or test dataset
val_data_dir = 'C:/Users/HP/OneDrive/Desktop/Crop-disease-detection/dataset/val'

# Image preprocessing (same as used during training)
val_datagen = ImageDataGenerator(rescale=1./255)

# Load the validation data
val_generator = val_datagen.flow_from_directory(
    val_data_dir,
    target_size=(128, 128),
    batch_size=32,
    class_mode='categorical',
    shuffle=False
)

# Evaluate the model
loss, accuracy = model.evaluate(val_generator)
print(f"\n✅ Validation Accuracy: {accuracy * 100:.2f}%")
print(f"📉 Validation Loss: {loss:.4f}")
