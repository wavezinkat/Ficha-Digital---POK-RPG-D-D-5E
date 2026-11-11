// js/features/type-colors.js — Cores de tipo (como nos jogos) em degradê, usadas em todo o site
/* Fonte única das cores: gera o CSS dos selos de tipo (.t-<tipo>) e das variáveis --c1/--c2
   usadas pelos cartões de golpes, Pokémon e lista de espécies (classe .tyc + tyS()). */
const TYC={normal:'#A8A77A',fire:'#EE8130',water:'#6390F0',electric:'#F7D02C',grass:'#7AC74C',ice:'#96D9D6',fighting:'#C22E28',poison:'#A33EA1',ground:'#E2BF65',flying:'#A98FF3',psychic:'#F95587',bug:'#A6B91A',rock:'#B6A136',ghost:'#735797',dragon:'#6F35FC',dark:'#705746',steel:'#B7B7CE',fairy:'#D685AD'};
const tyMix=(h,t,a)=>{const n=parseInt(h.slice(1),16),c=[n>>16,n>>8&255,n&255].map(v=>Math.round(v+(t-v)*a));return'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')},
 tyLum=h=>{const n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255};
/* estilo inline com as cores do tipo principal e do secundário (ou um tom mais escuro do principal) */
const tyS=t=>{t=(Array.isArray(t)?t:[t]).filter(x=>TYC[x]);if(!t.length)t=['normal'];const a=TYC[t[0]],b=t[1]?TYC[t[1]]:tyMix(a,0,.35);return`style="--c1:${a};--c2:${b}"`};
(()=>{let css='';for(const k in TYC){const b=TYC[k],l=tyMix(b,255,.22),d=tyMix(b,0,.2),dark=tyLum(b)>.62;
 css+=`.t-${k}{background:linear-gradient(180deg,${l},${d})!important;color:${dark?'#26303a':'#fff'}!important;text-shadow:${dark?'none':'0 1px 1px #0006'}!important;box-shadow:inset 0 0 0 1px #ffffff55,0 1px 2px #0004;border:0!important}`;
  css+=`.chip.t-${k}{opacity:.72}.chip.t-${k}.sel,.chip.t-${k}:hover{opacity:1;box-shadow:0 0 0 2px #fff,0 2px 6px #0006}`}
 const st=document.createElement('style');st.id='type-colors';st.textContent=css;document.head.appendChild(st)})();
