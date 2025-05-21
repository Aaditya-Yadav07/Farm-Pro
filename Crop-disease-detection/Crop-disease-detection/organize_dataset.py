import os
import shutil
import random
from pathlib import Path

# Paths
BASE_DIR = Path("dataset//plantvillage")
TRAIN_DIR = BASE_DIR / "train"
VAL_DIR = BASE_DIR / "val"

# Percentage of data for validation
VAL_SPLIT = 0.2

# Create train and val directories
TRAIN_DIR.mkdir(parents=True, exist_ok=True)
VAL_DIR.mkdir(parents=True, exist_ok=True)

# Loop through each disease class folder
for class_dir in BASE_DIR.iterdir():
    if class_dir.is_dir() and class_dir.name not in ["train", "val"]:
        images = list(class_dir.glob("*.jpg")) + list(class_dir.glob("*.JPG")) + list(class_dir.glob("*.png"))
        random.shuffle(images)

        split_index = int(len(images) * (1 - VAL_SPLIT))
        train_images = images[:split_index]
        val_images = images[split_index:]

        # Make class folders inside train/ and val/
        (TRAIN_DIR / class_dir.name).mkdir(parents=True, exist_ok=True)
        (VAL_DIR / class_dir.name).mkdir(parents=True, exist_ok=True)

        # Move images
        for img in train_images:
            shutil.copy(img, TRAIN_DIR / class_dir.name / img.name)

        for img in val_images:
            shutil.copy(img, VAL_DIR / class_dir.name / img.name)

print("✅ Dataset organized into train/ and val/ folders.")
