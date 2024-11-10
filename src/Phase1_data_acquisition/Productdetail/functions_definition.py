import os
import pandas as pd
import requests
import http.client
import json
import time

def extract_unique_asins(csv_file_path):
    """
    This function reads a CSV file, extracts all unique 'asin' values from it, and returns them.
    
    Parameters:
        csv_file_path (str): The path to the CSV file containing the 'asin' column.
    
    Returns:
        list: A list of unique 'asin' values.
    """
    try:
        df = pd.read_csv(csv_file_path)
        if 'asin' in df.columns:
            unique_asins = df['asin'].unique().tolist()
            return unique_asins
        else:
            print("Error: 'asin' column not found in the CSV file.")
            return []
    except FileNotFoundError:
        print(f"Error: The file {csv_file_path} does not exist.")
        return []
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
        dict: The product details as a Python dictionary (parsed from the JSON response), or None if failed.
    """
    try:
        conn = http.client.HTTPSConnection("get.scrapehero.com")
        url = f"/amz/product-details/?x-api-key={api_key}&asin={asin}&country_code=US"
        conn.request("GET", url)
        res = conn.getresponse()

        if res.status == 200:
            data = res.read().decode("utf-8")
            conn.close()
            return json.loads(data)
        else:
            print(f"Error: Request failed with status code {res.status} for ASIN {asin}.")
            return None
    except Exception as e:
        print(f"An error occurred with ASIN {asin}: {e}")
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
    rating_histogram = json_dict.pop('rating_histogram', {})
    flattened_data = {**json_dict, **rating_histogram}
    flattened_data['product_information'] = json_dict.get('product_information', {})
    df = pd.DataFrame([flattened_data])
    return df

def get_asin_batch_details(api_key, asin_batch, output_file_name, output_path):
    """
    This function processes a batch of ASINs (up to 20), retrieves product details via the API,
    and exports the results to a CSV file once the batch is completed.
    
    Parameters:
        api_key (str): The API key for authentication.
        asin_batch (list): A batch of ASINs (max 20) to retrieve product details for.
        output_file_name (str): The name of the output CSV file.
        output_path (str): The directory where the CSV file will be saved.
    """
    dataframes = []
    errors = []

    for asin in asin_batch:
        product_details = get_product_details(asin, api_key)
        
        if product_details:
            df = json_to_dataframe(product_details)
            dataframes.append(df)
        else:
            errors.append(asin)  # Track ASINs that encountered errors
    
    # If we got any data, concatenate and export to CSV
    if dataframes:
        final_df = pd.concat(dataframes, ignore_index=True)
        if not os.path.exists(output_path):
            os.makedirs(output_path)
        output_file = os.path.join(output_path, output_file_name)
        final_df.to_csv(output_file, index=False)
        print(f"Data for batch saved to {output_file}")
    else:
        print("No product details were retrieved for this batch.")
    
    # Report any ASINs that failed
    if errors:
        print(f"The following ASINs encountered errors and were not processed: {errors}")

def process_asin_batches(api_key, unique_asins, start_index, batch_size=20, output_path=None, output_file_name=None):
    """
    Processes ASINs in batches of 20, retrieves product details, and saves the result to a CSV file.
    
    Parameters:
        api_key (str): The API key for the product details API.
        unique_asins (list): A list of unique ASINs.
        start_index (int): The starting index for the batch of ASINs.
        batch_size (int): The size of each batch, defaults to 20.
        output_path (str): The directory where the CSV file will be saved (default: src/Phase1/Productdetail).
        output_file_name (str): The name of the output CSV file (optional, generated automatically if not provided).
    
    Returns:
        None
    """
    # Determine the batch of ASINs to process
    asin_batch = unique_asins[start_index:start_index + batch_size]

    # If no ASINs to process, exit
    if len(asin_batch) == 0:
        print("No more ASINs to process.")
        return
    
    # Default output path if not provided
    if output_path is None:
        output_path = "src/Phase1/Productdetail"

    # Ensure the output directory exists
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    # Generate the default file name if not provided
    if output_file_name is None:
        output_file_name = f"productdetails_batch_{start_index + 1}_to_{start_index + len(asin_batch)}.csv"
    
    # Full path to the output file
    output_file = os.path.join(output_path, output_file_name)

    print(f"Processing ASINs from index {start_index} to {start_index + len(asin_batch)}...")
    print(f"Output will be saved to {output_file}")

    # Process the batch of ASINs and save the result to the output file
    get_asin_batch_details(api_key, asin_batch, output_file_name, output_path)
