# **Structural Damage Classification in Wildfire Events**

A data-driven project aimed at predicting the extent of structural damage in wildfire events based on various building and environmental factors. The project utilizes machine learning techniques for classification and provides a user-friendly web interface for predictions.

---
![image](https://github.com/user-attachments/assets/711d43bf-31d2-4ca0-a2a2-bfb34e795e63)

---

## **Steps Followed in the Project**

### **1. Problem Understanding**
- **Objective**: Predict structural damage severity during wildfire incidents using building characteristics and geographical attributes.
- **Type of Problem**: Classification problem (predicting categorical damage levels).

---

### **2. Dataset Overview**
The dataset includes the following features:
- `CAL FIRE Unit`: The region under CAL FIRE jurisdiction.
- `Structure Type`: Type of structure (e.g., single-family residence, commercial, etc.).
- `Roof Construction`: Material used for the roof (e.g., asphalt, metal, tile, etc.).
- `Vent Screen`: Mesh size of vent screens (e.g., <= 1/8", none, etc.).
- `Exterior Siding`: Type of exterior siding material (e.g., wood, stucco, etc.).
- `Window Pane`: Type of window glazing (e.g., single-pane, double-pane, etc.).
- `Incident Start Date`: Date of the wildfire event.
- `Latitude & Longitude`: Geographic coordinates of the structure.
- `Damage`: Target variable indicating the extent of structural damage.

**Key Observations**:
- Certain materials and construction types exhibit higher vulnerability to wildfires.
- Location-based factors may influence damage severity.
- Feature encoding was performed for categorical variables.

---

### **3. Data Preparation**
1. **Imported Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn.
2. **Dataset Loading**: Data was read, cleaned, and structured for modeling.
3. **Missing Values**: Checked and handled missing values appropriately.
4. **Exploratory Data Analysis (EDA)**:
   - Visualized feature distributions and their relationship with damage levels.
   - Identified potential correlations and risk factors.

---

### **4. Feature Engineering**
1. **Handeled Incident Start Date**: As the Machine Learning couldn't understand date foramt so created new columns seperately for Incident Start Year, Month & Day.
2. **Categorical Encoding**: Encoded categorical variables such as `CAL FIRE Unit`, `Structure Type`, `Roof Construction`, `Vent Screen`, `Exterior Siding`, `Window Pane` & `Damage`.
3. **Scaling**: Standardized numerical features (`Latitude`, `Longitude`).
4. **Data Splitting**: Split the dataset into training and testing sets for model evaluation.

---

### **5. Model Building**
Implemented the following classification models:
1. **Logistic Regression**
2. **Decision Tree Classifier**
3. **Random Forest Classifier**
4. **Gradient Boosting Classifier**
5. **XGBoost Classifier**

---

### **6. Model Evaluation**
- **Evaluation Metrics**:
  - Accuracy Score
  - Precision, Recall, and F1-Score
  - Confusion Matrix
- The models were compared, and the best-performing model was selected based on classification accuracy and recall for severe damage cases.

---

### **7. Results Visualization**
1. **Confusion Matrix**: To understand misclassifications.
2. **Feature Importance**: Identified key predictors of structural damage.

---

### **8. Deployment**
The best-performing model decision tree classifier model was saved and deployed as a web application:
- **Model Saved**:
   ```python
   import joblib
   joblib.dump(best_model, 'wildfire_damage_model.pkl')
   ```
- **Web Application**:
   - Backend developed using **FastAPI**.
   - Frontend implemented with HTML, CSS, and JavaScript for user input and predictions.

---

## **Project Structure**
```plaintext
project/
├── api/
│   ├── main.py                                   # FastAPI backend for handling predictions
├── data/
│   ├── california-wildfire-dataset.csv           # Dataset used for model training
├── frontend/
│   ├── index.html                                # Web interface for the application
│   ├── styles.css                                # Styling for the web page
│   ├── script.js                                 # Form handling and API interaction
├── model/
│   ├── Structural Damage Classification.ipynb    # Notebook for EDA and model training
│   ├── decision_tree_model.pkl                   # Saved machine learning model
    ├── encoded_data_columns.pkl
    ├── label_encoder.pkl
    ├── model_scaler.pkl                 
    ├── one_hot_encoders.pkl
    ├── ordinal_encoder.pkl
    ├── scaler.pkl
├── README.md                                     # Project documentation
```

---

## **How to Run the Project**

### **Backend**
1. Navigate to the `api/` directory.
2. Run the `main.py` file using Python.
3. The backend will start at `http://localhost:8000`.

### **Frontend**
1. Open the `index.html` file in the `frontend/` directory.
2. Fill out the form with structure details and submit to get the predicted damage classification.

---

## **Future Scope**
- Improve model accuracy by incorporating additional environmental variables.
- Implement GIS-based analysis for better risk assessment.
- Deploy the application to a cloud service for real-time wildfire damage predictions.

---
