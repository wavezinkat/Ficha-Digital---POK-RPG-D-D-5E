// js/core/boot.js — Início e carregamento
/* início / carregar */
function boot(){['start','wiz','dlg'].forEach(i=>show(i,0));updateFormFromData();renderCustom();openTab(cur||'tab-main')}
function start(d){charData=Object.assign({attributes:{},proficiencies:{},specs:{},expertise:{},saves:{},pokemons:[],achievements:[],inventory:[],talents:[],levelMode:'auto',boxes:{}},d);if(!d.level){const mp=(d.pokemons||[]).filter(p=>p.isMain);charData.level=mp.length?getLevelFromSum(mp.reduce((a,p)=>a+(parseInt(p.lvl)||1),0)):1}charData.levelMode='manual';boot()}
function loadJSON(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=x=>{try{start(JSON.parse(x.target.result));toast('Treinador carregado!')}catch(err){toast('Arquivo JSON inválido.')}};r.readAsText(f)}
function loadCache(){try{const s=localStorage.getItem('pokeRpgFicha');if(!s)return toast('Nenhum treinador salvo neste navegador.');start(JSON.parse(s));toast('Treinador carregado do navegador!')}catch(e){toast('Não foi possível ler o cache.')}}
function loadFromCache(){loadCache()}
