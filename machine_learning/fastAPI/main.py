from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd

# Load your machine learning model and label encoder
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('mlb.pkl', 'rb') as mlb_file:
    mlb = pickle.load(mlb_file)

with open('encoder.pkl', 'rb') as encoder_file:
    encoder = pickle.load(encoder_file)

with open('label_encoder.pkl', 'rb') as label_encoder_file:
    label_encoder = pickle.load(label_encoder_file)

with open('tickers.pkl', 'rb') as tickers_file:
    tickers = pickle.load(tickers_file)

# Create the FastAPI instance
app = FastAPI()

# Define the structure of the input data (based on your previous request)
class AssetRequest(BaseModel):
    knowledgeLevel: str
    goals: list
    riskPreference: str
    monthlyIncome: float
    monthlyExpenses: float
    savingsPercentage: float
    top_n: int

# Define the prediction endpoint
@app.post("/recommend-assets")
def recommend_assets(request: AssetRequest):
    # Convert input data into a NumPy array and reshape for the model
    input_data = [
        request.knowledgeLevel,
        request.goals,
        request.riskPreference,
        request.monthlyIncome,
        request.monthlyExpenses,
        request.savingsPercentage,
    ]
    
    # Ensure the input is in the correct shape (as the model expects)
    input_array = np.array(input_data).reshape(1, -1)

    # Encode goals using MultiLabelBinarizer (mlb)
    goals_encoded = mlb.transform([request.goals])  # Ensure goals is passed as a list of lists
    print(f"Encoded goals: {goals_encoded}")

    # Combine goals_encoded with other input features (make sure input_array is compatible)
    input_array = np.hstack([input_array, goals_encoded])

    # Get prediction probabilities from the model
    probabilities = model.predict_proba(input_array)
    
    # Extract top_n asset recommendations based on probabilities
    top_indices = probabilities.argsort(axis=1)[0, -request.top_n:][::-1]
    print(f"Top indices: {top_indices}")

    recommended_assets = label_encoder.inverse_transform(top_indices)

    return {"recommended_assets": recommended_assets.tolist()}

