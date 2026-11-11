// js/master/profile.js — Modo Mestre: dados do perfil
/* ===== MODO MESTRE ===== */
let MASTER=null,DR='',MT=null;
const MKEY='pokeRpgMaster',WILDL=()=>{const a=MASTER?MASTER.wild:[];a.forEach(pkFix);return a},srl=v=>v==.125?'1/8':v==.25?'1/4':v==.5?'1/2':String(v),
SRS=HASDB?[...new Set(PKDB.map(s=>s.sr))].sort((a,b)=>a-b):[],RGS=HASDB?[...new Set(PKDB.map(s=>s.rg).filter(Boolean))].sort():[],
WF={n:3,lvMin:1,lvMax:5,srMin:0,srMax:30,types:[],biomes:[],region:'',official:true,forms:true};
document.body.insertAdjacentHTML('beforeend',`<aside id="lrail" class="hide"><button data-d="tr" data-t="Treinadores do mestre" onclick="masterDrawer('tr')"><i class="fas fa-users"></i></button></aside><section id="drawer" class="hide"><header><b id="dr-t"></b><button onclick="masterDrawer('')" title="Fechar"><i class="fas fa-xmark"></i></button></header><div id="dr-b"></div></section>`);

/* ---- dados do perfil ---- */
const WILDIMG='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="#2d6a3a"/><path d="M9 32a23 23 0 0 1 46 0z" fill="#e5383b"/><path d="M9 32a23 23 0 0 0 46 0z" fill="#fff"/><circle cx="32" cy="32" r="7" fill="#fff" stroke="#111" stroke-width="4"/></svg>'),
wildLocked=()=>!!MASTER&&MASTER.trainers.some(t=>t.isWild&&COMB.get(t)),wLockMsg=()=>toast('Há um combate selvagem em andamento. Encerre o combate do perfil Selvagem para descartar, limpar ou entregar Pokémon.');
const normChar=d=>{const df={attributes:{},proficiencies:{},specs:{},expertise:{},saves:{},pokemons:[],achievements:[],inventory:[],talents:[],boxes:{}};for(const k in df)if(d[k]==null)d[k]=df[k];if(!d.level){const mp=d.pokemons.filter(p=>p.isMain);d.level=mp.length?getLevelFromSum(mp.reduce((a,p)=>a+(parseInt(p.lvl)||1),0)):1}d.levelMode='manual';return d};
const mkWild=()=>normChar({name:'Selvagem',isWild:true,level:1,path:'',hp:'',coins:0,img:WILDIMG,bg:''});
const masterData=()=>({format:'pokerpg-master',version:1,name:MASTER.name,active:MASTER.active,trainers:MASTER.trainers,wild:MASTER.wild});
function masterSaveNow(){try{localStorage.setItem(MKEY,JSON.stringify(masterData()));return true}catch(e){return false}}
const masterAuto=()=>{clearTimeout(MT);MT=setTimeout(()=>{if(MASTER)masterSaveNow()},400)};
setInterval(()=>{if(MASTER)masterSaveNow()},20000);
function masterDownload(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(masterData(),null,1)],{type:'application/json'}));a.download=`mestre-${(MASTER.name||'mesa').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,'-').toLowerCase()}_pokerpg.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);masterSaveNow();toast(`Perfil de mestre "${MASTER.name}" baixado (${MASTER.trainers.length} treinadores).`)}
function masterExport(i){const t=MASTER.trainers[i],a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(t,null,2)],{type:'application/json'}));a.download=(t.name||'ficha')+'_pokerpg.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);toast(`Ficha de ${t.name||'treinador'} baixada.`)}

