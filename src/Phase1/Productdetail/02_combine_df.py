import os
import pandas as pd

def combine_csv_files_to_dataframe(csv_dir_path, output_dir_path, output_file_name="combined_productdetails_raw.csv"):
    """
    Combines multiple CSV files into a single Pandas DataFrame and exports the result as a CSV file.
    
    Parameters:
        csv_dir_path (str): The directory containing the CSV batch files.
        output_dir_path (str): The directory where the output CSV file will be saved.
        output_file_name (str): The name of the output CSV file (default: 'combined_productdetails.csv').
    
    Returns:
        pd.DataFrame: The combined DataFrame with data from all available CSV files.
    """
    # Print the current working directory
    print(f"Current Working Directory: {os.getcwd()}")

    # Initialize an empty list to store DataFrames
    dataframes = []

    # Iterate through the range of batch files
    for i in range(1, 741, 20):  # Iterate in steps of 20
        # Construct the CSV file name for each batch
        csv_file_name = f"productdetails_batch_{i}_to_{i + 19}.csv"
        csv_file_path = os.path.join(csv_dir_path, csv_file_name)

        # Print the full path being checked
        print(f"Checking file: {csv_file_path}")

        # Check if the file exists before trying to load it
        if os.path.exists(csv_file_path):
            try:
                # Read the CSV file into a DataFrame and append it to the list
                df = pd.read_csv(csv_file_path)
                dataframes.append(df)
                print(f"Successfully loaded: {csv_file_name}")
            except Exception as e:
                print(f"Error reading {csv_file_name}: {e}")
        else:
            print(f"File {csv_file_name} is missing, skipping...")

    # Combine all DataFrames into one
    if dataframes:
        combined_df = pd.concat(dataframes, ignore_index=True)

        # Ensure output directory exists
        if not os.path.exists(output_dir_path):
            os.makedirs(output_dir_path)

        # Save the combined DataFrame to the specified output directory
        output_file_path = os.path.join(output_dir_path, output_file_name)
        combined_df.to_csv(output_file_path, index=False)
        print(f"Combined DataFrame saved to: {output_file_path}")
    else:
        print("No CSV files were loaded, resulting DataFrame is empty.")
        combined_df = pd.DataFrame()

    return combined_df


# Paths and output path
input_path = "/Users/rennie/DS5110/amazon-best-seller-app-ds5110-fa24/src/Rawdata"  
output_path = "/Users/rennie/DS5110/amazon-best-seller-app-ds5110-fa24/src/Phase1/Productdetail"  

# Combine the CSV files and save the result to the output path
combine_csv_files_to_dataframe(input_path, output_path)
