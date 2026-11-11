// js/core/music.js — Playlist: músicas da pasta music/ (detecção automática) + escolha da faixa e do modo
/* Lista = music/playlist.js (MUSIC_LIST) + o que o servidor listar da pasta music/ (quando permitir).
   O arquivo atualizar-musicas.bat / .py regenera o playlist.js com tudo que estiver na pasta. */
const MEXT=/\.(mp3|ogg|oga|wav|m4a|aac|flac|opus|webm)$/i;
let MU={track:'',mode:'one',bg:1};try{Object.assign(MU,JSON.parse(localStorage.getItem('pokeRpgMusic')))}catch(e){}
const saveMu=()=>{try{localStorage.setItem('pokeRpgMusic',JSON.stringify(MU))}catch(e){}};
const MUSIC=(typeof MUSIC_LIST!='undefined'&&Array.isArray(MUSIC_LIST)?MUSIC_LIST:[]).map(t=>({f:t.f,n:t.n||musicName(t.f)}));
if(!MUSIC.length)MUSIC.push({f:'music/route24.mp3',n:'Route 24 (Pokémon Remix) — Ramstar'});
/* papéis de parede: wallpapers/lista.js (BG_LIST) + pasta detectada. A 1ª imagem acompanha a 2ª música, a 2ª a 3ª...
   (a música padrão route24 não conta e usa o fundo normal do site) */
const IEXT=/\.(jpe?g|png|webp|gif|avif|bmp)$/i,BGS=(typeof BG_LIST!='undefined'&&Array.isArray(BG_LIST)?BG_LIST:[]).slice();
const muDef=()=>{const i=MUSIC.findIndex(t=>/(^|\/)route24\.[a-z0-9]+$/i.test(t.f));return i<0?0:i};
function muBgFor(f){const i=MUSIC.findIndex(t=>t.f==f),d=muDef();return i<0||i==d?'':(BGS[i<d?i:i-1]||'')}
let BGL=[document.createElement('div'),document.createElement('div')],BGI=0,BGC='';BGL.forEach(e=>{e.className='bgl';document.body.prepend(e)});
function muBg(){const u=(MU.bg&&!(typeof charData!='undefined'&&charData.bg))?muBgFor(MU.track):'';if(u==BGC)return;BGC=u;
 const a=BGL[BGI],b=BGL[1-BGI];if(u){b.style.backgroundImage=`linear-gradient(#0a14288c,#0a14288c),url("${encodeURI(u)}")`;b.classList.add('on');a.classList.remove('on');BGI=1-BGI}else{a.classList.remove('on');b.classList.remove('on')}}
function musicName(f){let n=decodeURIComponent(String(f).split('/').pop()).replace(MEXT,'').replace(/[_]+/g,' ').trim();return n||f}
const muIdx=()=>Math.max(0,MUSIC.findIndex(t=>t.f==MU.track));
function muSet(i,play){const t=MUSIC[(i+MUSIC.length)%MUSIC.length];MU.track=t.f;saveMu();muBg();bgm.src=t.f;bgm.loop=MU.mode=='one';if(play!==false&&AU.m)bgm.play().catch(()=>{});muDraw()}
function muNext(d){if(MUSIC.length<2)return muSet(muIdx());let i=muIdx();if(MU.mode=='shuffle'&&!d){let j;do{j=Math.floor(Math.random()*MUSIC.length)}while(j==i);i=j}else i+=d||1;muSet(i)}
bgm.addEventListener('ended',()=>{if(MU.mode!='one')muNext(1)});
bgm.addEventListener('error',()=>{/* arquivo sumiu: pula para a próxima faixa existente */if(MUSIC.length>1&&bgm.dataset.err!=MU.track){bgm.dataset.err=MU.track;muNext(1)}});
bgm.loop=MU.mode=='one';bgm.src=MUSIC[muIdx()].f;MU.track=MUSIC[muIdx()].f;muBg();
/* detecção automática: servidores que listam a pasta (Live Server, python -m http.server, Apache...) */
async function muScan(){let add=0;if(!/^https?:/.test(location.protocol))return muDraw();
 try{const r=await fetch('music/',{cache:'no-store'});if(r.ok){const h=await r.text(),d=document.createElement('div');d.innerHTML=h;
  d.querySelectorAll('a[href]').forEach(a=>{const h=a.getAttribute('href')||'';if(!MEXT.test(h.split('?')[0]))return;const f='music/'+decodeURIComponent(h.split('?')[0]).replace(/^.*\//,'');if(!MUSIC.some(t=>t.f==f)){MUSIC.push({f:f,n:musicName(f)});add++}})}}catch(e){}
 try{const r=await fetch('wallpapers/',{cache:'no-store'});if(r.ok){const d=document.createElement('div');d.innerHTML=await r.text();let n=0;d.querySelectorAll('a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').split('?')[0];if(!IEXT.test(h))return;const f='wallpapers/'+decodeURIComponent(h).replace(/^.*\//,'');if(!BGS.includes(f)){BGS.push(f);n++}});if(n){BGS.sort((x,y)=>x.localeCompare(y,undefined,{numeric:true,sensitivity:'base'}));muBg()}}}catch(e){}
 if(add)toast(`${add} música(s) nova(s) encontrada(s) na pasta music.`);muDraw()}
/* interface (caixa Música no Configurar) */
function muDraw(){const e=document.getElementById('au-pl');if(!e)return;
 e.innerHTML=`<div class="mup"><label>Música:</label><div class="murow"><button class="btn sm" onclick="muNext(-1)" title="Anterior"><i class="fas fa-backward-step"></i></button><select id="mu-sel">${MUSIC.map((t,i)=>`<option value="${i}" ${t.f==MU.track?'selected':''}>${esc(t.n)}</option>`).join('')}</select><button class="btn sm" onclick="muNext(1)" title="Próxima"><i class="fas fa-forward-step"></i></button></div>
 <label>Ao terminar:</label><select id="mu-mode"><option value="one" ${MU.mode=='one'?'selected':''}>Repetir esta música</option><option value="seq" ${MU.mode=='seq'?'selected':''}>Tocar a lista em sequência</option><option value="shuffle" ${MU.mode=='shuffle'?'selected':''}>Aleatório</option></select>
 <label class="mubg"><input type="checkbox" id="mu-bg" ${MU.bg?'checked':''}> Trocar o papel de parede junto com a música</label>
 <p class="note">${MUSIC.length} música(s) e ${BGS.length} papel(éis) de parede. Para adicionar mais, coloque as músicas na pasta <b>music</b> e os papéis de parede na pasta <b>wallpapers</b> (a 1ª imagem acompanha a 2ª música, a 2ª imagem a 3ª... em ordem de nome; a música padrão não tem papel próprio) e atualize a página (se não aparecerem, dê dois cliques em <b>atualizar-musicas.bat</b>). <button class="btn sm" onclick="muScan()"><i class="fas fa-rotate"></i> Procurar músicas</button></p></div>`;
 e.querySelector('#mu-sel').onchange=ev=>muSet(+ev.target.value);e.querySelector('#mu-bg').onchange=ev=>{MU.bg=+ev.target.checked;saveMu();BGC='\0';muBg()};e.querySelector('#mu-mode').onchange=ev=>{MU.mode=ev.target.value;saveMu();bgm.loop=MU.mode=='one'}}
{const f=initBoxes;initBoxes=function(){const r=f.apply(this,arguments);muDraw();muScan();return r}}
{const f=updateBackground;updateBackground=function(){const r=f.apply(this,arguments);muBg();return r}}
