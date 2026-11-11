// js/ui/tooltip.js — Tooltip
(()=>{const t=document.createElement('div');t.id='tip';document.body.appendChild(t);document.addEventListener('mouseover',e=>{const a=e.target.closest&&e.target.closest('.ach');if(!a||!a.dataset.t){t.style.display='none';return}const r=a.getBoundingClientRect();t.textContent=a.dataset.t;t.style.display='block';t.style.left=Math.max(6,Math.min(innerWidth-t.offsetWidth-6,r.left+r.width/2-t.offsetWidth/2))+'px';t.style.top=(r.top-t.offsetHeight-8>6?r.top-t.offsetHeight-8:r.bottom+8)+'px'})})();

