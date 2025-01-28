#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Download marker icons
curl -o public/marker-icon.png https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png
curl -o public/marker-icon-2x.png https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png
curl -o public/marker-shadow.png https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png 