import json
import os

# Define paths
base_path = r'c:\Users\WinDows\.gemini\antigravity\scratch\dar-al-madinah-museum\src'
data_file = os.path.join(base_path, 'data.json')
chunks = [
    'chunk_6_8.json',
    'chunk_9_11.json',
    'chunk_12_14.json',
    'chunk_15_16.json'
]

# Load the verified prefix (Models 1-5 already in data.json)
print(f"Loading base data from {data_file}...")
with open(data_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Initial artifact count: {len(data['artifacts'])}")

# Merge chunks
for chunk_name in chunks:
    chunk_path = os.path.join(base_path, chunk_name)
    print(f"Merging {chunk_name}...")
    with open(chunk_path, 'r', encoding='utf-8') as f:
        chunk_data = json.load(f)
        data['artifacts'].extend(chunk_data)

# Final count check
final_count = len(data['artifacts'])
print(f"Final artifact count: {final_count}")

if final_count == 16:
    print("Success: 16 artifacts found. Writing to data.json...")
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Done.")
else:
    print(f"Error: Expected 16 artifacts, but found {final_count}. Check manual alignment.")
