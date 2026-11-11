// js/combat/path-actions.js — Combate: efeitos das habilidades ativas dos caminhos de treinador
/* Complementa bAbUse (dialogs.js): habilidades que gastam uma quantidade de pontos, curam, trocam
   Pokémon como ação bônus ou fazem um teste. O resto (Pokéchef, buffs de ABFX) segue o fluxo original. */
function paxLeft(x){const sp=charData.uses||{},p=x.pool?RPOOLS[x.pool]:null,key=p?'p:'+x.pool:x.k,m=p?p.m():x.max;return{m,key,p,left:m-(sp[key]||0)}}
function paxSpend(x,c,noAct){const sp=charData.uses=charData.uses||{},L=paxLeft(x);if(L.m&&L.left<c){toast(L.p?`Sem ${L.p.n} suficientes.`:`${x.n} esgotado — recupera no descanso.`);return false}if(L.m)sp[L.key]=(sp[L.key]||0)+c;if(!noAct)bAct(x.a);renderUsos();return true}
function paxAsk(x,max,label,cb,def){if(max<1)return toast('Sem pontos suficientes.');window._pax=cb;
 dlg(esc(x.n),`<p class="note">${label}</p><div class="row" style="justify-content:flex-start"><input type="number" id="pax-n" min="1" max="${max}" value="${Math.min(max,def||1)}" style="width:100px"><span class="note">de ${max}</span><button class="btn" onclick="const v=Math.max(1,Math.min(${max},Math.floor(+$('pax-n').value||1)));show('pkd',0);_pax(v)">Confirmar</button></div>`,460)}
const paxDone=(x,msg)=>{sfx('ok');toast(msg);bRender()};
const PAX={
 'Sabotagem':x=>paxAsk(x,paxLeft(x).left,'Quantos Pontos Sombrios gastar? Eles <b>diminuem o total</b> do ataque inimigo (com modificadores), só se isso fizer o ataque falhar. Um 20 natural não pode ser diminuído.',v=>paxSpend(x,v)&&paxDone(x,`Sabotagem: −${v} no ataque inimigo (${v} Ponto(s) Sombrio(s)).`),1),
 'Aumente Suas Defesas':x=>paxAsk(x,Math.min(3,paxLeft(x).left),'Quantos Pontos Táticos (até 3) somar à <b>CA</b> do Pokémon? Vale só se isso fizer o ataque falhar.',v=>paxSpend(x,v)&&paxDone(x,`Aumente Suas Defesas: +${v} na CA do Pokémon.`),1),
 'Não Dessa Vez':x=>paxAsk(x,Math.min(5,paxLeft(x).left),'Depois que o oponente rolar a resistência, aumente a <b>CD</b> em até 5 (1 Ponto Tático por aumento), se isso causar a falha.',v=>paxSpend(x,v,true)&&paxDone(x,`Não Dessa Vez: CD +${v} (${v} Ponto(s) Tático(s)).`),1),
 'Cura Tática':x=>paxAsk(x,paxLeft(x).left,'Quando um Pokémon recupera PV por item ou Move, some <b>+1d4 por Ponto Tático</b>. Quantos pontos gastar?',v=>bTarget(t=>{if(paxSpend(x,v,true))bHealRoll(t,`${v}d4`,`Cura Tática (+${v}d4)`)},p=>p.hpCur>0),1),
 'Coração Puro':x=>{const L=paxLeft(x);paxAsk(x,L.left,`Toque uma criatura voluntária e restaure PV da reserva (<b>${L.left}</b> restantes de ${L.m}). Quantos PV?`,v=>bTarget(t=>{if(paxSpend(x,v))bHealRoll(t,String(v),'Coração Puro')},p=>p.hpCur>0),Math.min(L.left,10))},
 'Treinador Mestre':x=>{if(paxSpend(x,1,true))paxDone(x,'Treinador Mestre: sucesso automático em um teste de resistência (seu ou de um Pokémon).')},
 'Apoiador':x=>{if(!paxSpend(x,1,true))return;const v=R(6);dlg('Apoiador',`<div class="rbig">+${v}</div><p class="note">Some <b>${v}</b> (d6) a um teste de habilidade ou de resistência de um dos seus Pokémon, <b>depois</b> do resultado inicial.</p>`,380);sfx('dice');bRender()},
 'Analista':x=>{bAct(x.a);const sk=(charData.proficiencies||{}).investigation,b=mod((charData.attributes||{}).int||10)+(sk?profBonus*((charData.expertise||{}).investigation?2:1):0),r=R(20),t=r+b;
  dlg('Analista — Investigação',`<div class="rbig">${t}</div><p class="note">d20 (${r}) ${sg(b)} contra <b>CD 12</b>: ${t>=12?'<b>sucesso</b> — o Mestre revela o nível do Pokémon e sua habilidade passiva.':'<b>falha</b> — você não descobre nada de útil.'}</p>`,420);sfx('dice');bRender()},
 'Troca Rápida':x=>{const L=paxLeft(x);if(L.left<1)return toast('Troca Rápida esgotada — recupera no descanso longo.');bSwapDlg(x)}
};
{const f=bAbUse;bAbUse=function(i){const x=rVisC()[i],h=x&&PAX[x.n];return h?h(x):f.apply(this,arguments)}}
/* Troca Rápida: a troca custa uma ação bônus e 1 uso */
{const f=bSwapDlg;bSwapDlg=function(q){CS._qs=q&&q.n=='Troca Rápida'?q:null;const r=f.apply(this,arguments);if(CS._qs){const n=document.querySelector('#pkd .note');if(n)n.innerHTML='<b>Troca Rápida</b>: trocar custa uma <b>ação bônus</b> (e 1 uso).'+(CS.acts.b?' <b class="rw">Sua ação bônus deste turno já foi usada.</b>':'')}return r}}
{const f=bSwap;bSwap=function(j,k){const q=CS._qs;if(!q)return f.apply(this,arguments);const p=_bb[j];if(CS.acts.b&&!confirm('A ação bônus deste turno já foi usada. Trocar mesmo assim?'))return;if(!paxSpend(q,1,true))return;CS._qs=null;CS.acts.b=1;CS.act[k]=p;CS.sel=k;show('pkd',0);sfx('ok');toast(`Troca Rápida: ${p.name} entra em campo!`);bRender()}}
/* avisos na lista de buffs em vigor */
{const f=bPassives;bPassives=function(){const o=f.apply(this,arguments),x=!charData.isWild&&tpath()=='Treinador Ás'&&trainerLevel>=5?mbLeft():0;if(tpath()=='Treinador Ás'&&trainerLevel>=5)o.push(`Mestre de Batalha: ${x} dado(s) d6 restante(s) — use o botão "Dado de batalha" no resultado do ataque ou do dano.`);return o}}
/* Líder de Torcida: opção CA */
{const f=bAbGo;bAbGo=function(n,v,k){CS._mb=0;if(k=='ac'){const P=CS._pend;return P.go({name:`${n} (+${v} CA)`,dur:'turn'})}return f.apply(this,arguments)}}
