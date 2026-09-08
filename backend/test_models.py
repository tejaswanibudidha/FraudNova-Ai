import os
import json
import warnings
import joblib
import numpy as np

# Suppress version mismatch warnings
warnings.filterwarnings("ignore")

# Scikit-learn cross-version compatibility patch for Colab sklearn 1.6.1 -> 1.9.0
import sklearn.compose._column_transformer as ct
if not hasattr(ct, "_RemainderColsList"):
    ct._RemainderColsList = type("_RemainderColsList", (list,), {})

# Configure Keras loader (supports both tf.keras and keras)
os.environ["KERAS_BACKEND"] = "torch"
try:
    import tensorflow as tf
    load_model = tf.keras.models.load_model
except Exception:
    import keras
    load_model = keras.models.load_model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ML_DIR = os.path.join(BASE_DIR, "ml")
if not os.path.exists(ML_DIR):
    ML_DIR = os.path.join(BASE_DIR, "backend", "ml")


print("Loading CNN + BiLSTM...")

cnn_lstm_model = load_model(
    os.path.join(ML_DIR, "cnn_lstm_model.keras")
)

print("CNN + BiLSTM loaded")


print("Loading feature extractor...")

feature_extractor = load_model(
    os.path.join(ML_DIR, "feature_extractor.keras")
)

print("Feature extractor loaded")


print("Loading preprocessor...")

preprocessor = joblib.load(
    os.path.join(ML_DIR, "preprocessor.pkl")
)

print("Preprocessor loaded")


print("Loading PCA...")

pca = joblib.load(
    os.path.join(ML_DIR, "pca.pkl")
)

print("PCA loaded")


print("Loading QSVM...")

qsvm_model = joblib.load(
    os.path.join(ML_DIR, "qsvm_model.pkl")
)

print("QSVM loaded")


qsvm_states = np.load(
    os.path.join(ML_DIR, "qsvm_train_states.npy")
)

print("QSVM states loaded")


with open(
    os.path.join(
        ML_DIR,
        "final_pipeline_features.json"
    ),
    "r"
) as f:
    config = json.load(f)


print("\n========== MODEL INFORMATION ==========")

print(
    "CNN input:",
    cnn_lstm_model.input_shape
)

print(
    "Feature extractor:",
    feature_extractor.output_shape
)

print(
    "PCA input features:",
    pca.n_features_in_
)

print(
    "PCA components:",
    pca.n_components_
)

print(
    "QSVM kernel:",
    getattr(qsvm_model, 'kernel', 'precomputed')
)

print(
    "QSVM states:",
    qsvm_states.shape
)

print(
    "Selected indices:",
    config["selected_indices"]
)

print("\n=======================================")
print("ALL MODEL FILES LOADED SUCCESSFULLY")
