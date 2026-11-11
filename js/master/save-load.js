// js/master/save-load.js — Modo Mestre: salvar/carregar
/* ---- salvar/carregar conscientes do modo mestre ---- */
{const f=saveToCache;saveToCache=function(){if(!MASTER)return f();toast(masterSaveNow()?`Perfil de mestre "${MASTER.name}" salvo no navegador!`:'Não foi possível salvar (armazenamento cheio?). Baixe o .json.')}}
{const f=downloadJSON;downloadJSON=function(){MASTER?masterDownload():f()}}
{const f=loadFromCache;loadFromCache=function(){MASTER?masterLoadCache():f()}}
function loadJSON(e){const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();r.onload=x=>{try{const d=JSON.parse(x.target.result);if(d&&d.format=='pokerpg-master')enterMaster(d);else{start(d);if(!MASTER)toast('Treinador carregado!')}}catch(err){toast('Arquivo JSON inválido.')}};r.readAsText(f)}

{const f=refreshChip;refreshChip=function(){f();if(charData.isWild&&$('chip-info'))$('chip-info').textContent='Perfil Selvagem'}}

