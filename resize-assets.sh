#!/bin/bash

install_tools_if_missing() {
    if ! command -v convert &> /dev/null; then
        echo "🔧 ImageMagick (convert) not found. Installing..."
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            apt update && apt install -y imagemagick
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install imagemagick
        else
            echo "❌ Unsupported OS for automatic ImageMagick installation"
            exit 1
        fi
    else
        echo "✅ ImageMagick found"
    fi

    if ! command -v webp &> /dev/null; then
        echo "🔧 webp not found. Installing..."
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            apt update && apt install -y webp
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install webp
        else
            echo "❌ Unsupported OS for automatic webp installation"
            exit 1
        fi
    else
        echo "✅ webp found"
    fi
}

resize_images() {
    local dir=$1
    local width=$2

    echo "📂 Processing directory: $dir with target width: $width px"

    cd "$dir" || { echo "❌ Failed to enter $dir"; return; }

    rm -rf _resized/*
    mkdir -p _resized

    for file in *; do
        [[ -d "$file" || "$file" == _resized/* ]] && continue

        # Get original width (ImageMagick required)
        original_width=$(identify -format "%w" "$file" 2>/dev/null)

        if [[ -z "$original_width" ]]; then
            echo "⚠️ Skipping $file — not a valid image"
            continue
        fi

        # File sizes before resize
        original_size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file")

        output="_resized/${file}_${width}x.webp"

        if (( original_width > width )); then
            convert "$file" -resize "${width}" "$output"
            resized_size=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output")
            size_diff=$(( original_size - resized_size ))
            percent=$(( 100 * size_diff / original_size ))
            echo "✅ Resized $file → $output: ${original_size} → ${resized_size} bytes (−${percent}%)"
        else
            convert "$file" "$output"
            resized_size=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output")
            echo "➕ Copied $file as-is → $output: ${original_size} → ${resized_size} bytes"
        fi
    done

    cd - > /dev/null || exit
}

compress_webp_images() {
    local dir=$1
    local quality=${2:-80}  # Default to 80 if not specified

    echo "🔍 Compressing WebP images in: $dir/_resized → quality: $quality"

    cd "$dir/_resized" || { echo "❌ Failed to enter $dir/_resized"; return; }

    for file in *.webp; do
        [[ ! -f "$file" ]] && continue

        input="$file"
        output="$file"

        original_size=$(stat -c%s "$input" 2>/dev/null || stat -f%z "$input")
        cwebp -q "$quality" "$input" -o "$output" > /dev/null 2>&1
        compressed_size=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output")

        if [[ $? -eq 0 ]]; then
            size_diff=$(( original_size - compressed_size ))
            percent=$(( 100 * size_diff / original_size ))
            echo "✅ $file: ${original_size} → ${compressed_size} bytes (−${percent}%)"
        else
            echo "⚠️ Failed to compress $file"
        fi
    done

    cd - > /dev/null || exit
}

install_tools_if_missing

resize_images "public/assets/fields" 640
resize_images "public/assets/teams" 198
resize_images "public/assets/events" 640

compress_webp_images "public/assets/fields" 75
compress_webp_images "public/assets/teams" 75
compress_webp_images "public/assets/events" 75
