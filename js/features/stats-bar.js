// js/features/stats-bar.js — Faixa de status compacta no topo
/* ---- faixa de status compacta no topo ---- */
function statsInit(){if($('stats'))return;const d=document.createElement('div');d.id='stats';
 const SL={'char-hp':'PV','char-coins':'Dinheiro','char-ac':'CA','char-speed':'Movimento','char-inspiration':'Inspiração','char-maxcr':'SR máx.'},chip=(ic,lab,id,cls,extra)=>{const w=document.createElement('label');w.className='sc '+(cls||'');w.title=lab;w.innerHTML=`<i class="fas ${ic}"></i><em>${SL[id]}</em>`;w.appendChild($(id));if(extra)w.insertAdjacentHTML('beforeend',extra);d.appendChild(w);return w};
 chip('fa-heart','PV (use +10 ou -10 para somar/subtrair)','char-hp','hp','<span class="hpm"><i id="hp-bar"></i></span>');chip('fa-coins','Poke Coins (₽)','char-coins','mn');chip('fa-shield-halved','Classe de Armadura','char-ac','ac');chip('fa-person-running','Movimentação','char-speed','sp');chip('fa-star','Inspiração','char-inspiration','in');chip('fa-bullseye','SR máximo de captura','char-maxcr','cr');
 $('statbar').appendChild(d);d.insertAdjacentHTML('afterend','<button id="restbtn" onclick="restDlg()" title="Descanso longo"><i class="fas fa-moon"></i><span>Descanso longo</span></button>');const hp=$('char-hp');hp.placeholder='25 / 30';hp.setAttribute('autocomplete','off');
 hp.addEventListener('focus',()=>{hp._last=hp.value});
 hp.addEventListener('change',()=>{const v=hp.value.trim().replace(/[−–]/g,'-').replace(/\s/g,'');if(/^[+-]\d+$/.test(v)){const m=String(hp._last).match(/(\d+)\s*\/\s*(\d+)/);if(m){const c=Math.max(0,Math.min(+m[2],+m[1]+parseInt(v)));charData.hp=`${c} / ${m[2]}`;hp.value=charData.hp;toast(`PV: ${m[1]} → ${c}${c==0?' (desmaiado!)':''}`);sfx(v[0]=='-'?'del':'ok')}else{hp.value=hp._last;charData.hp=hp._last;toast('Escreva os PV como "25 / 30" antes de usar +/−.')}}statsRefresh()});
 hp.addEventListener('input',statsRefresh)}
function statsRefresh(){const b=$('hp-bar');if(!b)return;const m=String(charData.hp||'').match(/(\d+)\s*\/\s*(\d+)/),p=m&&+m[2]?Math.max(0,Math.min(1,+m[1]/+m[2])):0;b.style.width=p*100+'%';b.style.background=`hsl(${Math.round(p*120)} 70% 45%)`}

