import os
from functions_definition import extract_unique_asins, get_all_product_details, export_dataframe_to_csv

# Paths and API key
csv_file_path = 'src/Phase1/Bestsellers/bestsellers.csv'  # Path to your CSV file with ASINs
api_key = "7EUuD86LmdAoJv9KvezY5AxGcLNlCkNY"  # This is my personal api_key

# Step 1: Extract unique ASINs from the CSV
unique_asins = extract_unique_asins(csv_file_path)

# Step 2: Get all product details and concatenate into one DataFrame
final_dataframe = get_all_product_details(api_key, unique_asins)

# Step 3: Export the DataFrame to a CSV file
output_file_name = "productdetails.csv"
output_path = "src/Phase1/Productdetail"  # Ensure this directory exists, or create it

# Make sure the output path exists, create if it doesn't
if not os.path.exists(output_path):
    os.makedirs(output_path)

# Export DataFrame to CSV
export_dataframe_to_csv(final_dataframe, output_file_name, output_path)

