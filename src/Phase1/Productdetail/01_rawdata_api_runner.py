import os
from functions_definition import extract_unique_asins, process_asin_batches

# Paths and API key
csv_file_path = 'src/Phase1/Bestsellers/bestsellers.csv'  # Path to the CSV file with ASINs
api_key = ""  # My api key is removed after the data are retreived

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

    """
    # For the 4th batch -- Fail to return any data
    start_index = 60
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_61_to_80.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 5th batch
    start_index = 80
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_81_to_100.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    
    """
    # For the 6th batch
    start_index = 100
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_101_to_120.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 7th batch
    start_index = 120
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_121_to_140.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 8th batch
    start_index = 140
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_141_to_160.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 9th batch
    start_index = 160
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_161_to_180.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 10th batch
    start_index = 180
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_181_to_200.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 11th batch
    start_index = 200
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_201_to_220.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 12th batch
    start_index = 220
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_221_to_240.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 13th batch
    start_index = 240
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_241_to_260.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 14th batch
    start_index = 260
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_261_to_280.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 15th batch
    start_index = 280
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_281_to_300.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 16th batch
    start_index = 300
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_301_to_320.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 17th batch
    start_index = 320
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_321_to_340.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 18th batch
    # Result : The following ASINs encountered errors and were not processed: ['B07PCMWTSG', 'B09LQTPHSG', 'B0D1TK5XVL', 'B08F3C99KN', 'B0BXD2TYS8']
    start_index = 340
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_341_to_360.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 19th batch
    # The following ASINs encountered errors and were not processed: 
    # ['B0CTR1SQLR', 'B0CW1RB5YW', 'B004LLIKVU', 'B09KXT1HLH', 'B0BXCZWT5B', 'B09KXRPW9G', 'B0D1TRQ9L2', 'B074T91QTZ']
    start_index = 360
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_361_to_380.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 20th batch
    start_index = 380
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_381_to_400.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 21th batch
    start_index = 400
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_401_to_420.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 22th batch
    start_index = 420
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_421_to_440.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 23th batch
    start_index = 440
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_441_to_460.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 24th batch
    start_index = 460
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_461_to_480.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 25th batch
    start_index = 480
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_481_to_500.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 26th batch
    start_index = 500
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_501_to_520.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 27th batch
    start_index = 520
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_521_to_540.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 28th batch
    start_index = 540
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_541_to_560.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 29th batch
    start_index = 560
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_561_to_580.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 30th batch
    start_index = 580
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_581_to_600.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 31th batch
    start_index = 600
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_601_to_620.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 31th batch
    start_index = 620
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_621_to_640.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 32th batch
    start_index = 640
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_641_to_660.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 33th batch
    start_index = 660
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_661_to_680.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 34th batch
    start_index = 680
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_681_to_700.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """
    """
    # For the 35th batch
    start_index = 700
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_701_to_720.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

    """
    # For the 36th batch
    start_index = 720
    output_path = "src/Rawdata"
    output_file_name = "productdetails_batch_721_to_740.csv"
    process_asin_batches(api_key, unique_asins, start_index, output_path=output_path, output_file_name=output_file_name)
    """

















