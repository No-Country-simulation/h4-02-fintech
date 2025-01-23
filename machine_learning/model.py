# Fetching Data

import os
import requests
import numpy as np
import pandas as pd
import time

ASSETS = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "GOOGL", "VOO", "IVV", "HYG", "CWB", "BND", "EUR/USD"]
start_date = "2023-01-01"
end_date = "2024-12-31"
interval = "1day"
API_KEY = "e914323ec75c49ad93bbfb6b024e97c2"
API_CREDITS_LIMIT = 8  # Adjust to your actual API plan

def fetch_data(ticker):
    url = f"https://api.twelvedata.com/time_series?symbol={ticker}&start_date={start_date}&end_date={end_date}&interval={interval}&outputsize=5000&apikey={API_KEY}"
    response = requests.get(url)
    data = response.json()
    if "values" not in data:
        print(f"Error fetching data for {ticker}: {data.get('message', 'Unknown error')}")
        return pd.DataFrame()
    df = pd.DataFrame(data["values"])
    df["ticker"] = ticker
    return df

def handle_rate_limits(assets):
    all_data = []
    credits_used = 0

    for asset in assets:
        if credits_used >= API_CREDITS_LIMIT:
            print("Rate limit reached. Waiting for 60 seconds...")
            time.sleep(60)
            credits_used = 0

        print(f"Fetching data for {asset}...")
        data = fetch_data(asset)
        if not data.empty:
            all_data.append(data)
        credits_used += 1

    return all_data

def clean_data(dataframe):
    dataframe["datetime"] = pd.to_datetime(dataframe["datetime"])
    dataframe.columns = dataframe.columns.str.replace(' ', '_').str.lower()
    dataframe = dataframe.sort_values(by=["datetime", "ticker"]).reset_index(drop=True)
    return dataframe

all_data = handle_rate_limits(ASSETS)
combined_data = pd.concat(all_data, ignore_index=True)
processed_data = clean_data(combined_data)

print(processed_data.head())


processed_data.info()

# Code to Clean the Data

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Convert numerical columns to float
numeric_columns = ["open", "high", "low", "close", "volume"]

for col in numeric_columns:
    processed_data[col] = pd.to_numeric(processed_data[col], errors="coerce")

# Visualize missing values
plt.figure(figsize=(10, 6))
sns.heatmap(processed_data.isnull(), cbar=False, cmap='viridis')
plt.title("Missing Values Heatmap")
plt.show()

# Check for missing values
missing_summary = processed_data.isnull().sum()
print("Missing values summary:\n", missing_summary)

# Check for duplicate values
duplicate_count = processed_data.duplicated().sum()
print("Number of duplicate rows:", duplicate_count)

# Handle missing values by dropping rows with NaN
processed_data = processed_data.dropna()

# Drop rows where volume is zero
processed_data = processed_data[processed_data["volume"] > 0]
print(f"Rows with volume=0 removed. New data shape: {processed_data.shape}")

# Function to remove outliers using IQR
def remove_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]

# Apply outlier removal to numeric columns and visualize with box plots
plt.figure(figsize=(15, 8))
for i, col in enumerate(numeric_columns):
    plt.subplot(2, 3, i + 1)
    sns.boxplot(data=processed_data, x=col)
    plt.title(f"Box Plot for {col}")

plt.tight_layout()
plt.show()

# Remove outliers from the numeric columns
for col in numeric_columns:
    processed_data = remove_outliers(processed_data, col)

print(f"Outliers removed. New data shape: {processed_data.shape}")

# Confirm data types and preview the cleaned data
print(processed_data.info())
print(processed_data.head())


processed_data.ticker.unique()


import numpy as np

# Define possible values for categorical features
knowledge_levels = ["principiante", "intermedio", "avanzado"]
goals = ["vacaciones", "bienes", "retiro", "proyecto"]
risk_preferences = ["bajo", "moderado", "alto"]

# Simulate 1000 user profiles
np.random.seed(42)  # For reproducibility
user_profiles = pd.DataFrame({
    "user_id": range(1, 1001),
    "knowledgeLevel": np.random.choice(knowledge_levels, 1000),
    "goals": [np.random.choice(goals, size=np.random.randint(1,3), replace=False).tolist() for _ in range(1000)],
    "riskPreference": np.random.choice(risk_preferences, 1000),
    "monthlyIncome": np.random.normal(4000, 1500, 1000).clip(1000, 10000),  # Income between $1000 and $10000
    "monthlyExpenses": np.random.normal(2000, 800, 1000).clip(500, 8000),
    "savingsPercentage": np.random.uniform(5, 50, 1000)
})

# Display sample user profiles
print(user_profiles.head())


user_profiles.head()

user_profiles.info()

asset_risk_mapping = {
    "AAPL": "alto",      # Tech giant with significant market fluctuations
    "AMZN": "alto",      # E-commerce and cloud leader; high growth and volatility
    "BND": "bajo",       # Bond market ETF, low volatility
    "CWB": "moderado",   # Convertible bond ETF, moderate risk-return balance
    "GOOGL": "alto",     # High-growth tech company
    "HYG": "moderado",   # High-yield corporate bond ETF, moderate risk
    "IVV": "bajo",       # S&P 500 ETF, broad market exposure with moderate stability
    "MSFT": "moderado",  # Mature tech stock with relatively stable growth
    "TSLA": "alto",      # High volatility in the electric vehicle market
    "VOO": "bajo",       # S&P 500 ETF, similar to IVV
    "NVDA": "alto"       # Semiconductor company, highly volatile with tech trends
}

# Add asset category to processed data
processed_data["riskCategory"] = processed_data["ticker"].map(asset_risk_mapping)

# Ensure mapping is valid
print(processed_data[["ticker", "riskCategory"]].drop_duplicates())


processed_data.head()

processed_data.info()

!pip install yfinance


import yfinance as yf
def fetch_and_calculate_features(tickers, start_date="2021-01-01", end_date="2025-01-01"):
    # Download historical data from Yahoo Finance
    data = yf.download(tickers, start=start_date, end=end_date)

    # Initialize a dictionary to store processed data for each ticker
    processed_data_dict = {}

    # Loop through each ticker to calculate the desired features
    for ticker in tickers:
        # Get the specific stock's data
        stock_data = data["Close"][ticker].dropna()

        # Ensure that the stock data is in numeric format
        stock_data = pd.to_numeric(stock_data, errors='coerce')

        # Calculate 5-day moving average
        stock_data["5_day_MA"] = stock_data.rolling(window=5).mean()

        # Calculate Volatility (Standard Deviation of daily returns)
        stock_data["daily_return"] = stock_data.pct_change()
        stock_data["volatility"] = stock_data["daily_return"].rolling(window=5).std() * (252 ** 0.5)  # Annualized

        # Add the processed data for the ticker to the dictionary
        processed_data_dict[ticker] = stock_data

    return processed_data_dict



# Loop through each ticker to calculate the desired features
def fetch_and_calculate_features(tickers, start_date="2023-01-01", end_date="2025-01-01"):


  # Download historical data from Yahoo Finance
  data = yf.download(tickers, start=start_date, end=end_date)

    # Initialize a dictionary to store processed data for each ticker
  processed_data_dict = {}

  for ticker in tickers:
    # Get the specific stock's data for "Close" prices only
    stock_data = data["Close"][ticker].dropna()

    # Ensure that the stock data is in numeric format
    stock_data = pd.to_numeric(stock_data, errors='coerce')

    # Check for any NaN values introduced after conversion
    if stock_data.isnull().any():
        print(f"Warning: There are NaN values in the data for {ticker} after conversion.")

    # Check if data conversion worked (e.g., convert to float and display)
  print(f"Data for {ticker} (after conversion to numeric):")
  print(stock_data.head())
  print(f"Data types for {ticker}:")
  print(stock_data.dtypes)  # Ensure that the data type is now numeric

tickers = ["AAPL", "AMZN", "BND", "CWB", "GOOGL", "HYG", "IVV", "MSFT", "TSLA", "VOO", "NVDA"]
fetch_and_calculate_features(tickers)

import pandas as pd
import yfinance as yf

def fetch_and_calculate_features(tickers, start_date="2023-01-01", end_date="2025-01-01"):
    # Download historical data from Yahoo Finance
    data = yf.download(tickers, start=start_date, end=end_date)

    # Initialize a dictionary to store processed data for each ticker
    processed_data_dict = {}

    for ticker in tickers:
        # Get the specific stock's data for "Close" prices only
        stock_data = data["Close"][ticker].dropna()

        # Ensure that the stock data is in numeric format
        stock_data = pd.to_numeric(stock_data, errors='coerce')

        # Drop any rows with missing values after conversion
        stock_data = stock_data.dropna()

        # Convert Series to DataFrame for further operations
        stock_data = stock_data.to_frame(name="Close")

        # Calculate 5-day moving average
        stock_data["5_day_MA"] = stock_data["Close"].rolling(window=5).mean()

        # Calculate daily returns
        stock_data["daily_return"] = stock_data["Close"].pct_change()

        # Calculate volatility (standard deviation of daily returns)
        stock_data["volatility"] = (
            stock_data["daily_return"].rolling(window=5).std() * (252 ** 0.5)  # Annualized
        )

        # Add the processed data for the ticker to the dictionary
        processed_data_dict[ticker] = stock_data

        # Print out the processed data for checking
        print(f"Processed data for {ticker}:")
        print(stock_data.head())
        print(f"Data types for {ticker}:")
        print(stock_data.dtypes)

    # Optionally, return the processed data as a dictionary of DataFrames
    return processed_data_dict

# List of tickers
tickers = ["AAPL", "AMZN", "BND", "CWB", "GOOGL", "HYG", "IVV", "MSFT", "TSLA", "VOO", "NVDA"]
processed_data = fetch_and_calculate_features(tickers)


def fetch_and_calculate_features(tickers, start_date="2023-01-01", end_date="2025-01-01"):
    # Download historical data from Yahoo Finance
    data = yf.download(tickers, start=start_date, end=end_date, group_by="ticker")

    # Initialize a list to store processed DataFrames
    combined_data_list = []

    for ticker in tickers:
        # Get the specific stock's data
        stock_data = data[ticker].dropna()

        # Ensure that all columns are numeric where applicable
        for col in ["Open", "High", "Low", "Close", "Volume"]:
            stock_data[col] = pd.to_numeric(stock_data[col], errors='coerce')

        # Drop rows with missing values
        stock_data = stock_data.dropna()

        # Calculate additional features
        stock_data["5_day_MA"] = stock_data["Close"].rolling(window=5).mean()
        stock_data["daily_return"] = stock_data["Close"].pct_change()
        stock_data["volatility"] = (
            stock_data["daily_return"].rolling(window=5).std() * (252 ** 0.5)
        )

        # Add a column for the ticker
        stock_data["ticker"] = ticker

        # Reset the index to have 'datetime' as a column
        stock_data.reset_index(inplace=True)

        # Select and reorder columns for consistency
        stock_data = stock_data[
            ["Date", "ticker", "Open", "High", "Low", "Close", "Volume", "5_day_MA", "volatility"]
        ]

        # Append the processed DataFrame to the list
        combined_data_list.append(stock_data)

    # Combine all the individual DataFrames into a single DataFrame
    combined_data = pd.concat(combined_data_list, axis=0, ignore_index=True)

    return combined_data

# List of tickers
tickers = ["AAPL", "AMZN", "BND", "CWB", "GOOGL", "HYG", "IVV", "MSFT", "TSLA", "VOO", "NVDA"]
processed_data = fetch_and_calculate_features(tickers)

# Display the combined DataFrame
print(processed_data.head())


processed_data.head()

processed_data.info()

processed_data.isnull().sum()

processed_data.dropna(inplace=True)

processed_data.info()

**Step 1: Data Preparation**

Merge user_profiles with processed_data:

Join user_profiles with the processed stock data (processed_data) based on recommended assets (ticker).
Use a rule-based system to map the user's riskPreference to appropriate asset tickers, then merge the datasets.

# Explode user profiles by recommended assets
asset_classes = {
    'bajo': ['BND', 'IVV', 'VOO' ],  # Low-risk assets
    'moderado': ['CWB', 'HYG', 'MSFT'],  # Moderate-risk assets
    'alto': ['AAPL', 'GOOGL', 'TSLA', 'NVDA']  # High-risk assets
}

def map_assets(risk):
    return asset_classes.get(risk.lower(), [])

user_profiles['recommended_assets'] = user_profiles['riskPreference'].apply(map_assets)
user_profiles = user_profiles.explode('recommended_assets')

# Merge with processed data
merged_data = pd.merge(
    user_profiles,
    processed_data,
    left_on='recommended_assets',
    right_on='ticker',
    how='inner'
)


merged_data

**Feature Engineering:**

Add features derived from financial and user data:
financial_stability: (monthlyIncome - monthlyExpenses) / monthlyIncome
Normalize or standardize numerical features (e.g., income, expenses, savings, volatility).

merged_data['financial_stability'] = (
    (merged_data['monthlyIncome'] - merged_data['monthlyExpenses']) / merged_data['monthlyIncome']
)


**Define Rules for Each Risk Level**

Each risk level can have distinct criteria for recommending assets:

Low Risk (bajo): Focus on low-volatility assets like bonds or index funds (e.g., BND, HYG).
Moderate Risk (moderado): Include assets with medium volatility, such as diversified ETFs or blue-chip stocks (IVV, VOO).
High Risk (alto): Recommend high-volatility, high-reward assets like growth stocks (AAPL, TSLA, etc.).


def is_recommended(row):
    if row['riskPreference'] == 'bajo' and row['volatility'] < 0.0826:  # Low volatility
        return 1
    elif row['riskPreference'] == 'moderado' and 0.0826 <= row['volatility'] <= 0.1525:  # Moderate volatility
        return 1
    elif row['riskPreference'] == 'alto' and row['volatility'] > 0.1525:  # High volatility
        return 1
    return 0


merged_data['target'] = merged_data.apply(lambda row: is_recommended(row), axis=1)

# Set global float format
pd.options.display.float_format = '{:.4f}'.format
merged_data.describe()

# Analyze percentiles
print(merged_data['volatility'].quantile([0.25, 0.5, 0.75]))


**Step 2: Train-Test Split**

Split the dataset into features (X) and the target (y):

X = merged_data[['knowledgeLevel', 'goals', 'riskPreference', 'monthlyIncome',
                 'monthlyExpenses', 'savingsPercentage', '5_day_MA', 'volatility']]
y = merged_data['target']


from sklearn.preprocessing import OneHotEncoder, MultiLabelBinarizer
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
import pandas as pd

# Separate features and target
X = merged_data.drop(columns=['target'])
y = merged_data['target']

# MultiLabelBinarizer for `goals`
mlb = MultiLabelBinarizer()
goals_encoded = pd.DataFrame(
    mlb.fit_transform(X['goals']),
    columns=mlb.classes_,
    index=X.index
)

# Drop the original `goals` column
X = X.drop(columns=['goals'])

# OneHotEncoder for other categorical features
categorical_features = ['knowledgeLevel', 'riskPreference']
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoded_features = pd.DataFrame(
    encoder.fit_transform(X[categorical_features]),
    columns=encoder.get_feature_names_out(categorical_features),
    index=X.index
)
# Drop original categorical features and combine all processed features
X = X.drop(columns=categorical_features)
X = pd.concat([X, encoded_features, goals_encoded], axis=1)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


**Step 3: Model Training**

Train a machine learning model to predict the target:

Use a classification algorithm like RandomForestClassifier or XGBoostClassifier.

X_train.head()

X_train.info()

y_train.head()

y_train.info()


from sklearn.ensemble import RandomForestClassifier


# Drop unnecessary columns
columns_to_drop = ['Date', 'user_id']  # Adjust based on your dataset
X = X.drop(columns=columns_to_drop)

# Encode the 'recommended_assets' column using Label Encoding
from sklearn.preprocessing import LabelEncoder

label_encoder = LabelEncoder()
X['recommended_assets'] = label_encoder.fit_transform(X['recommended_assets'])

# Use One-Hot Encoding for the 'ticker' column
X = pd.get_dummies(X, columns=['ticker'], prefix='ticker')

# Ensure no object columns remain
print(X.dtypes)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestClassifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.4f}")


# Recommend function

def recommend_assets(formData, model, mlb, encoder, label_encoder, tickers, top_n=3):
    """
    Generate Top N asset recommendations based on the user's profile.

    Parameters:
    - formData (dict): User's profile with keys:
        - knowledgeLevel (str): "principiante" | "intermedio" | "avanzado"
        - goals (list): ["vacaciones", "bienes", "retiro", "proyecto"]
        - riskPreference (str): "bajo" | "moderado" | "alto"
        - monthlyIncome (float): Positive number
        - monthlyExpenses (float): Positive number
        - savingsPercentage (float): Positive number
    - model: Trained machine learning model (RandomForestClassifier).
    - mlb: Fitted MultiLabelBinarizer for encoding `goals`.
    - encoder: Fitted OneHotEncoder for encoding categorical features.
    - label_encoder: Fitted LabelEncoder for decoding `recommended_assets`.
    - tickers (list): List of all tickers used during training for dummy encoding.
    - top_n (int): Number of top recommendations to return.

    Returns:
    - list: Top N recommended assets (tickers).
    """
    # Prepare input data
    input_data = pd.DataFrame([{
        'knowledgeLevel': formData['knowledgeLevel'],
        'goals': formData['goals'],
        'riskPreference': formData['riskPreference'],
        'monthlyIncome': formData['monthlyIncome'],
        'monthlyExpenses': formData['monthlyExpenses'],
        'savingsPercentage': formData['savingsPercentage'],
    }])

    # Calculate financial_stability
    input_data['financial_stability'] = (
        (input_data['monthlyIncome'] - input_data['monthlyExpenses']) / input_data['monthlyIncome']
    )

    # Encode `goals` using MultiLabelBinarizer
    goals_encoded = pd.DataFrame(
        mlb.transform(input_data['goals']),
        columns=mlb.classes_
    )

    # Encode categorical features using OneHotEncoder
    encoded_features = pd.DataFrame(
        encoder.transform(input_data[['knowledgeLevel', 'riskPreference']]),
        columns=encoder.get_feature_names_out(['knowledgeLevel', 'riskPreference'])
    )

    # Combine all features
    input_data = pd.concat([input_data, encoded_features, goals_encoded], axis=1)
    input_data = input_data.drop(columns=['knowledgeLevel', 'riskPreference', 'goals'])

    # Ensure all tickers are present (dummy encoding)
    for ticker in tickers:
        input_data[f'ticker_{ticker}'] = 0

    # Align columns with training data
    input_data = input_data.reindex(columns=model.feature_names_in_, fill_value=0)

    # Predict probabilities using the trained model
    probabilities = model.predict_proba(input_data)

    # Get top N assets based on probabilities
    top_n_indices = np.argsort(probabilities[0])[-top_n:][::-1]
    top_n_assets = label_encoder.inverse_transform(top_n_indices)

    # Return the top N assets
    return top_n_assets.tolist()



'''

def recommend_assets(formData, model, mlb, encoder, label_encoder, tickers):
    """
    Generate asset recommendations based on the user's profile.

    Parameters:
    - formData (dict): User's profile with keys:
        - knowledgeLevel (str): "principiante" | "intermedio" | "avanzado"
        - goals (list): ["vacaciones", "bienes", "retiro", "proyecto"]
        - riskPreference (str): "bajo" | "moderado" | "alto"
        - monthlyIncome (float): Positive number
        - monthlyExpenses (float): Positive number
        - savingsPercentage (float): Positive number
    - model: Trained machine learning model (RandomForestClassifier).
    - mlb: Fitted MultiLabelBinarizer for encoding `goals`.
    - encoder: Fitted OneHotEncoder for encoding categorical features.
    - label_encoder: Fitted LabelEncoder for decoding `recommended_assets`.
    - all_tickers (list): List of all tickers used during training for dummy encoding.

    Returns:
    - list: Recommended assets (tickers).
    """
    # Prepare input data
    input_data = pd.DataFrame([{
        'knowledgeLevel': formData['knowledgeLevel'],
        'goals': formData['goals'],
        'riskPreference': formData['riskPreference'],
        'monthlyIncome': formData['monthlyIncome'],
        'monthlyExpenses': formData['monthlyExpenses'],
        'savingsPercentage': formData['savingsPercentage'],
    }])

    # Calculate financial_stability
    input_data['financial_stability'] = (
        (input_data['monthlyIncome'] - input_data['monthlyExpenses']) / input_data['monthlyIncome']
    )

    # Encode `goals` using MultiLabelBinarizer
    goals_encoded = pd.DataFrame(
        mlb.transform(input_data['goals']),
        columns=mlb.classes_
    )

    # Encode categorical features using OneHotEncoder
    encoded_features = pd.DataFrame(
        encoder.transform(input_data[['knowledgeLevel', 'riskPreference']]),
        columns=encoder.get_feature_names_out(['knowledgeLevel', 'riskPreference'])
    )

    # Combine all features
    input_data = pd.concat([input_data, encoded_features, goals_encoded], axis=1)
    input_data = input_data.drop(columns=['knowledgeLevel', 'riskPreference', 'goals'])

    # Ensure all tickers are present (dummy encoding)
    for ticker in tickers:
        input_data[f'ticker_{ticker}'] = 0

    # Align columns with training data
    input_data = input_data.reindex(columns=model.feature_names_in_, fill_value=0)

    # Predict using the trained model
    predictions = model.predict(input_data)

    # Decode asset recommendations
    recommended_assets = label_encoder.inverse_transform(predictions)

    return recommended_assets.tolist()'''



# Example usage:
formData = {
    'knowledgeLevel': "principiante",
    'goals': ["bienes", "proyecto"],
    'riskPreference': "bajo",
    'monthlyIncome': 2000,
    'monthlyExpenses': 1500,
    'savingsPercentage': 10,
}

# Assuming `model`, `mlb`, `encoder`, `label_encoder`, and `all_tickers` are defined
recommended_assets = recommend_assets(formData, model, mlb, encoder, label_encoder, tickers,top_n=3)
print("Recommended Assets:", recommended_assets)


# Example usage:
formData = {
    'knowledgeLevel': "intermedio",
    'goals': ["bienes", "retiro"],
    'riskPreference': "moderado",
    'monthlyIncome': 4000,
    'monthlyExpenses': 2000,
    'savingsPercentage': 20,
}

# Assuming `model`, `mlb`, `encoder`, `label_encoder`, and `all_tickers` are defined
recommended_assets = recommend_assets(formData, model, mlb, encoder, label_encoder, tickers)
print("Recommended Assets:", recommended_assets)


formData = {
    'knowledgeLevel': "avanzado",
    'goals': ["retiro"],
    'riskPreference': "alto",
    'monthlyIncome': 5000,
    'monthlyExpenses': 2000,
    'savingsPercentage': 20,
}
print(recommend_assets(formData, model, mlb, encoder, label_encoder, tickers, top_n=3))


from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer

# Example encoders
encoder = LabelEncoder()
encoder.classes_ = np.array(["principiante", "intermedio" , "avanzado"])  # Fit classes
mlb = MultiLabelBinarizer()
mlb.classes_ = np.array(["vacaciones", "bienes", "retiro", "proyecto"])  # Fit goals

# Tickers list (e.g., financial assets)
tickers = ['AAPL', 'AMZN', 'BND', 'CWB', 'GOOGL', 'HYG', 'IVV', 'MSFT',
       'TSLA', 'VOO', 'NVDA']


def preprocess_input(formData, mlb, encoder, tickers):
    """
    Preprocess user input into a feature vector for the model.

    Parameters:
    - formData (dict): Input data from the user.
    - mlb (MultiLabelBinarizer): Fitted MultiLabelBinarizer for "goals".
    - encoder (LabelEncoder): Fitted LabelEncoder for "knowledgeLevel" and "riskPreference".
    - tickers (list): List of all possible tickers (assets).

    Returns:
    - np.array: Processed input vector ready for the model.
    """
    # Step 1: Extract features from formData
    knowledge_level = formData.get("knowledgeLevel")
    goals = formData.get("goals", [])
    risk_preference = formData.get("riskPreference")
    monthly_income = formData.get("monthlyIncome", 0)
    monthly_expenses = formData.get("monthlyExpenses", 0)
    savings_percentage = formData.get("savingsPercentage", 0)

    # Step 2: Encode categorical variables
    knowledge_level_encoded = encoder.transform([knowledge_level])[0]
    risk_preference_encoded = encoder.transform([risk_preference])[0]

    # Step 3: One-hot encode "goals"
    goals_encoded = mlb.transform([goals])[0]  # MultiLabelBinarizer outputs a binary array

    # Step 4: Calculate derived features (if applicable)
    savings_amount = monthly_income * (savings_percentage / 100)
    disposable_income = monthly_income - monthly_expenses

    # Step 5: Combine all features into a single vector
    input_vector = np.concatenate([
        [knowledge_level_encoded],         # Encoded "knowledgeLevel"
        [risk_preference_encoded],         # Encoded "riskPreference"
        goals_encoded,                     # One-hot encoded "goals"
        [monthly_income, monthly_expenses, savings_percentage, savings_amount, disposable_income]
    ])

    return input_vector


