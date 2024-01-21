import cv2
from skimage import measure
import geojson

# Load the map image
image = cv2.imread('./map.png', cv2.IMREAD_GRAYSCALE)

# Perform edge detection or other image processing steps
edges = cv2.Canny(image, 50, 150)

# Find contours in the processed image
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create a GeoJSON feature collection
features = []

for contour in contours:
    # Convert contour to GeoJSON format (simplified for illustration)
    geometry = {'type': 'Polygon', 'coordinates': [contour.squeeze().tolist()]}
    feature = {'type': 'Feature', 'geometry': geometry, 'properties': {}}
    features.append(feature)

# Create GeoJSON object
geojson_data = {'type': 'FeatureCollection', 'features': features}

# Save GeoJSON to a file
with open('output.geojson', 'w') as f:
    geojson.dump(geojson_data, f)

print("GeoJSON file created: output.geojson")
