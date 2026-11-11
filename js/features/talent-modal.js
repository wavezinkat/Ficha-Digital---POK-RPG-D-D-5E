// js/features/talent-modal.js — Talentos extras: janela de criação/edição e caixas compactas
/* O formulário saiu da aba (ocupava espaço): "Adicionar talento" abre uma janela, e cada talento
   salvo vira uma caixa separada que ocupa só o espaço do texto. Os dados continuam em charData.talents
   ({name,desc,atk,dmg,type}), então combate e exportação não mudam. */
let TLE=-1;
document.body.insertAdjacentHTML('beforeend','<div id="tal" class="ov hide"></div>');
const TLTY=()=>'<option value="">Todos</option>'+Object.keys(TYP).map(k=>`<option value="${k}">${TYP[k]}</option>`).join('');
function tlOpen(i){TLE=i==null?-1:i;const t=TLE>=0?(charData.talents||[])[TLE]:null;if(TLE>=0&&!t)return;
 $('tal').innerHTML=`<div class="wc tlw"><div class="steps"><b style="flex:1;color:#fff;padding:6px 8px"><i class="fas fa-award"></i> ${t?'Editar talento':'Adicionar talento'}</b><button class="st" style="flex:none" onclick="tlClose()"><i class="fas fa-xmark"></i></button></div>
 <div class="wbody">${t?'':'<select id="talent-preset" onchange="talentPreset(this.value)"></select>'}
 <label class="tll">Nome do talento / habilidade</label><input type="text" id="new-talent-name" maxlength="80" placeholder="Nome">
 <label class="tll">Descrição</label><textarea id="new-talent-desc" rows="7" placeholder="Descrição completa do talento..."></textarea>
 <div class="tlg"><div><label class="tll">Bônus de ataque</label><input type="number" id="new-talent-atk" placeholder="0"></div><div><label class="tll">Bônus de dano</label><input type="number" id="new-talent-dmg" placeholder="0"></div><div><label class="tll">Só Moves do tipo</label><select id="new-talent-ty">${TLTY()}</select></div></div>
 <p class="note" style="margin:6px 0 0">Os bônus de ataque e dano valem no modo combate.</p></div>
 <div class="wnav"><button class="btn alt" onclick="tlClose()">Cancelar</button><button class="btn" onclick="tlSave()"><i class="fas fa-check"></i> Concluir</button></div></div>`;
 if(!t)talentPresetInit();else{$('new-talent-name').value=t.name||'';$('new-talent-desc').value=t.desc||'';$('new-talent-atk').value=+t.atk||'';$('new-talent-dmg').value=+t.dmg||'';$('new-talent-ty').value=t.type||''}
 show('tal',1);sfx('open');setTimeout(()=>{const n=$('new-talent-name');if(n&&!t)n.focus()},50)}
function tlClose(){show('tal',0)}
function tlSave(){const n=$('new-talent-name').value.trim();if(!n)return toast('Dê um nome ao talento.');charData.talents=charData.talents||[];
 const o={name:n,desc:$('new-talent-desc').value,atk:+$('new-talent-atk').value||0,dmg:+$('new-talent-dmg').value||0,type:$('new-talent-ty').value};
 if(TLE>=0&&charData.talents[TLE])charData.talents[TLE]=o;else charData.talents.push(o);
 tlClose();sfx('ok');renderLists();toast(TLE>=0?'Talento atualizado!':`${n} adicionado!`)}
editTalent=function(i){tlOpen(i)};
document.addEventListener('keydown',e=>{if(e.key=='Escape')tlClose()});
/* caixas dos talentos: só ocupam o espaço do próprio texto; clicar no título minimiza/expande */
renderTalentsB=function(){const L=$('talent-list');if(!L)return;const T=charData.talents||[];
 L.className='tlist';L.innerHTML=T.map((t,i)=>{const k='tal:'+i+':'+t.name,min=(typeof FOLD!='undefined'&&FOLD[k])?' min':'';
  return`<div class="feature-card fold tcard${min}" data-k="${esc(k)}"><div class="tcb"><button onclick="tlOpen(${i})" title="Editar"><i class="fas fa-pen"></i></button><button class="dl" onclick="removeItem('talents',${i})" title="Excluir"><i class="fas fa-trash"></i></button></div>
  <h4 onclick="ftToggle(this.parentNode)" title="Clique para minimizar ou expandir"><i class="fas fa-chevron-down ft-ch"></i><span class="ft-n">${esc(t.name)}</span>${+t.atk?`<span class="ub u-acaolivre">${sg(+t.atk)} atq</span>`:''}${+t.dmg?`<span class="ub u-acaolivre">${sg(+t.dmg)} dano</span>`:''}${t.type?`<span class="ub c">${TYP[t.type]}</span>`:''}</h4>
  <p>${esc(t.desc||'')}</p></div>`}).join('')||'<p class="note">Nenhum talento ainda. Clique em “Adicionar talento”.</p>'};
