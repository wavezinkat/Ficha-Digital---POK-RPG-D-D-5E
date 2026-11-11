/* music/playlist.js — lista de músicas do site.
   Para adicionar músicas: coloque os arquivos (.mp3 .ogg .wav .m4a ...) nesta pasta "music".
   • Em servidores que mostram a lista de arquivos da pasta (ex.: Live Server do VS Code, python -m http.server) o site detecta sozinho.
   • Nos demais (abrindo o index.html direto, GitHub Pages...) dê dois cliques em "atualizar-musicas.bat" (Windows)
     ou rode "python atualizar-musicas.py": ele reescreve este arquivo com todas as músicas da pasta.
   Você também pode editar à mão: {f:'music/arquivo.mp3', n:'Nome que aparece no site'}. */
const MUSIC_LIST=[
 {f:"music/01-Padr_o.mp3",n:"Padrão (Route 24 — Pokémon Remix, Ramstar)"},
 {f:"music/02-A_aventura.mp3",n:"A aventura"},
 {f:"music/03-As_Conquistas.mp3",n:"As Conquistas"},
 {f:"music/04-Os_Companheiros.mp3",n:"Os Companheiros"},
 {f:"music/05-As_Mem_rias.mp3",n:"As Memórias"},
 {f:"music/06-O_Conflito.mp3",n:"O Conflito"}
];
