"""Append CJK SDF glyphs to the original MSDF atlas. Requires Pillow, numpy, scipy.
Usage: python scripts/build-chinese-atlas.py /path/to/NotoSansSC.ttf
Run on the upstream (unmodified) public/fonts/font-atlas.png and font-def.json.
"""
import base64, json, re, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import distance_transform_edt
root=Path(__file__).resolve().parents[1]
defpath=root/'public/fonts/font-def.json'
data=json.loads(defpath.read_text())
face=data['faces'][0]
# Rebuilding from an already extended atlas also works: original glyphs are retained,
# existing CJK glyphs are replaced at deterministic coordinates.
raw=np.frombuffer(base64.b64decode(face['chars']),dtype='<i2').reshape(-1,12)
raw=raw[(raw[:,2].astype(np.uint16)<0x4e00)|(raw[:,2].astype(np.uint16)>0x9fff)]
paths=[root/'src/llm/GptModelLayout.ts',root/'src/llm/components/ModelCard.ts',root/'src/llm/components/SectionLabels.ts']
chars=sorted(set(re.findall(r'[\u4e00-\u9fff]', ''.join(p.read_text() for p in paths))))
font=ImageFont.truetype(sys.argv[1],32)
atlas=Image.new('RGB',(1024,1024));original=Image.open(root/'public/fonts/font-atlas.png').convert('RGB');atlas.paste(original.crop((0,0,512,256)),(0,0))
rows=[]
for i,ch in enumerate(chars):
    x=(i%21)*48;y=272+(i//21)*48
    mask=Image.new('L',(44,44));ImageDraw.Draw(mask).text((5,3),ch,font=font,fill=255,anchor='lt')
    binary=np.array(mask)>127
    signed=distance_transform_edt(binary)-distance_transform_edt(~binary)
    sdf=np.uint8(np.clip(127.5+signed*255/4,0,255))
    atlas.paste(Image.fromarray(sdf).convert('RGB'),(x,y))
    # lineHeight 44, baseline 34: glyph top matches the original Latin face.
    rows.append([ord(ch),len(raw)+i,ord(ch),x,y,44,44,-5,3,32,0,15])
face['chars']=base64.b64encode(np.concatenate([raw,np.array(rows).astype('<i2')]).astype('<i2').tobytes()).decode()
face['info']['charset']=''.join(chr(int(c)&0xffff) for c in raw[:,2])+''.join(chars)
for f in data['faces']:f['common']['scaleW']=1024;f['common']['scaleH']=1024
atlas.save(root/'public/fonts/font-atlas.png',optimize=True)
defpath.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
print(f'Added {len(chars)} Chinese glyphs; atlas is {1024}x{1024}.')
