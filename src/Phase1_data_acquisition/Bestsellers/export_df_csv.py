import os
from functions import combine_json_files_to_dataframe, export_dataframe_to_csv

# Step 1: Combine all JSON files into one DataFrame
final_dataframe = combine_json_files_to_dataframe()

# Step 2: Export the DataFrame to a CSV file
output_file_name = "bestsellers.csv"
output_path = "src/Phase1/Bestsellers"
export_dataframe_to_csv(final_dataframe, output_file_name, output_path)

