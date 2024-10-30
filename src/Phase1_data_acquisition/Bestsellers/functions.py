import os
import json
import pandas as pd

def read_json_file(file_path):
    """
    This function reads a JSON file from the provided file path and converts it into a Python dictionary.
    
    Parameters:
        file_path (str): The path to the JSON file to be read.
        
    Returns:
        dict: The content of the JSON file as a Python dictionary.
    """
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Error: The file {file_path} does not exist.")
    except json.JSONDecodeError:
        print(f"Error: Failed to decode JSON from the file {file_path}.")
    except Exception as e:
        print(f"An error occurred: {e}")

def extract_category(json_dict):
    """
    This function extracts the category name from the provided JSON dictionary.
    
    Parameters:
        json_dict (dict): The JSON dictionary containing the category hierarchy.
        
    Returns:
        str: The extracted category name, or an error message if the structure is not found.
    """
    try:
        category_name = json_dict["200"]["category_hierarchy"][1]["name"]
        return category_name
    except KeyError:
        return "Error: Category not found in the provided JSON structure."
    except Exception as e:
        return f"An error occurred: {e}"

def json_to_dataframe(json_dict):
    """
    This function converts a JSON dictionary into a Pandas DataFrame and adds a 'category' column.
    Only products with rank from 1 to 20 are included.
    
    Parameters:
        json_dict (dict): The JSON dictionary containing product listings and category information.
    
    Returns:
        pd.DataFrame: A Pandas DataFrame with the top 20 product data and an additional 'category' column.
    """
    try:
        category_name = extract_category(json_dict)
        
        if '200' in json_dict and 'product_listings' in json_dict['200']:
            product_list = json_dict['200']['product_listings']
            
            # Convert the product list to a DataFrame
            product_df = pd.DataFrame(product_list)
            
            # Filter to include only products with rank between 1 and 20
            product_df = product_df[product_df['rank'] <= 20]
            
            # Add the 'category' column with the extracted category name
            product_df['category'] = category_name
            
            return product_df
        else:
            print("Error: Product listings not found in the JSON structure.")
            return pd.DataFrame()
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return pd.DataFrame()

def combine_json_files_to_dataframe():
    """
    This function reads all 38 JSON files, converts them to Pandas DataFrames, and concatenates them into a single DataFrame.
    
    Returns:
        pd.DataFrame: A single concatenated DataFrame containing data from all 38 JSON files.
    """
    dataframes = []
    base_path = 'src/Rawdata'
    
    for i in range(1, 39):  # Iterate over file numbers from 1 to 38
        file_path = os.path.join(base_path, f'bestseller{i}.json')
        json_dict = read_json_file(file_path)
        
        if json_dict:
            df = json_to_dataframe(json_dict)
            if not df.empty:
                dataframes.append(df)
    
    # Concatenate all DataFrames into a single DataFrame
    if dataframes:
        final_df = pd.concat(dataframes, ignore_index=True)
        return final_df
    else:
        print("No data was loaded from the JSON files.")
        return pd.DataFrame()  # Return an empty DataFrame if no data was found

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


