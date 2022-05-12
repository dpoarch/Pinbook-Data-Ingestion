## PinBook Data Ingestion
### Northbeam often needs to integrate with new advertising platforms to collect customer 
### data on the number of clicks and views their advertisements get on these platforms. 
### During this interview, your task will be to integrate with a new platform "PinBook".


# Step 1: Write a function to determine if a url has the query parameter `nbt_platform=PinBook`
def check_if_url_has_nbt_query_param(url):
    return False


# Step 2: Read from the json file "pinbook-data.json" which includes an array of objects.
# All of the objects include an attribute "id" and some of the objects include an attribute "destination_url".
# Return an ordered list, by ID lexicographically descending, of all the objects that have a destination url and has the query parameter nbt_platform=PinBook
def list_ids_of_ad_objects_without_nbt_platform_query_param():
    return []


# Step 3: Using the data from the previous step, create an advertisment report. The report should be of the following shape:

# Advertisement with ID [ID] has received [X] views, [X] clicks, and ran for [X] days
# ---
# Advertisement with ID [ID2] has received [X2] views, [X2] clicks, and ran for [X2] days
# ---
# Advertisement with ID [ID3] has received [X3] views, [X3] clicks, and ran for [X3] days
# ...
# Advertisement with ID [IDN] has received [XN] views, [XN] clicks, and ran for [XN] days

# The report should order the records by ID descending
# The report should exclude all campaigns without destination URLS or without the nbt_platform tracking param
def create_advertisement_report():
    print(
        """Advertisement with ID [ID] has received [X] views, [X] clicks, and ran for [X] days
---
Advertisement with ID [ID2] has received [X2] views, [X2] clicks, and ran for [X2] days
---
Advertisement with ID [ID3] has received [X3] views, [X3] clicks, and ran for [X3] days
...
Advertisement with ID [IDN] has received [XN] views, [XN] clicks, and ran for [XN] days"""
    )


# Step 4: Create a simple graph representing the best and worst performing advertisements.
def create_advertisement_report_graph():
    return None


if __name__ == "__main__":
    check_if_url_has_nbt_query_param(
        "https://widget-co.com/landing-page/?nbt_platform=PinBook"
    )