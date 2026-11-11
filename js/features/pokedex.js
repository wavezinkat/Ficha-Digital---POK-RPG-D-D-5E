// js/features/pokedex.js — Pokédex: vistos / capturados, filtros, marcação em lote e contagem
/* Dados no próprio treinador: charData.dex = {seen:{chave:1}, got:{chave:1}}.
   • "Capturado" é automático para toda espécie que esteja na party ou no PC (charData.pokemons).
   • "Visto" e "capturado manual" são marcados clicando no Pokémon (ou em lote, pelo filtro atual).
   Chave da espécie = 'n'+número nacional (formas viram a espécie base); homebrews (nº 0) usam o próprio id. */
const DXR=['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea','Hisui','Outros'];
const DEX=[],DXK={};/* DEX = lista de espécies; DXK[id da espécie ou forma] = chave */
if(HASDB){const seen=new Set();PKDB.forEach(p=>{const k=p.no>0?'n'+p.no:p.i;DXK[p.i]=k;if(seen.has(k)||(p.nf&&p.no>0))return;seen.add(k);DEX.push({k:k,no:p.no,s:p,t:p.t||[],rg:p.no>0&&p.rg?p.rg:'Outros'})});
 PKDB.forEach(p=>{if(p.no>0&&!seen.has(DXK[p.i])){seen.add(DXK[p.i]);DEX.push({k:DXK[p.i],no:p.no,s:p,t:p.t||[],rg:p.rg||'Outros'})}});
 DEX.sort((a,b)=>(a.no||9999)-(b.no||9999)||a.s.n.localeCompare(b.s.n))}
const DXE=Object.fromEntries(DEX.map(e=>[e.k,e]));
let DXF={reg:'',ty:[],all:false,st:'all',q:''},DXB=false;
const dxD=()=>{const d=charData.dex=charData.dex||{};d.seen=d.seen||{};d.got=d.got||{};return d};
const dxOwn=()=>{const o=new Set;(charData.pokemons||[]).forEach(p=>{const k=DXK[p.sp];if(k)o.add(k)});return o};
let DXO=new Set;
/* estado: 0 não visto · 1 visto · 2 capturado */
const dxSt=k=>{const d=dxD();return DXO.has(k)||d.got[k]?2:d.seen[k]?1:0};
function dxCount(){const c={};DXR.concat('Total').forEach(r=>c[r]={n:0,s:0,c:0});DEX.forEach(e=>{const s=dxSt(e.k);[e.rg,'Total'].forEach(r=>{c[r].n++;if(s>0)c[r].s++;if(s==2)c[r].c++})});return c}
const dxCellHTML=e=>`<button class="dxc s0" data-k="${e.k}" onclick="dxClick('${e.k}')"><span class="dxi"><img loading="lazy" decoding="async" ${pa(e.s,0,0)} alt=""></span><span class="dxn"><i class="fas fa-circle-dot dxb"></i>${e.no?'#'+String(e.no).padStart(3,'0'):'#???'}</span><span class="dxm"></span></button>`;
function dxBuild(){const w=$('dx-body');if(!w||DXB)return;DXB=true;
 $('dx-grid').innerHTML=DEX.map(dxCellHTML).join('');
 $('dx-reg').innerHTML=DXR.map(r=>`<button data-r="${r}" onclick="dxReg('${r}')">${r=='Outros'?'Outros':r}</button>`).join('');
 $('dx-ty').innerHTML=Object.keys(TYP).map(t=>`<button class="dxt t-${t}" data-t="${t}" onclick="dxTy('${t}')" title="${TYP[t]}">${tyI(t)}<span>${TYP[t]}</span></button>`).join('')}
function dxVisible(e){const s=dxSt(e.k),f=DXF;if(f.reg&&e.rg!=f.reg)return false;if(f.ty.length){const h=f.all?f.ty.every(t=>e.t.includes(t)):f.ty.some(t=>e.t.includes(t));if(!h)return false}
 if(f.st=='seen'&&s<1)return false;if(f.st=='got'&&s<2)return false;if(f.st=='unseen'&&s>0)return false;
 if(f.q){const q=norm(f.q).replace('#','').trim();if(/^\d+$/.test(q)){if(e.no!=+q)return false}else if(!(s>0&&norm(e.s.n).includes(q)))return false}return true}
function dxCell(e,el){const s=dxSt(e.k);el.className='dxc s'+s;const m=s?esc(e.s.n):'';el.querySelector('.dxm').textContent=s?e.s.n:'';el.title=s?`${e.s.n} — ${s==2?'capturado':'visto'}`:(e.no?'#'+e.no:'?');
 el.querySelector('.dxb').style.display=s==2?'':'none'}
function dxRefresh(full){const w=$('dx-body');if(!w)return;dxBuild();DXO=dxOwn();
 const cells=$('dx-grid').children;let vis=0;DEX.forEach((e,i)=>{const el=cells[i];dxCell(e,el);const v=dxVisible(e);el.hidden=!v;if(v)vis++});
 const c=dxCount();$('dx-sum').innerHTML=`<table><thead><tr><th></th>${DXR.map(r=>`<th>${r}</th>`).join('')}<th class="tot">Total</th></tr></thead><tbody>
  <tr><th>Vistos</th>${DXR.concat('Total').map(r=>`<td class="${r=='Total'?'tot':''}" title="${r}: ${c[r].s} de ${c[r].n}">${c[r].s}<small>/${c[r].n}</small></td>`).join('')}</tr>
  <tr><th>Capturados</th>${DXR.concat('Total').map(r=>`<td class="${r=='Total'?'tot':''}" title="${r}: ${c[r].c} de ${c[r].n}">${c[r].c}<small>/${c[r].n}</small></td>`).join('')}</tr></tbody></table>`;
 $('dx-reg').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.r==DXF.reg));
 $('dx-ty').querySelectorAll('button').forEach(b=>b.classList.toggle('on',DXF.ty.includes(b.dataset.t)));
 $('dx-st').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.s==DXF.st));
 $('dx-mode').textContent=DXF.all?'Tipos: todos os selecionados (E)':'Tipos: qualquer um (OU)';$('dx-mode').style.display=DXF.ty.length>1?'':'none';
 $('dx-empty').hidden=vis>0;
 const mt=DXF.reg||DXF.ty.length||DXF.st!='all'||DXF.q?'do filtro':'da Pokédex';$('dx-bulk-t').textContent=`${vis} Pokémon ${mt}`}
function dxReg(r){DXF.reg=DXF.reg==r?'':r;dxRefresh()}
function dxTy(t){const i=DXF.ty.indexOf(t);if(i<0)DXF.ty.push(t);else DXF.ty.splice(i,1);dxRefresh()}
function dxSetSt(s){DXF.st=s;dxRefresh()}
function dxClear(){DXF={reg:'',ty:[],all:DXF.all,st:'all',q:''};$('dx-q').value='';dxRefresh()}
/* clique: não visto → visto → capturado → não visto (o que está na party/PC já conta como capturado) */
function dxClick(k){const d=dxD();if(DXO.has(k))return toast('Você tem esse Pokémon na party ou no PC — ele já conta como capturado.');
 const s=dxSt(k);if(s==0)d.seen[k]=1;else if(s==1){d.got[k]=1}else{delete d.got[k];delete d.seen[k]}sfx('click');dxAfter()}
/* em lote: afeta todos os Pokémon visíveis pelo filtro atual */
function dxBulk(mode){const L=DEX.filter(dxVisible);if(!L.length)return toast('Nenhum Pokémon no filtro atual.');const d=dxD();
 if(mode=='clear'&&!confirm(`Desmarcar vistos e capturados manuais de ${L.length} Pokémon? (os que estão na party/PC continuam capturados)`))return;
 L.forEach(e=>{if(mode=='seen'){if(!d.got[e.k])d.seen[e.k]=1}else if(mode=='got'){d.seen[e.k]=1;d.got[e.k]=1}else{delete d.seen[e.k];delete d.got[e.k]}});
 sfx('ok');toast(mode=='seen'?`${L.length} Pokémon marcados como vistos.`:mode=='got'?`${L.length} Pokémon marcados como capturados.`:`${L.length} Pokémon desmarcados.`);dxAfter()}
function dxAfter(){dxRefresh()}
/* janela */
XWINS.push(['tab-dex','Pokédex','fa-tablet-screen-button']);SHORT['tab-dex']='Pokédex';WILDHIDE.push('tab-dex');
document.body.insertAdjacentHTML('beforeend',`<section id="tab-dex" class="win hide"><header class="bar"><i class="fas fa-tablet-screen-button"></i><b>Pokédex</b><span class="grow"></span><button onclick="closeTab('tab-dex')" title="Fechar"><i class="fas fa-xmark"></i></button></header><div class="wb"><div id="dx-body" class="dxw">
 <div id="dx-sum" class="dxs"></div>
 <div class="dxbar"><div class="srch sm"><i class="fas fa-magnifying-glass"></i><input id="dx-q" type="text" placeholder="Buscar por número ou nome (só os já vistos)..." oninput="DXF.q=this.value;dxRefresh()"></div>
  <div id="dx-st" class="dxch"><button data-s="all" onclick="dxSetSt('all')">Todos</button><button data-s="seen" onclick="dxSetSt('seen')">Vistos</button><button data-s="got" onclick="dxSetSt('got')">Capturados</button><button data-s="unseen" onclick="dxSetSt('unseen')">Não vistos</button></div></div>
 <div id="dx-reg" class="dxch dxreg"></div>
 <div class="dxtl"><div id="dx-ty" class="dxch dxtys"></div><button id="dx-mode" class="dxmode" onclick="DXF.all=!DXF.all;dxRefresh()"></button></div>
 <div class="dxbulk"><b id="dx-bulk-t"></b><span class="grow"></span><button onclick="dxBulk('seen')"><i class="fas fa-eye"></i> Marcar todos como vistos</button><button onclick="dxBulk('got')"><i class="fas fa-circle-dot"></i> Marcar todos como capturados</button><button onclick="dxBulk('clear')"><i class="fas fa-eraser"></i> Desmarcar todos</button><button onclick="dxClear()"><i class="fas fa-filter-circle-xmark"></i> Limpar filtros</button></div>
 <p class="note dxhelp">Clique em um Pokémon: <b>visto</b> → <b>capturado</b> → desmarcar. Quem está na sua party ou no PC já conta como capturado automaticamente.</p>
 <div id="dx-grid" class="dxg"></div><p id="dx-empty" class="note" hidden>Nenhum Pokémon com esses filtros.</p></div></div></section>`);
{const f=openTab;openTab=function(id){const r=f.apply(this,arguments);if(id=='tab-dex')dxRefresh();return r}}
{const r=renderLists;renderLists=function(){r.apply(this,arguments);const w=$('tab-dex');if(w&&!w.classList.contains('hide'))dxRefresh()}}
/* a Pokédex vem primeiro na dock e não aparece no perfil Selvagem */
{const f=buildDock;buildDock=function(){const r=f.apply(this,arguments);const d=document.querySelector('#dock [data-w="tab-dex"]');if(d){if(document.body.classList.contains('wildp'))d.remove();else $('dock').prepend(d)}sync();return r}}
buildDock();
