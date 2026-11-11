// js/combat/core.js — Combate: constantes e estado
/* ===== COMBATE: motor de rolagens + tela de batalha ===== */
const SPECT={'Guardião dos Pássaros':'flying','Maníaco por Insetos':'bug','Campista':'ground','Domador de Dragões':'dragon','Engenheiro':'electric','Piromaníaco':'fire','Jardineiro':'grass','Artista Marcial':'fighting','Alpinista':'rock','Místico':'ghost','Metalúrgico':'steel','Psíquico':'psychic','Nadador':'water','Encantador':'fairy','Sombrio':'dark','Alquimista':'poison','Jogador de Equipe':'normal','Esquiador':'ice'},
ITEMT={'Black Belt':'fighting','Black Glasses':'dark',Charcoal:'fire','Dragon Fang':'dragon','Fairy Feather':'fairy','Hard Stone':'rock',Magnet:'electric','Metal Coat':'steel','Miracle Seed':'grass','Mystic Water':'water','NeverMelt Ice':'ice','Poison Barb':'poison','Sharp Beak':'flying','Silk Scarf':'normal','Silver Powder':'bug','Soft Sand':'ground','Spell Tag':'ghost','Twisted Spoon':'psychic'},
ABFX={'Encrenca em Dobro':{adv:1,dur:'once'},'Líder de Torcida':{ask:1,val:()=>rM('car'),dur:'turn'},'Espírito':{ask:1,val:()=>rM('sab'),dur:'turn'},'Professor':{atk:2,dur:'turn'},'Somos Uma Equipe':{adv:1,dur:'turn'},'Mostre-Me o Que Você Tem':{dbl:1,dur:'once'},'Golpe Direcionado':{hi:1,dur:'once'}};
let CS=null,RV=null;const bMax=()=>charData.isWild?99:2;const COMB=new WeakMap(),tpath=()=>charData.isWild?'':(charData.path||''),tTal=()=>charData.isWild?[]:(charData.talents||[]),bParty=()=>charData.isWild&&MASTER?MASTER.wild:PKT().filter(p=>p.loc=='party');
function setCS(v){CS=v;if(MASTER){if(v)COMB.set(charData,v);else COMB.delete(charData)}}
const LASTC=new WeakMap(),sumP=a=>a.reduce((s,x)=>s+x[1],0),bsum=(B,k)=>B.reduce((s,b)=>s+(b[k]||0),0);
const BITE=new Set(['bite','crunch','fire-fang','hyper-fang','ice-fang','poison-fang','psychic-fangs','thunder-fang']),PULSE=new Set(['aura-sphere','dark-pulse','dragon-pulse','origin-pulse','water-pulse']);
function ATY(p,t){return t=='normal'&&({aerilate:'flying',pixilate:'fairy',refrigerate:'ice'})[p.ab]||t}
const specTypes=()=>charData.isWild?[]:Object.keys(charData.specs||{}).filter(k=>charData.specs[k]&&SPECT[k]).map(k=>SPECT[k]);
const roll=(n,f)=>Array.from({length:n},()=>R(f)),pTypes=p=>(p.sx||{}).t||[];
function moveInfo(p,m){const md=PKMD[m.id]||{},d=PKMV[m.id],pw=pwl(md).map(a=>mod(p.at[SVK.indexOf(a)]));return{md,d,ty:ATY(p,m.type||md.t||''),types:pTypes(p),MV:pw.length?Math.max(...pw):0,P:pbn(p.lvl),desc:d?d[1]:''}}
