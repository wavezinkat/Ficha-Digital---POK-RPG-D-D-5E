// js/ui/windows.js — Painéis (abas) fixos e dock
/* painéis (abas) fixos */
const WINS=[['tab-main','Principal','fa-id-card'],['tab-trainer','Seu Treinador','fa-route'],['tab-pokemon','Pokémons','fa-paw'],['tab-combat','Combate','fa-khanda'],['tab-inventory','Inventário','fa-bag-shopping'],['tab-traits','Traços','fa-masks-theater'],['tab-save','Configurar','fa-gear']];
const IMG='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/',DECO={'tab-main':25,'tab-trainer':151,'tab-pokemon':133,'tab-combat':25,'tab-inventory':143,'tab-traits':94,'tab-save':132};
let cur='tab-main',BZ=10,BT,DEFS={},LAY={};try{LAY=JSON.parse(localStorage.getItem('pokeRpgBoxes')||'{}')}catch(e){}
const saveBoxes=()=>{try{localStorage.setItem('pokeRpgBoxes',JSON.stringify(LAY))}catch(e){}};
function sync(){document.querySelectorAll('#dock [data-w]').forEach(b=>b.classList.toggle('on',b.dataset.w==cur))}
const XWINS=[];/* janelas extras (modo Mestre), fora do sistema de caixas */
const ALLW=()=>WINS.map(w=>w[0]).concat(XWINS.map(w=>w[0]));
function openTab(id){cur=id;ALLW().forEach(w=>{const e=$(w);if(e)e.classList.toggle('hide',w!=id)});sync();sfx('open')}
function closeTab(id){$(id).classList.add('hide');cur='';sync();sfx('close')}
const SHORT={'tab-main':'Principal','tab-trainer':'Treinador','tab-pokemon':'Pokémons','tab-combat':'Combate','tab-inventory':'Inventário','tab-traits':'Traços','tab-save':'Config.','tab-wild':'Selvagens'};
/* dock lateral: ícone + nome; esconde janelas que não se aplicam (ex.: perfil selvagem) */
function buildDock(){const hide=document.body.classList.contains('wildp')?['tab-main','tab-trainer','tab-pokemon','tab-inventory','tab-traits']:[],gm=document.body.classList.contains('master');
 $('dock').innerHTML=WINS.concat(XWINS).filter(([id])=>!hide.includes(id)&&(id!='tab-wild'||gm)).map(([id,t,ic])=>`<button data-w="${id}" title="${t}" onclick="openTab('${id}')"><i class="fas ${ic}"></i><span>${SHORT[id]||t}</span></button>`).join('');sync()}
buildDock();
