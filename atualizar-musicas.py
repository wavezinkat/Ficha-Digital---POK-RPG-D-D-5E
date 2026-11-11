#!/usr/bin/env python3
"""Atualiza music/playlist.js com todas as músicas que estão na pasta music/.
Uso: coloque os arquivos na pasta music e rode  python atualizar-musicas.py
Para dar um nome bonito a uma faixa, crie um arquivo de texto com o mesmo nome (ex.: route24.txt) contendo o título."""
import os, json
base = os.path.dirname(os.path.abspath(__file__))
pasta = os.path.join(base, 'music')
ext = ('.mp3', '.ogg', '.wav', '.m4a', '.aac', '.flac', '.opus', '.webm')
itens = []
for nome in sorted(os.listdir(pasta), key=str.lower):
    if nome.lower().endswith(ext):
        stem = os.path.splitext(nome)[0]
        titulo = ''
        t = os.path.join(pasta, stem + '.txt')
        if os.path.exists(t):
            txt = open(t, encoding='utf-8').read().strip()
            titulo = txt.splitlines()[0] if txt else ''
        if not titulo:
            titulo = 'Route 24 (Pokémon Remix) — Ramstar' if stem.lower() == 'route24' else stem.replace('_', ' ').replace('-', ' ').strip()
        itens.append({'f': 'music/' + nome, 'n': titulo})
cab = open(os.path.join(pasta, 'playlist.js'), encoding='utf-8').read().split('const MUSIC_LIST')[0]
linhas = ',\n'.join(' {f:%s,n:%s}' % (json.dumps(i['f'], ensure_ascii=False), json.dumps(i['n'], ensure_ascii=False)) for i in itens)
open(os.path.join(pasta, 'playlist.js'), 'w', encoding='utf-8').write(cab + 'const MUSIC_LIST=[\n' + linhas + '\n];\n')
print('%d música(s) na lista.' % len(itens))

# papéis de parede (wallpapers/lista.js): ordem alfabética; a 1ª imagem vai com a 2ª música, etc.
pw = os.path.join(base, 'wallpapers')
os.makedirs(pw, exist_ok=True)
iext = ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp')
imgs = sorted([n for n in os.listdir(pw) if n.lower().endswith(iext)], key=str.lower)
arq = os.path.join(pw, 'lista.js')
cab = open(arq, encoding='utf-8').read().split('const BG_LIST')[0] if os.path.exists(arq) else ''
linhas = ',\n'.join(' ' + json.dumps('wallpapers/' + n, ensure_ascii=False) for n in imgs)
open(arq, 'w', encoding='utf-8').write(cab + 'const BG_LIST=[\n' + linhas + ('\n' if linhas else '') + '];\n')
print('%d papel(éis) de parede na lista.' % len(imgs))
