#!/bin/bash

resize_images() {
    local dir=$1
    local width=$2

    echo "📂 Processing directory: $dir with target width: $width px"

    cd "$dir" || { echo "❌ Failed to enter $dir"; return; }

    mkdir -p _resized

    for file in *; do
        [[ -d "$file" || "$file" == _resized/* ]] && continue

        # Get original width (ImageMagick required)
        original_width=$(identify -format "%w" "$file" 2>/dev/null)

        if [[ -z "$original_width" ]]; then
            echo "⚠️ Skipping $file — not a valid image"
            continue
        fi

        output="_resized/${file}_${width}x.webp"

        if (( original_width > width )); then
            convert "$file" -resize "${width}" "$output"
            echo "✅ Resized $file → $output"
        else
            convert "$file" "$output"
            echo "➕ Copied $file as-is → $output"
        fi
    done

    cd - > /dev/null || exit
}

resize_images "public/assets/fields" 640
resize_images "public/assets/teams" 198
