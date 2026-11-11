// Atualiza music/playlist.js e wallpapers/lista.js com o que estiver nas pastas.
// Uso: node atualizar-musicas.js   (a Vercel roda isto sozinha a cada deploy, veja vercel.json)
const fs = require('fs'), path = require('path');
const base = __dirname, MEXT = /\.(mp3|ogg|oga|wav|m4a|aac|flac|opus|webm)$/i, IEXT = /\.(jpe?g|png|webp|gif|avif|bmp)$/i;
const cmp = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
function lista(dir, re) { const p = path.join(base, dir); fs.mkdirSync(p, { recursive: true }); return fs.readdirSync(p).filter(n => re.test(n)).sort(cmp); }
function reescreve(arq, nome, corpo) {
  const f = path.join(base, arq); let cab = '';
  try { cab = fs.readFileSync(f, 'utf8').split('const ' + nome)[0]; } catch (e) {}
  fs.writeFileSync(f, cab + 'const ' + nome + '=[\n' + corpo + (corpo ? '\n' : '') + '];\n');
}
const mus = lista('music', MEXT).map(n => {
  const stem = n.replace(MEXT, ''); let t = '';
  try { t = fs.readFileSync(path.join(base, 'music', stem + '.txt'), 'utf8').trim().split(/\r?\n/)[0]; } catch (e) {}
  if (!t) t = stem.replace(/^\d+[\s._-]+/, '').replace(/[_]+/g, ' ').trim() || stem;
  return ' {f:' + JSON.stringify('music/' + n) + ',n:' + JSON.stringify(t) + '}';
});
reescreve('music/playlist.js', 'MUSIC_LIST', mus.join(',\n'));
const imgs = lista('wallpapers', IEXT).map(n => ' ' + JSON.stringify('wallpapers/' + n));
reescreve('wallpapers/lista.js', 'BG_LIST', imgs.join(',\n'));
console.log(mus.length + ' música(s) e ' + imgs.length + ' papel(éis) de parede na lista.');
