#!/usr/bin/env bash
# fetch-images.sh
set -euo pipefail

BASE_DIR="public/images/listings"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
MAP_FILE="scripts/image-map.json"

mkdir -p "$(dirname "$MAP_FILE")"

# Parallel arrays: slug → eBay item ID
SLUGS=(
  "pentair-centrifugal-fire-pump-1500gpm"
  "tornatech-gps-gpu-fire-pump-controller"
  "baldor-em4111t-25hp-electric-motor"
  "daikin-smartsource-horizontal-heat-pump"
  "cla-val-float-valve-2in"
  "toshiba-xario-ultrasound-machine"
  "greenheck-csp-a1050-exhaust-fan"
  "ite-jd23b350-350amp-circuit-breaker"
  "cla-val-55l60-thermal-expansion-relief-valve"
  "global-vision-6in-fire-pump-flow-meter"
  "greenheck-csp-a700-exhaust-fan"
  "ite-jl63f400-250amp-circuit-breaker"
  "greenheck-csp-a390-inline-cabinet-fan"
  "cla-val-air-release-valve"
  "greenheck-csp-a200-cabinet-fan"
  "tornatech-jockey-pump-controller"
  "baldor-5hp-motor-184tcz"
  "ite-double-vacu-break-switch-v7e3622"
  "lennox-rtu-control-board"
  "greenheck-sp-ap0511w-bathroom-exhaust-fan"
  "pro1-t631w2-wireless-ptac-thermostat"
  "ge-cr353aby30h-contactor"
)

ITEM_IDS=(
  "397623420891"
  "397440112726"
  "397714891249"
  "397594658186"
  "397591023686"
  "397566837254"
  "397602177893"
  "397724386857"
  "397686570494"
  "397591041792"
  "397602276302"
  "397724439912"
  "397693850968"
  "397686549296"
  "397589804194"
  "397589779766"
  "397714916162"
  "397724421586"
  "397571775343"
  "397571804380"
  "397566825598"
  "397564896928"
)

total=${#SLUGS[@]}
echo "{" > "$MAP_FILE"

for idx in "${!SLUGS[@]}"; do
  slug="${SLUGS[$idx]}"
  item_id="${ITEM_IDS[$idx]}"
  dir="$BASE_DIR/$slug"
  mkdir -p "$dir"

  count=$((idx + 1))
  echo "[$count/$total] $slug ($item_id)"

  urls=$(curl -s -A "$UA" \
    -H "Accept-Language: en-US,en;q=0.9" \
    "https://www.ebay.com/itm/$item_id" \
    | grep -oE '"https://i\.ebayimg\.com/images/g/[A-Za-z0-9~_-]+/s-l1600\.jpg"' \
    | tr -d '"' \
    | sort -u)

  image_paths=""
  i=1

  if [ -n "$urls" ]; then
    while IFS= read -r url; do
      file="$dir/${i}.jpg"
      echo "  Downloading image $i..."
      curl -s -o "$file" "$url"
      sips -Z 1200 "$file" > /dev/null 2>&1
      path="/images/listings/$slug/${i}.jpg"
      if [ $i -eq 1 ]; then
        image_paths="\"$path\""
      else
        image_paths="$image_paths, \"$path\""
      fi
      i=$((i + 1))
    done <<< "$urls"
    echo "  → $((i-1)) image(s)"
  else
    echo "  WARNING: No images found"
  fi

  comma=$([ $count -lt $total ] && echo ',' || echo '')
  echo "  \"$slug\": [$image_paths]$comma" >> "$MAP_FILE"

  sleep 0.75
done

echo "}" >> "$MAP_FILE"
echo ""
echo "Image map written to $MAP_FILE"
