// js/master/wild-window.js — Modo Mestre: gerador de selvagens como janela da dock + perfil Selvagem enxuto
/* A lista/gerador de selvagens (wdHTML) agora é uma janela normal nas abas da direita.
   No perfil "Selvagem" somem as janelas e barras que só fazem sentido para treinadores. */
XWINS.push(['tab-wild','Pokémon Selvagens','fa-leaf']);
document.body.insertAdjacentHTML('beforeend',`<section id="tab-wild" class="win hide"><header class="bar"><b><i class="fas fa-leaf"></i> Pokémon Selvagens</b><span class="grow"></span><button onclick="closeTab('tab-wild')" title="Fechar"><i class="fas fa-xmark"></i></button></header><div class="wb"><div id="wild-b" class="wdw"></div></div></section>`);
function wildRender(){const w=$('tab-wild');if(!MASTER||!w||w.classList.contains('hide'))return;const b=$('wild-b'),t=b.parentNode.scrollTop;b.innerHTML=wdHTML();b.parentNode.scrollTop=t}
{const f=masterRender;masterRender=function(){f.apply(this,arguments);wildRender()}}
{const f=openTab;openTab=function(id){const r=f.apply(this,arguments);if(id=='tab-wild')wildRender();return r}}
const WILDHIDE=['tab-main','tab-trainer','tab-pokemon','tab-inventory','tab-traits'];
function wildSync(){const t=MASTER&&MASTER.trainers[MASTER.active],w=!!(t&&t.isWild);document.body.classList.toggle('wildp',w);buildDock();
 if(!MASTER&&cur=='tab-wild')cur='tab-main';if(w&&(WILDHIDE.includes(cur)||!cur))openTab('tab-combat');else if(!w&&cur=='tab-wild'&&!MASTER)openTab('tab-main')}
{const f=switchTo;switchTo=function(){const r=f.apply(this,arguments);wildSync();return r}}
{const f=enterMaster;enterMaster=function(){const r=f.apply(this,arguments);wildSync();return r}}
{const f=goHome;goHome=function(){const m=MASTER,r=f.apply(this,arguments);if(m&&!MASTER){$('tab-wild').classList.add('hide');wildSync()}return r}}
