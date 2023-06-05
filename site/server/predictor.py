import sys
import pandas as pd
import joblib

# Load the new data for prediction
prediction_data = pd.DataFrame({
    "Age": [int(sys.argv[1])],
    "EstimatedSalary": [int(sys.argv[2])]
})

# Load the saved model from file
clf = joblib.load('./../trained_model.pkl')

# Perform predictions on the new data
predictions = clf.predict(prediction_data)

# Print the predictions
print(predictions)