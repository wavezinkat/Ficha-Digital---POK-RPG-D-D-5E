// js/features/chip.js — Avatar e chip do treinador
/* avatar + chip */
const av=(img,n)=>img||'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="hsl(${[...(n||'?')].reduce((a,c)=>a+c.charCodeAt(0),0)%360} 50% 42%)"/><text x="32" y="43" font-size="30" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700">${(n||'?')[0].toUpperCase()}</text></svg>`);
function refreshChip(){if(window.statsRefresh)statsRefresh();const i=$('chip-img');i.onerror=()=>{i.onerror=null;i.src=av('',charData.name)};i.src=av(charData.img,charData.name);
 $('chip-name').textContent=charData.name||'Sem nome';$('chip-info').textContent=`${charData.path||'Sem caminho'}`;
 $('saves').textContent='Resistências: '+(ATTRS.filter(a=>charData.saves&&charData.saves[a.id]).map(a=>a.id.toUpperCase()+' '+sg(mod(charData.attributes[a.id]||10)+profBonus)).join(' · ')||'—')}
['updateFormFromData','updateStats','updateCharImage'].forEach(n=>{const f=window[n];window[n]=function(){const r=f.apply(this,arguments);refreshChip();return r}});

