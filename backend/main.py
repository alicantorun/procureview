import requests
from bs4 import BeautifulSoup
import csv

def parse_website(url):
    # Fetch the webpage
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return
    
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all text elements
    text_elements = soup.find_all(text=True)
    
    # Filter out script and style elements
    text_data = []
    for element in text_elements:
        parent = element.parent.name if element.parent else "No parent"
        if parent not in ['script', 'style', '[document]', 'head', 'title']:
            text_data.append((parent, element.strip()))
    
    # Remove empty strings
    text_data = [(tag, text) for tag, text in text_data if text]
    
    return text_data

def save_to_csv(data, filename='website_text.csv'):
    with open(filename, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['HTML Element', 'Text Content'])
        writer.writerows(data)

# Example usage
url = "https://edition.cnn.com/"  # Replace with the URL you want to parse
parsed_data = parse_website(url)

if parsed_data:
    for element, text in parsed_data:
        print(f"{element}: {text}")
    
    save_to_csv(parsed_data)
    print(f"Data saved to website_text.csv")
else:
    print("No data parsed from the website.")