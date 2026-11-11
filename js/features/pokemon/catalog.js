// js/features/pokemon/catalog.js — Pokémon: catálogo
/* ---- catálogo ---- */
function openPkCat(){PKSRC='t';if(!HASDB)return toast('Arquivo pokedex-data.js não encontrado na pasta do site.');PKC={q:'',t:'',sel:null};PKM='cat';show('pk',1);drawPk();sfx('open')}
function pkShell(t,body,foot){return`<div class="wc inv pkw"><div class="steps"><b style="flex:1;color:#fff;padding:6px 8px">${t}</b><button class="st" style="flex:none" onclick="closePk()" title="Fechar"><i class="fas fa-xmark"></i></button></div><div class="wbody" id="pkb">${body}</div>${foot?`<div class="wnav">${foot}</div>`:''}</div>`}
function pkList(){const q=norm(PKC.q),r=PKDB.filter(s=>(!PKC.t||s.t.includes(PKC.t))&&(!q||norm(s.n+' '+s.i).includes(q)||String(s.no)==q));
 return r.slice(0,80).map(s=>`<button class="irow tyc ${PKC.sel==s.i?'sel':''}" ${tyS(s.t)} onclick="pkPick('${s.i}')"><img class="ps sm" loading="lazy" ${pa(s,0,0)} alt=""><span class="m"><b>#${s.no} ${esc(s.n)}</b>${s.u?' <small>(não oficial)</small>':''} ${s.t.map(tb).join('')}<small>SR ${s.sr} · Nível mín. ${s.ml} · ${SZN[s.sz]||s.sz} · PV ${s.hp} · CA ${s.ac}</small></span></button>`).join('')+(r.length>80?`<p class="note">Mostrando 80 de ${r.length}. Refine a busca.</p>`:'')||'<p class="note">Nenhum Pokémon encontrado. Use “adicionar manualmente”.</p>'}
function pkPick(id){PKC.sel=id;const s=SPX[id];PKC.lv=s.ml;PKC.sex=rollSex(s.g);PKC.sh=0;PKC.nk='';const t=$('pkb').scrollTop;drawPk();$('pkb').scrollTop=t;sfx('box')}
function pkAdd(){const s=SPX[PKC.sel],L=Math.max(1,Math.min(20,+$('pk-lv').value||s.ml)),p=newPk(s,L,{nick:$('pk-nk').value.trim(),sex:$('pk-sx').value,shiny:$('pk-sh').checked,nat:$('pk-nt').value||pick(Object.keys(PKNAT))});pkPlace(p);PKT().push(p);sfx('ok');toast(`${p.name} ${p.loc=='party'?'entrou para a party':'foi para o PC (party cheia)'}!`);renderLists();PKC.sel=null;drawPk()}
function pkQ(v){PKC.q=v;$('pk-list').innerHTML=pkList()}

