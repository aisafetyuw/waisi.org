# Utility script that does png --> jpg
# To run, do this once: chmod +x convert.sh
# Then: ./convert.sh input.png
# Make sure you have ffmpeg

set -euo pipefail

in_file="$1"
if [[ ! -f "$in_file" ]]; then
  echo "Error: '$in_file' not found." >&2
  exit 1
fi
base_name="${in_file%.*}"
out_file="${base_name}.jpg"
ffmpeg -loglevel error -y -i "$in_file" -preset ultrafast "$out_file"
rm -- "$in_file"

echo "✓ Created  '$out_file' and removed '$in_file'"
