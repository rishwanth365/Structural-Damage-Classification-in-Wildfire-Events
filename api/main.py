from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Load saved models and encoders
model = joblib.load("model/decision_tree_model.pkl")
label_encoder = joblib.load("model/label_encoder.pkl")
one_hot_encoders = joblib.load("model/one_hot_encoders.pkl")
ordinal_encoder = joblib.load("model/ordinal_encoder.pkl")
model_features = joblib.load("model/encoded_data_columns.pkl")

# Load the trained scaler
scaler = joblib.load("model/scaler.pkl")


# Define FastAPI app
app = FastAPI()

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Replace with a specific domain for production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Define request body schema
class FireIncident(BaseModel):
    CAL_FIRE_Unit: str
    Structure_Type: str
    Roof_Construction: str
    Vent_Screen: str
    Exterior_Siding: str
    Window_Pane: str
    Latitude: float
    Longitude: float
    Incident_Start_Year: int
    Incident_Start_Month: int
    Incident_Start_Day: int

# Define prediction function
@app.post("/predict")
def predict_damage(data: FireIncident):
    input_data = data.dict()

    # Convert input dictionary to DataFrame
    df_input = pd.DataFrame([input_data])

    # Label Encoding
    df_input["CAL_FIRE_Unit"] = label_encoder.transform(df_input["CAL_FIRE_Unit"])

    # Apply scaling before prediction
    df_input[["Latitude", "Longitude"]] = scaler.transform(df_input[["Latitude", "Longitude"]])

    # One-Hot Encoding
    for col, encoder in one_hot_encoders.items():
        encoded_data = encoder.transform(df_input[[col]])
        new_columns = [f"{col}_{category}" for category in encoder.categories_[0]]
        df_encoded = pd.DataFrame(encoded_data, columns=new_columns)
        df_input = pd.concat([df_input.drop(columns=[col]), df_encoded], axis=1)

    # Ensure all model features exist
    for col in model_features:
        if col not in df_input:
            df_input[col] = 0  # Add missing columns with default value

    # Reorder columns to match training
    df_input = df_input[model_features]

    # Make prediction
    prediction = model.predict(df_input)

    print(df_input.head())

    # Decode damage category
    predicted_damage = ordinal_encoder.inverse_transform([[prediction[0]]])[0][0]

    return {"Predicted Damage": predicted_damage}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)