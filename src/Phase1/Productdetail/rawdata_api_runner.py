import os
from functions_definition import extract_unique_asins, process_asin_batches

# Paths and API key
csv_file_path = 'src/Phase1/Bestsellers/bestsellers.csv'  # Path to the CSV file with ASINs
api_key = "7EUuD86LmdAoJv9KvezY5AxGcLNlCkNY"  # My API key

# Step 1: Extract unique ASINs from the CSV
unique_asins = extract_unique_asins(csv_file_path)
print(f"Total number of unique ASINs: {len(unique_asins)}")

# Check if any ASINs were extracted
if not unique_asins:
    print("No ASINs found in the CSV file. Please check the file and try again.")
else:
    # Step 2: Process ASINs in batches (uncommom the below to run each batch request)

    """
    # For the first batch (ASINs 1 to 20)
    start_index = 0
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_1_to_20.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 2nd batch
    start_index = 20
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_21_to_40.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 3rd batch
    start_index = 40
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_41_to_60.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    # For the 4th batch
    start_index = 60
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_61_to_80.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)




