// js/core/utils.js — Utilitários globais: $, R, pick, mod, toast...
/* ===== NOVA CAMADA: painéis fixos, caixas móveis, áudio ===== */
const $=id=>document.getElementById(id),R=n=>Math.floor(Math.random()*n)+1,pick=a=>a[R(a.length)-1],mod=v=>Math.floor((v-10)/2),sg=n=>(n>=0?'+':'')+n,shuf=a=>[...a].sort(()=>Math.random()-.5),show=(i,v)=>$(i).classList.toggle('hide',!v);
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),3200)}
window.alert=toast;

