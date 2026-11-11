// js/features/traits.js — Traços: história, personalidade e conquistas
/* ===== TRAÇOS: história, personalidade e conquistas ===== */
let ACH_IMG='';
const TRK={hist:['historyList','history'],pers:['personalityList','personality']};
function trList(k){const[f,o]=TRK[k];if(!Array.isArray(charData[f]))charData[f]=String(charData[o]||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);return charData[f]}
function traitNode(k,oldCard,ph){oldCard.style.display='none';const n=document.createElement('div');n.className='trn';
 n.innerHTML=`<textarea class="tin" rows="2" placeholder="${ph}"></textarea><div class="tlist" id="tr-${k}"></div>`;n.appendChild(oldCard);
 n.querySelector('textarea').addEventListener('keydown',e=>{if(e.key=='Enter'&&!e.shiftKey){e.preventDefault();const t=e.target.value.trim();if(!t)return;trList(k).push(t);e.target.value='';sfx('ok');renderTraits()}});return n}
function renderTraits(){['hist','pers'].forEach(k=>{const L=$('tr-'+k);if(!L)return;L.innerHTML=trList(k).map((t,i)=>`<span class="tchip"><span class="tx" data-k="${k}" data-i="${i}" ondblclick="trEdit(this)" title="Dois cliques para editar">${esc(t)}</span><button class="x" onclick="trDel('${k}',${i})" title="Remover"><i class="fas fa-xmark"></i></button></span>`).join('')||'<small class="note">Nada escrito ainda.</small>'});renderAch()}
function trDel(k,i){trList(k).splice(i,1);sfx('del');renderTraits()}
function trEdit(el){el.contentEditable='true';el.focus();const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);
 el.onkeydown=e=>{if(e.key=='Enter'&&!e.shiftKey){e.preventDefault();el.blur()}};el.onblur=()=>{el.contentEditable='false';const t=el.textContent.trim(),a=trList(el.dataset.k),i=+el.dataset.i;if(t)a[i]=t;else a.splice(i,1);renderTraits()}}
/* conquistas */
function achNode(){const n=document.createElement('div');n.className='trn';
 n.innerHTML=`<div class="achform"><input type="text" id="ach-n" placeholder="Nome da insígnia ou troféu (Enter para adicionar)"><label class="btn alt" title="Imagem JPG ou PNG"><i class="fas fa-image"></i> Imagem<input type="file" accept="image/png,image/jpeg" hidden onchange="achImg(this)"></label><img id="ach-pv" class="achpv" alt="" hidden><button class="btn" onclick="achAdd()"><i class="fas fa-plus"></i></button></div><div class="achgrid" id="ach-grid"></div>`;
 n.querySelector('#ach-n').addEventListener('keydown',e=>{if(e.key=='Enter'){e.preventDefault();achAdd()}});return n}
function achImg(inp){const f=inp.files[0];inp.value='';if(!f)return;if(!/^image\/(png|jpeg)$/.test(f.type))return toast('Use uma imagem JPG ou PNG.');const im=new Image(),u=URL.createObjectURL(f);
 im.onload=()=>{const k=Math.min(1,160/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);ACH_IMG=c.toDataURL(f.type=='image/png'?'image/png':'image/jpeg',.88);URL.revokeObjectURL(u);const pv=$('ach-pv');pv.src=ACH_IMG;pv.hidden=false;sfx('click')};
 im.onerror=()=>toast('Não foi possível ler a imagem.');im.src=u}
function achAdd(){const n=$('ach-n').value.trim();if(!n)return toast('Escreva o nome da insígnia ou troféu.');charData.achievements=charData.achievements||[];charData.achievements.push({name:n,img:ACH_IMG});ACH_IMG='';$('ach-n').value='';const pv=$('ach-pv');pv.hidden=true;pv.removeAttribute('src');sfx('ok');renderLists()}
const achDel=i=>{charData.achievements.splice(i,1);sfx('del');renderLists()};
function renderAch(){const G=$('ach-grid');if(!G)return;G.innerHTML=(charData.achievements||[]).map((a,i)=>`<div class="ach" data-t="${esc(a.name||'')}${a.desc?' — '+esc(a.desc):''}"><i class="fas fa-medal"></i>${a.img?`<img src="${esc(a.img)}" alt="" onerror="this.remove()">`:''}<button class="x" onclick="achDel(${i})" title="Remover"><i class="fas fa-xmark"></i></button></div>`).join('')||'<small class="note">Nenhuma conquista ainda.</small>'}
{const r=renderLists;renderLists=function(){r();renderTraits()}}
