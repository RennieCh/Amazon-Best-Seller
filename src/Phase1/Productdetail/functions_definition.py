import pandas as pd
import requests
import http.client
import json
import time
import os

def extract_unique_asins(csv_file_path):
    """
    This function reads a CSV file, extracts all unique 'asin' values from it, and returns them.
    
    Parameters:
        csv_file_path (str): The path to the CSV file containing the 'asin' column.
    
    Returns:
        list: A list of unique 'asin' values.
    """
    try:
        # Read the CSV file into a Pandas DataFrame
        df = pd.read_csv(csv_file_path)
        
        # Check if 'asin' column exists
        if 'asin' in df.columns:
            # Extract unique ASINs from the 'asin' column
            unique_asins = df['asin'].unique().tolist()
            return unique_asins
        else:
            print("Error: 'asin' column not found in the CSV file.")
            return []
    except FileNotFoundError:
        print(f"Error: The file {csv_file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def get_product_details(asin, api_key):
    """
    This function makes a GET request to retrieve product details from ScrapeHero API using ASIN.
    
    Parameters:
        asin (str): The ASIN for the product.
        api_key (str): The API key for authentication.
    
    Returns:
        dict: The product details as a Python dictionary (parsed from the JSON response).
    """
    try:
        # Establish HTTPS connection
        conn = http.client.HTTPSConnection("get.scrapehero.com")
        
        # Build the URL with query parameters
        url = f"/amz/product-details/?x-api-key={api_key}&asin={asin}&country_code=US"
        
        # Make the GET request
        conn.request("GET", url)
        
        # Get the response
        res = conn.getresponse()
        
        # Check if the request was successful
        if res.status == 200:
            # Read and decode the response
            data = res.read().decode("utf-8")
            
            # Close the connection
            conn.close()
            
            # Parse the response as JSON and return it
            return json.loads(data)
        else:
            print(f"Error: Request failed with status code {res.status}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def json_to_dataframe(json_dict):
    """
    This function takes a JSON dictionary containing product details, flattens the 'rating_histogram'
    but keeps 'product_information' as a nested dictionary, and converts the data into a Pandas DataFrame.
    
    Parameters:
        json_dict (dict): The JSON dictionary containing the product details.
    
    Returns:
        pd.DataFrame: A Pandas DataFrame containing the product details with 'product_information' nested.
    """
    # Flattening the 'rating_histogram' into the main dictionary but keeping 'product_information' as is
    rating_histogram = json_dict.pop('rating_histogram', {})
    
    # Add the rating histogram keys to the main dictionary
    flattened_data = {**json_dict, **rating_histogram}
    
    # Keep 'product_information' as a nested dictionary inside the DataFrame
    flattened_data['product_information'] = json_dict.get('product_information', {})
    
    # Convert the flattened data into a DataFrame with one row
    df = pd.DataFrame([flattened_data])
    
    return df

def get_all_product_details(api_key, unique_asins):
    """
    This function processes a list of ASINs, retrieves product details via the API,
    and concatenates all the data into a single DataFrame.
    
    Parameters:
        api_key (str): The API key for authentication.
        unique_asins (list): A list of unique ASINs to retrieve product details for.
    
    Returns:
        pd.DataFrame: A concatenated DataFrame containing product details for all ASINs.
    """
    dataframes = []  # List to store individual DataFrames
    count = 0  # Track the number of requests made
    
    for asin in unique_asins:
        # Get product details using the API
        product_details = get_product_details(asin, api_key)
        
        if product_details:
            # Convert the JSON data to a DataFrame
            df = json_to_dataframe(product_details)
            dataframes.append(df)  # Append the DataFrame to the list
        
        # Increment the request count and sleep if limit is reached
        count += 1
        if count % 50 == 0:
            print("Reached 50 requests. Sleeping for 60 seconds...")
            time.sleep(60)  # Sleep for 60 seconds to avoid exceeding the request limit
    
    # Concatenate all DataFrames into one
    if dataframes:
        final_df = pd.concat(dataframes, ignore_index=True)
        return final_df
    else:
        print("No product details were retrieved.")
        return pd.DataFrame()  # Return an empty DataFrame if no data

def export_dataframe_to_csv(dataframe, file_name, destination_path):
    """
    This function exports a given Pandas DataFrame to a CSV file at the specified destination path.
    
    Parameters:
        dataframe (pd.DataFrame): The Pandas DataFrame to be exported.
        file_name (str): The name of the output CSV file. For example "output.csv"
        destination_path (str): The directory where the CSV file should be saved. For example "src/Output"
    
    Returns:
        str: The full path of the saved CSV file.
    """
    # Ensure the destination path exists, create it if not
    if not os.path.exists(destination_path):
        os.makedirs(destination_path)
    
    # Construct the full file path
    file_path = os.path.join(destination_path, file_name)
    
    # Export the DataFrame to CSV
    try:
        dataframe.to_csv(file_path, index=False)  # `index=False` to avoid saving the index as a column
        print(f"DataFrame exported successfully to {file_path}")
    except Exception as e:
        print(f"An error occurred while exporting the DataFrame: {e}")

def export_dataframe_to_csv(dataframe, file_name, destination_path):
    """
    This function exports a given Pandas DataFrame to a CSV file at the specified destination path.
    
    Parameters:
        dataframe (pd.DataFrame): The Pandas DataFrame to be exported.
        file_name (str): The name of the output CSV file. For example "output.csv"
        destination_path (str): The directory where the CSV file should be saved. For example "src/Output"
    
    Returns:
        str: The full path of the saved CSV file.
    """
    # Ensure the destination path exists, create it if not
    if not os.path.exists(destination_path):
        os.makedirs(destination_path)
    
    # Construct the full file path
    file_path = os.path.join(destination_path, file_name)
    
    # Export the DataFrame to CSV
    try:
        dataframe.to_csv(file_path, index=False)  # `index=False` to avoid saving the index as a column
        print(f"DataFrame exported successfully to {file_path}")
    except Exception as e:
        print(f"An error occurred while exporting the DataFrame: {e}")


"""
# Example usage with a small list of ASINs to test the function
test_asins = ['B0CJM1GNFQ', 'B0B1N5FK48', 'B08C1W5N87']
api_key = "7EUuD86LmdAoJv9KvezY5AxGcLNlCkNY"  # Replace with your actual API key

# Test the function with the 3 ASINs
test_dataframe = get_all_product_details(api_key, test_asins)

# Display the resulting DataFrame
print(test_dataframe.head())
"""


"""
# Example usage
api_key = "7EUuD86LmdAoJv9KvezY5AxGcLNlCkNY"  # Replace with your actual API key
asin = "B079Y45KTJ"  # Replace with the ASIN you want to query

product_details = get_product_details(asin, api_key)
print(product_details)
"""


"""
# Example usage
csv_file_path = 'src/Phase1/Bestsellers/bestsellers.csv'
unique_asins = extract_unique_asins(csv_file_path)
print(f"Unique ASINs: {unique_asins}")
"""
