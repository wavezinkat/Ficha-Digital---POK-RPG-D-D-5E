// js/features/inventory.js — Inventário: catálogo do Livro de Regras
/* ===== INVENTÁRIO: catálogo do Livro de Regras ===== */
const CUSTOM={id:'custom',t:'Personalizados',ic:'fa-pen'},ICAT=Object.fromEntries(ICATS.concat([CUSTOM]).map(c=>[c.id,c])),USOS=['Ação','Ação bônus','Reação','Ação livre','Segurável','Segurável · Ação livre'],NOIMG=['gear','pack','tm','custom'];
const fmtP=n=>'₽'+Number(n).toLocaleString('pt-BR'),norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const slug=n=>norm(n)==='pokebola'?'poke-ball':norm(n).replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const badges=u=>(u||'').split(' · ').filter(Boolean).map(x=>`<span class="ub u-${norm(x).replace(/\s/g,'')}">${esc(x)}</span>`).join('');
const priceOf=x=>typeof x.price=='number'?fmtP(x.price):(x.priceNote||'—');
function ico(name,cat,img){const c=ICAT[cat]||CUSTOM,u=img||ITEMIMG[name]||(NOIMG.includes(cat||'custom')?'':`${IMG}items/${slug(name)}.png`);return`<span class="ii"><i class="fas ${c.ic}"></i>${u?`<img src="${esc(u)}" loading="lazy" alt="" onerror="this.remove()">`:''}</span>`}
document.body.insertAdjacentHTML('beforeend','<div id="inv" class="ov hide"></div>');
document.addEventListener('keydown',e=>{if(e.key=='Escape')show('inv',0)});
let CT={};
const invList=()=>charData.inventory=charData.inventory||[];

/* caixa "Mochila" */
function invNode(list){list.className='';const n=document.createElement('div');
 n.innerHTML=`<div class="itb"><button class="btn" onclick="openCat()"><i class="fas fa-plus"></i> Adicionar item</button><div class="srch sm"><i class="fas fa-magnifying-glass"></i><input id="inv-q" type="text" placeholder="Buscar na mochila..." oninput="renderInv()" autocomplete="off"></div><span id="inv-sum" class="note"></span><button class="lnk" onclick="igAll(1)">minimizar categorias</button><button class="lnk" onclick="igAll(0)">expandir</button><button class="lnk" onclick="openForm(-1)">adicionar manualmente</button></div>`;n.appendChild(list);return n}
/* categorias minimizáveis: estado guardado no navegador (pokeRpgInvFold) */
let IGF={};try{IGF=JSON.parse(localStorage.getItem('pokeRpgInvFold')||'{}')||{}}catch(e){IGF={}}
function igSave(){try{localStorage.setItem('pokeRpgInvFold',JSON.stringify(IGF))}catch(e){}}
function igToggle(c){const el=document.querySelector(`#inventory-list .ig[data-c="${c}"]`);if(!el)return;const m=el.classList.toggle('min');if(m)IGF[c]=1;else delete IGF[c];igSave()}
function igAll(min){document.querySelectorAll('#inventory-list .ig').forEach(el=>{el.classList.toggle('min',!!min);if(min)IGF[el.dataset.c]=1;else delete IGF[el.dataset.c]});igSave()}
function renderInv(){const L=$('inventory-list');if(!L||!$('inv-q'))return;const inv=invList(),q=norm($('inv-q').value),g={};
 inv.forEach((it,i)=>{if(q&&!norm(it.name+' '+(it.desc||'')+' '+(it.uso||'')).includes(q))return;const c=ICAT[it.cat]?it.cat:'custom';(g[c]=g[c]||[]).push([it,i])});
 const tot=inv.reduce((s,it)=>s+(typeof it.price=='number'?it.price*(+it.qtd||0):0),0);
 $('inv-sum').innerHTML=`${inv.reduce((s,i)=>s+(+i.qtd||0),0)} itens · valor total <b>${fmtP(tot)}</b>`;
 L.innerHTML=!inv.length?'<p class="note">Mochila vazia. Clique em “Adicionar item” para abrir o catálogo do livro.</p>':ICATS.concat([CUSTOM]).filter(c=>g[c.id]).map(c=>`<div class="ig ${IGF[c.id]?'min':''}" data-c="${c.id}"><h4 onclick="igToggle('${c.id}')" title="Clique para minimizar ou expandir"><i class="fas fa-chevron-down ig-ch"></i><i class="fas ${c.ic}"></i> ${c.t} <small>${g[c.id].length}</small></h4><div class="igb">${g[c.id].map(([it,i])=>`<div class="ir">${ico(it.name,it.cat,it.img)}<div class="im"><b>${esc(it.name)}</b>${badges(it.uso)}<small>${esc(it.desc||'')}</small></div><div class="iq"><button onclick="qty(${i},-1)" title="Menos">−</button><span>${it.qtd}</span><button onclick="qty(${i},1)" title="Mais">+</button></div><div class="ip">${priceOf(it)}${typeof it.price=='number'&&it.qtd>1?`<small>total ${fmtP(it.price*it.qtd)}</small>`:''}</div><button class="ib" onclick="openForm(${i})" title="Editar"><i class="fas fa-pen"></i></button><button class="ib dl" onclick="removeItem('inventory',${i})" title="Excluir"><i class="fas fa-trash"></i></button></div>`).join('')}</div></div>`).join('')||'<p class="note">Nenhum item encontrado.</p>'}
function qty(i,d){const it=invList()[i];it.qtd=Math.max(1,(+it.qtd||1)+d);renderInv()}
{const r=renderLists;renderLists=function(){r();renderInv()}}
function addInventory(){openCat()}
function editInventory(i){openForm(i)}
function startInv(){const m=(n,q)=>{const x=ITEMDB.find(v=>v.n==n);return{name:x.n,qtd:q,img:'',desc:x.d,uso:x.u,price:x.p,priceNote:x.pn,cat:x.c}};return[m('Pokébola',5),m('Potion',1),m('Pacote de Aventureiro',1),{name:'Licença de Treinador',qtd:1,img:'',desc:'Autoriza capturar Pokémon.',uso:'',price:null,priceNote:'',cat:'custom'},m('Pokédex',1)]}

/* catálogo */
function openCat(){CT={cat:null,q:'',sel:null,qty:1,mode:'cat'};drawCat();show('inv',1);sfx('open')}
function closeInv(){show('inv',0)}
const idle=()=>!(CT.q||CT.cat);
function drawCat(){const sel=CT.sel!=null?ITEMDB[CT.sel]:null;
 $('inv').innerHTML=`<div class="wc inv"><div class="steps"><b style="flex:1;color:#fff;padding:6px 8px"><i class="fas fa-bag-shopping"></i> ${CT.mode=='form'?(CT.edit>=0?'Editar item':'Item manual'):'Adicionar item'}</b><button class="st" style="flex:none" onclick="closeInv()" title="Fechar"><i class="fas fa-xmark"></i></button></div><div class="wbody">${CT.mode=='form'?formHTML():`<div class="srch"><i class="fas fa-magnifying-glass"></i><input id="iq" type="text" placeholder="Buscar item pelo nome ou efeito..." value="${esc(CT.q)}" oninput="onQ(this.value)" autocomplete="off"></div>${idle()?'':`<div class="chips"><button class="chip ${CT.cat?'':'sel'}" onclick="CT.cat=null;CT.sel=null;drawCat()">Todos os tipos</button>${ICATS.map(c=>`<button class="chip ${CT.cat==c.id?'sel':''}" onclick="CT.cat='${c.id}';CT.sel=null;drawCat()"><i class="fas ${c.ic}"></i> ${c.t}</button>`).join('')}</div>`}<div id="il">${listHTML()}</div>`}</div><div class="wnav">${CT.mode=='form'?`<button class="btn alt" onclick="${CT.edit>=0?'closeInv()':"CT.mode='cat';drawCat()"}">${CT.edit>=0?'Cancelar':'Voltar ao catálogo'}</button><button class="btn" onclick="saveForm()"><i class="fas fa-check"></i> Salvar</button>`:sel?`<div class="qb"><b>${esc(sel.n)}</b><span class="ip">${priceOf({price:sel.p,priceNote:sel.pn})}</span><span style="margin-left:auto">Quantidade</span><button class="chip" onclick="setQ(-1)">−</button><input type="number" id="iqty" min="1" value="${CT.qty}" oninput="CT.qty=Math.max(1,+this.value||1);upTot()"><button class="chip" onclick="setQ(1)">+</button>${sel.p!=null?`<span class="ip" id="itot">${fmtP(sel.p*CT.qty)}</span>`:''}<button class="btn" onclick="addSel()"><i class="fas fa-plus"></i> Adicionar à mochila</button></div>`:`<button class="lnk" onclick="openForm(-1)">Não achou? Adicionar manualmente</button><button class="btn alt" onclick="closeInv()">Fechar</button>`}</div></div>`}
function onQ(v){const was=idle();CT.q=v;if(was!=idle()){drawCat();const e=$('iq');e.focus();e.setSelectionRange(v.length,v.length)}else $('il').innerHTML=listHTML()}
function listHTML(){if(idle())return`<div class="tiles">${ICATS.map(c=>`<button class="tile" onclick="CT.cat='${c.id}';drawCat()"><i class="fas ${c.ic}"></i><b>${c.t}</b><small>${ITEMDB.filter(x=>x.c==c.id).length} itens</small></button>`).join('')}</div>`;
 const q=norm(CT.q),r=ITEMDB.map((x,i)=>[x,i]).filter(([x])=>(!CT.cat||x.c==CT.cat)&&(!q||norm(x.n+' '+x.d+' '+x.u).includes(q)));
 return r.length?r.map(([x,i])=>`<button class="irow ${CT.sel===i?'sel':''}" onclick="pickIt(${i})">${ico(x.n,x.c)}<span class="m"><b>${esc(x.n)}</b>${badges(x.u)}<small>${esc(x.d)}</small></span><span class="p">${priceOf({price:x.p,priceNote:x.pn})}</span></button>`).join(''):'<p class="note">Nenhum item encontrado. Use “adicionar manualmente” para criar o seu.</p>'}
function pickIt(i){CT.sel=i;CT.qty=1;const s=$('il').scrollTop,t=document.querySelector('#inv .wbody').scrollTop;drawCat();document.querySelector('#inv .wbody').scrollTop=t;sfx('box')}
function setQ(d){CT.qty=Math.max(1,CT.qty+d);$('iqty').value=CT.qty;upTot()}
function upTot(){const x=ITEMDB[CT.sel],e=$('itot');if(e&&x.p!=null)e.textContent=fmtP(x.p*CT.qty)}
function addSel(){const x=ITEMDB[CT.sel],inv=invList(),ex=inv.find(v=>v.name==x.n&&v.cat==x.c);
 if(ex)ex.qtd=(+ex.qtd||0)+CT.qty;else inv.push({name:x.n,qtd:CT.qty,img:'',desc:x.d,uso:x.u,price:x.p,priceNote:x.pn,cat:x.c});
 toast(`${CT.qty}× ${x.n} na mochila!`);sfx('ok');CT.sel=null;CT.qty=1;renderLists();drawCat()}

/* formulário manual / edição */
function openForm(i){const it=i>=0?invList()[i]:{name:'',qtd:1,img:'',desc:'',uso:'',price:null,priceNote:'',cat:'custom'};CT={cat:null,q:'',sel:null,qty:1,mode:'form',edit:i,f:it};drawCat();show('inv',1)}
function formHTML(){const f=CT.f,pv=typeof f.price=='number'?f.price:(f.priceNote||'');return`<div class="fg"><div class="w"><label>Nome</label><input type="text" id="f-n" value="${esc(f.name)}"></div><div><label>Quantidade</label><input type="number" id="f-q" min="1" value="${f.qtd}"></div><div><label>Valor em ₽ (ou texto, ex.: N/A)</label><input type="text" id="f-p" value="${esc(pv)}" placeholder="vazio = sem valor"></div><div><label>Uso (ação / reação / segurável — vazio se não tiver)</label><input type="text" id="f-u" list="usos" value="${esc(f.uso)}"><datalist id="usos">${USOS.map(u=>`<option value="${u}">`).join('')}</datalist></div><div><label>Tipo</label><select id="f-c">${ICATS.concat([CUSTOM]).map(c=>`<option value="${c.id}" ${(ICAT[f.cat]?f.cat:'custom')==c.id?'selected':''}>${c.t}</option>`).join('')}</select></div><div class="w"><label>Imagem (URL, opcional)</label><input type="text" id="f-i" value="${esc(f.img)}"></div><div class="w"><label>Descrição</label><textarea id="f-d" rows="4">${esc(f.desc)}</textarea></div></div>`}
function saveForm(){const n=$('f-n').value.trim();if(!n)return toast('Dê um nome ao item.');const ps=$('f-p').value.trim(),num=/^[₽\s\d.,]+$/.test(ps)&&/\d/.test(ps),
 it={name:n,qtd:Math.max(1,+$('f-q').value||1),img:$('f-i').value.trim(),desc:$('f-d').value.trim(),uso:$('f-u').value.trim(),price:num?parseInt(ps.replace(/\D/g,'')):null,priceNote:num?'':ps,cat:$('f-c').value};
 if(CT.edit>=0)invList()[CT.edit]=it;else invList().push(it);sfx('ok');toast(CT.edit>=0?'Item atualizado!':'Item adicionado!');renderLists();if(CT.edit>=0)closeInv();else{CT.mode='cat';drawCat()}}

