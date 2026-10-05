from PIL import Image, ImageDraw
import numpy as np

def clean_yoast():
    im = Image.open('public/icons/yoast.png').convert('RGBA')
    arr = np.array(im)
    # The Yoast icon content is around x: 104 to 256, y: 8 to 184
    # Detect non-white pixels
    mask = ~((arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240))
    coords = np.argwhere(mask)
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    
    cropped = im.crop((x0, y0, x1, y1))
    c_arr = np.array(cropped)
    
    # Remove white background inside cropped area
    # Only remove white outside the icon shapes
    # Flood-fill or transparency based on brightness
    alpha = c_arr[:, :, 3].astype(float)
    is_white = (c_arr[:, :, 0] > 240) & (c_arr[:, :, 1] > 240) & (c_arr[:, :, 2] > 240)
    
    # Simple flood fill from corners of cropped area to remove exterior white
    h, w = cropped.size[1], cropped.size[0]
    visited = np.zeros((h, w), dtype=bool)
    from collections import deque
    queue = deque()
    
    for x in range(w):
        if is_white[0, x]: queue.append((0, x)); visited[0, x] = True
        if is_white[h-1, x]: queue.append((h-1, x)); visited[h-1, x] = True
    for y in range(h):
        if is_white[y, 0]: queue.append((y, 0)); visited[y, 0] = True
        if is_white[y, w-1]: queue.append((y, w-1)); visited[y, w-1] = True
        
    while queue:
        cy, cx = queue.popleft()
        c_arr[cy, cx, 3] = 0
        for ny, nx in [(cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)]:
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_white[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
                
    result_cropped = Image.fromarray(c_arr)
    # Fit into a 256x256 square canvas
    canvas = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    # Scale result_cropped to fit nicely with padding
    max_dim = max(w, h)
    scale = 230 / max_dim
    new_w, new_h = int(w * scale), int(h * scale)
    scaled = result_cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas.paste(scaled, ((256 - new_w) // 2, (256 - new_h) // 2), scaled)
    canvas.save('public/icons/yoast.png', 'PNG')
    print("Yoast cleaned successfully!")

def clean_freemat():
    im = Image.open('public/icons/freemat.png').convert('RGBA')
    arr = np.array(im)
    h, w = im.size[1], im.size[0]
    is_white = (arr[:, :, 0] > 235) & (arr[:, :, 1] > 235) & (arr[:, :, 2] > 235)
    
    # Flood-fill from outer edges to remove background white only
    from collections import deque
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    for x in range(w):
        if is_white[0, x]: queue.append((0, x)); visited[0, x] = True
        if is_white[h-1, x]: queue.append((h-1, x)); visited[h-1, x] = True
    for y in range(h):
        if is_white[y, 0]: queue.append((y, 0)); visited[y, 0] = True
        if is_white[y, w-1]: queue.append((y, w-1)); visited[y, w-1] = True
        
    while queue:
        cy, cx = queue.popleft()
        arr[cy, cx, 3] = 0
        for ny, nx in [(cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)]:
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_white[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
                
    # Also find content bounding box
    mask = arr[:, :, 3] > 0
    coords = np.argwhere(mask)
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    
    res = Image.fromarray(arr).crop((x0, y0, x1, y1))
    cw, ch = res.size
    canvas = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    scale = 230 / max(cw, ch)
    nw, nh = int(cw * scale), int(ch * scale)
    scaled = res.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas.paste(scaled, ((256 - nw) // 2, (256 - nh) // 2), scaled)
    canvas.save('public/icons/freemat.png', 'PNG')
    print("FreeMat cleaned successfully!")

def clean_astra():
    im = Image.open('public/icons/astra.png').convert('RGBA')
    w, h = im.size
    # Create circular mask
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((2, 2, w - 3, h - 3), fill=255)
    
    im.putalpha(mask)
    canvas = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    scaled = im.resize((230, 230), Image.Resampling.LANCZOS)
    canvas.paste(scaled, (13, 13), scaled)
    canvas.save('public/icons/astra.png', 'PNG')
    print("Astra cleaned successfully!")

def clean_ltspice():
    im = Image.open('public/icons/ltspice.png').convert('RGBA')
    w, h = im.size
    # Create rounded rectangle mask with smooth corner radius
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    radius = int(min(w, h) * 0.12)
    draw.rounded_rectangle((2, 2, w - 3, h - 3), radius=radius, fill=255)
    
    im.putalpha(mask)
    canvas = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    scaled = im.resize((230, 230), Image.Resampling.LANCZOS)
    canvas.paste(scaled, (13, 13), scaled)
    canvas.save('public/icons/ltspice.png', 'PNG')
    print("LTspice cleaned successfully!")

clean_yoast()
clean_freemat()
clean_astra()
clean_ltspice()
