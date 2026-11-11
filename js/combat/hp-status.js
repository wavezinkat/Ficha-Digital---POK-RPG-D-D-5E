// js/combat/hp-status.js — Combate: PV, status e estado
/* ---- PV, status e estado ---- */
function bHpDelta(k,d){const p=CS.act[k],m=maxHp(p),c=Math.max(0,Math.min(m,p.hpCur+d));p.hpCur=c;sfx(d<0?'del':'ok');renderLists();if(c==0)toast(`${p.name} desmaiou!`)}
function bHpApply(k){const e=$('b-hp'+k),v=e.value.trim().replace(/[−–]/g,'-').replace(/\s/g,''),p=CS.act[k],m=maxHp(p);let c;if(/^[+-]\d+$/.test(v))c=p.hpCur+parseInt(v);else if(/^\d+$/.test(v))c=parseInt(v);else return toast('Digite +10, -10 ou um valor de PV.');c=Math.max(0,Math.min(m,c));toast(`${p.name}: PV ${p.hpCur} → ${c}${c==0?' (desmaiado!)':''}`);sfx(v[0]=='-'?'del':'ok');p.hpCur=c;CS.hpEdit=-1;renderLists()}
const bSt=(k,n,vol)=>{const p=CS.act[k];if(vol){p.vol=p.vol||[];p.vol.includes(n)?p.vol.splice(p.vol.indexOf(n),1):p.vol.push(n)}else p.st=p.st==n?'':n;sfx('click');renderLists()};
const bSel=k=>{CS.sel=k;bRender()},bHpOpen=k=>{CS.hpEdit=CS.hpEdit==k?-1:k;bRender();const e=$('b-hp'+k);if(e)e.focus()},bAct=(a)=>{if(a=='Ação livre')return;const key=a=='Ação'?'a':a=='Ação bônus'?'b':'r';if(CS.acts[key])toast(`Atenção: ${a} já foi usada neste turno.`);CS.acts[key]=1};
