// js/wizard/random-trainer.js — Treinador aleatório
/* ===== treinador aleatório ===== */
function diceAsk(){$('dlg').innerHTML=`<div class="wc" style="width:min(420px,92vw)"><div class="wbody"><h2><i class="fas fa-dice-d20"></i> Treinador aleatório</h2><p>Qual nível ele deve ter?</p><div class="lv"><b id="dl">5</b><input type="range" min="1" max="20" value="5" oninput="$('dl').textContent=this.value"></div></div><div class="wnav"><button class="btn alt" onclick="show('dlg',0)">Cancelar</button><button class="btn" onclick="randGo(+$('dl').textContent)"><i class="fas fa-dice"></i> Rolar treinador</button></div></div>`;show('dlg',1)}
function randGo(L,nm){sfx('dice');W=newW();W.level=L;W.name=nm||pick(NAMES);W.path=L>1?pick(TRAINER_PATHS):'';
 for(let i=0;i<slots(W);i++){const n=pick(SPECIALIZATIONS),c=G[n].sc||G[n].ac;W.picks.push({n,c:c?pick(c):undefined})}
 W.cls=shuf(CLS.filter(s=>!taken(W,'cls').has(s))).slice(0,2);
 if(W.path=='Versátil'&&L>=2)W.extra=shuf(ALLS.filter(s=>!taken(W,'extra').has(s))).slice(0,2);
 if(L>=10)W.save2=pick(ATTRS.filter(a=>a.id!='car')).id;
 W.method='roll';W.pool=[...Array(6)].map(()=>{const d=[R(6),R(6),R(6),R(6)].sort((a,b)=>a-b);return d[1]+d[2]+d[3]}).sort((a,b)=>b-a);
 const pr=prio(W.path);W.pool.forEach((v,i)=>W.as[pr[i]]=i);autoAsi(W);W.hd=Array.from({length:L-1},()=>R(8));
 start(build(W));toast(`${W.name} criado! PV ${hp(W)}${L>1?' (d8: '+W.hd.join(', ')+')':''}`)}

