import cv2
from skimage import measure
import geojson

# Load the map image
image = cv2.imread('/map.png', cv2.IMREAD_GRAYSCALE)

# Perform edge detection or other image processing steps
edges = cv2.Canny(image, 50, 150)

# Find contours in the processed image
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create a list to store polygon data
polygon_data = []

# Function to get a random color
def get_random_color():
    import random
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

# Counter for polygon IDs
id_counter = 1

# Create a GeoJSON feature collection
for contour in contours:
    # Convert contour to polygon coordinates
    coordinates = contour.squeeze().tolist()

    # Generate random color
    color = get_random_color()

    # Create polygon data dictionary
    polygon = {
        'id': id_counter,
        'coordinates': coordinates,
        'color': color,
        'land': f'Land {id_counter}'
    }

    # Append polygon data to the list
    polygon_data.append(polygon)

    # Increment ID counter
    id_counter += 1

# Convert the polygon data to JavaScript code
js_code = f"var polygonData = {str(polygon_data)};"

# Save JavaScript code to a file
with open('output.js', 'w') as f:
    f.write(js_code)

print("JavaScript code created: output.js")
