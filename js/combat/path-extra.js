// js/combat/path-extra.js — Combate: o que faltava das habilidades dos caminhos de treinador
/* Livro de Regras, caminhos do treinador. Aqui entram: Evasão Sinistra e Copiar Meowth (Capanga),
   avisos das habilidades passivas que valem em batalha e as escolhas "Muitas Faces" (Versátil)
   e "Armazenamento de Energia" (Mestre do Tipo). */
Object.assign(PAX,{
 'Evasão Sinistra':x=>bTarget(t=>{if(paxSpend(x,4)){dlg('Evasão Sinistra',`<p class="note"><b>${esc(t.name)}</b> ganha <b>+1 nível de resistência</b> contra o Move inimigo que causa dano:</p><p class="note">Vulnerável → Neutro · Neutro → Resistente · Resistente → Imune</p><p class="note">Gasto: 4 Pontos Sombrios (reação).</p>`,440);sfx('ok');bRender()}},p=>p.hpCur>0),
 'Copiar Meowth':x=>bTarget(t=>{if(paxSpend(x,5)){dlg('Copiar Meowth — Me First',`<p class="note"><b>${esc(t.name)}</b> usa a reação <b>Me First</b> (alcance 40 pés): quando for alvo, ou for forçado a um teste de resistência, de um Move de <b>alvo único</b>, copia o Move contra o usuário, depois da ativação e antes dos efeitos.</p><p class="note">• Se exigir ataque: <b>desvantagem</b> no ataque.<br>• Se exigir resistência: o alvo tem <b>vantagem</b>.<br>• Se causar dano: <b>dobre os dados de dano</b>.<br>• O nível do dano/efeito é o do <b>seu</b> Pokémon, não o do alvo.</p><p class="note">Gasto: 5 Pontos Sombrios (reação).</p>`,500);sfx('ok');bRender()}},p=>p.hpCur>0)
});
/* passivas que valem em batalha (lista "Buffs em vigor") */
{const f=bPassives;bPassives=function(){const o=f.apply(this,arguments);if(charData.isWild)return o;const L=trainerLevel,P=tpath(),sp=specTypes();
 if(P=='Mestre do Tipo'&&L>=9){const t=charData.armType&&sp.includes(charData.armType)?TYP[charData.armType]:null;o.push(`Armazenamento de Energia: Pokémon dos seus tipos de especialização têm resistência a ${t?'<b>'+t+'</b>':'um dos seus tipos (escolha abaixo)'} (se eram vulneráveis, passam a dano normal).`.replace(/<\/?b>/g,''))}
 if(P=='Enfermeiro'&&L>=9)o.push('Espírito de Cura: curas por item ou Move de cura rolam os dados duas vezes e valem o maior (automático).');
 if(P=='Colecionador Pokémon'&&L>=9)o.push('Especialista em Captura: some seu mod. de CAR nas tentativas de captura.');
 if(P=='Colecionador Pokémon'&&L>=15)o.push('Ataques Disciplinados: se o seu dano fosse derrubar um Pokémon, você pode deixá-lo com 1 PV.');
 if(P=='Guru'&&L>=5)o.push('Mente: seus Pokémon são proficientes em resistência de SAB e têm vantagem para evitar Confuso.');
 if(P=='Pesquisador')o.push('Pesquisador: some o seu mod. de SAB ou INT (o escolhido) em um teste de perícia dos seus Pokémon.');
 if(P=='Patrulheiro'&&L>=15)o.push('Melhores Amigos: dois Pokémon Ativos fora da Pokébola; o 2º tem ação/ação bônus própria. Se um desmaiar, libere outro.');
 if(P=='Comandante'&&L>=2)o.push('Comandante: bônus de lealdade (resistência e vida) dobrados.');
 return o}}
/* escolhas: tipo do Armazenamento de Energia e habilidade de Muitas Faces */
{const f=bActDlg;bActDlg=function(){const r=f.apply(this,arguments);if(charData.isWild)return r;const L=trainerLevel,P=tpath(),sp=specTypes();let h='';
 if(P=='Mestre do Tipo'&&L>=9&&sp.length)h+=`<p class="note"><b>Armazenamento de Energia</b> — tipo com resistência (não muda depois de escolhido):</p><select onchange="charData.armType=this.value;sfx('ok');bActDlg()" ${charData.armType&&sp.includes(charData.armType)?'disabled':''}><option value="">Escolha…</option>${sp.map(t=>`<option value="${t}" ${charData.armType==t?'selected':''}>${TYP[t]}</option>`).join('')}</select>`;
 if(P=='Versátil'&&L>=9){const op=RCMB.filter(z=>z.p!='Versátil'&&z.p!='*'&&z.l<=9&&!z.w);h+=`<p class="note"><b>Muitas Faces</b> — habilidade de 2º, 5º ou 9º nível de outro caminho (mostradas aqui as que têm uso em combate):</p><select onchange="charData.mface=this.value;sfx('ok');bActDlg()"><option value="">Nenhuma</option>${op.map(z=>`<option ${charData.mface==z.n?'selected':''} value="${esc(z.n)}">${esc(z.n)} (${esc(z.p)}, nível ${z.l})</option>`).join('')}</select>`}
 if(h){const w=document.querySelector('#pkd .wbody');if(w)w.insertAdjacentHTML('beforeend',`<h4 style="margin-top:12px">Escolhas do caminho</h4>${h}`)}return r}}
