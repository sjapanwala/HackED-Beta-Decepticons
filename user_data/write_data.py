import os
import sys
import json
from datetime import datetime

def write_to_json_file(file_path, title, content):
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data_entry = [
        date, {
            "title": title,
            "date": date,
            "content": content
        }
    ]
    
    # Check if the file already exists and has data
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    # Append the new entry to the existing data
    data.append(data_entry)

    # Write the updated data back to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def read_data(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
            for entry in data:
                print("Title:", entry[1]['title'])
                print("Date:", entry[1]['date'])
                print("Content:", entry[1]['content'])
    except (FileNotFoundError, json.JSONDecodeError):
        print("No data found.")
        return None

def main():
    file_path = "user_data/user_data.json"
    if sys.argv[1] == "read":
        read_data(file_path)
    elif sys.argv[1] == "write":
        title = sys.argv[1]
        content = sys.argv[2]
        write_to_json_file(file_path, title, content)

if __name__ == "__main__":
    main()