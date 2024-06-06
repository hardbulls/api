#!/bin/bash

# List of desired widths
widths=(426 640 1280)

# Navigate to the subdirectory containing SVG files
cd public/assets/media

# Loop through all SVG files in the subdirectory
for file in *.svg; do
    # Extract the filename without extension
    filename="${file%.*}"
    # Loop through each desired width
    for width in "${widths[@]}"; do
        # Convert the SVG to PNG with specified width
        convert "$file" -resize "$width" "${filename}_${width}x.png"
    done
done