import pandas as pd

def clean_csv_file(file_path, columns_to_delete):
    """
    This function opens a CSV file, deletes the specified columns, and returns the cleaned DataFrame.
    
    Parameters:
        file_path (str): The path to the CSV file to be cleaned.
        columns_to_delete (list): A list of column names to be deleted from the DataFrame.
    
    Returns:
        pd.DataFrame: The cleaned DataFrame with the specified columns removed.
    """
    try:
        # Load the CSV file into a DataFrame
        df = pd.read_csv(file_path)
        
        # Check if the columns to delete exist in the DataFrame and drop them
        df_cleaned = df.drop(columns=columns_to_delete, errors='ignore')
        
        # Return the cleaned DataFrame
        return df_cleaned
    
    except FileNotFoundError:
        print(f"Error: The file {file_path} does not exist.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


# Usage
file_path = "src/Phase1/Productdetail/combined_productdetails_raw.csv"
columns_to_delete = [
    "name", "total_reviews", "average_rating", "seller_url", "availability_quantity",
    "shipping_charge", "author", "available_book_formats", "small_description", "images",
    "productCategory", "url", "attributes", "size", "color", "model", "product_information",
    "variation_asin", "product_variations", "product_condition", "frequently_bought_together",
    "product_badges"
]

# Call the function
cleaned_df = clean_csv_file(file_path, columns_to_delete)

# If needed, you can save the cleaned DataFrame to a new CSV file
if cleaned_df is not None:
    cleaned_df.to_csv("src/Phase1/Productdetail/cleaned_productdetails.csv", index=False)
    print("Cleaned CSV file saved as cleaned_productdetails.csv")
