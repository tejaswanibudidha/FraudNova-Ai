
import shap
import numpy as np

def cnn_lstm_predict(model, X):
    X = np.asarray(X, dtype=np.float32)
    X = X.reshape(X.shape[0], X.shape[1], 1)
    return model.predict(X, verbose=0).reshape(-1)

def create_shap_explainer(model, background_data):
    return shap.KernelExplainer(
        lambda X: cnn_lstm_predict(model, X),
        background_data
    )
