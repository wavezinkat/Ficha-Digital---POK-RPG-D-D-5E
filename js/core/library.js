// js/core/library.js — Biblioteca de treinadores salvos (navegador + .json importados)
/* Guarda os últimos treinadores salvos (salvamento rápido ou .json carregado) para escolher depois */
const LIBK='pokeRpgLib',LIBMAX=8;
const libRead=()=>{try{const a=JSON.parse(localStorage.getItem(LIBK)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}};
function libWrite(a){a=a.slice(0,LIBMAX);for(;;){try{localStorage.setItem(LIBK,JSON.stringify(a));return true}catch(e){if(a.length<=1)return false;a.pop()}}}
function libMigrate(){/* traz o salvamento rápido antigo (uma ficha só) para a lista, uma única vez */
 try{if(localStorage.getItem('pokeRpgLibMig'))return;localStorage.setItem('pokeRpgLibMig','1');const s=localStorage.getItem('pokeRpgFicha');if(!s)return;const d=JSON.parse(s),a=libRead();if(!a.some(x=>x.n==(d.name||'')))a.push(libEntry(d,0));libWrite(a)}catch(e){}}
function libEntry(d,t){return{n:d.name||'',lv:d.level||1,p:d.path||'',img:d.img||'',t:t,d:d}}
function libPut(d,t){if(!d||d.isWild)return;const e=libEntry(JSON.parse(JSON.stringify(d)),t||Date.now()),a=libRead().filter(x=>x.n!=e.n);a.unshift(e);a.sort((x,y)=>y.t-x.t);if(!libWrite(a))toast('Sem espaço no navegador para a lista de treinadores. Baixe o .json.')}
function libWhen(t){if(!t)return 'Salvo anteriormente';const d=new Date(t),n=new Date(),p=x=>String(x).padStart(2,'0'),hm=p(d.getHours())+':'+p(d.getMinutes());
 if(d.toDateString()==n.toDateString())return 'Salvo hoje '+hm;const y=new Date(n);y.setDate(n.getDate()-1);if(d.toDateString()==y.toDateString())return 'Salvo ontem '+hm;
 return `Salvo ${p(d.getDate())}/${p(d.getMonth()+1)}/${String(d.getFullYear()).slice(2)} ${hm}`}
function libOpen(){libMigrate();let o=$('lib');if(!o){o=document.createElement('div');o.id='lib';o.className='ov hide';document.body.appendChild(o)}libDraw();o.classList.remove('hide');sfx('open')}
function libClose(){const o=$('lib');if(o)o.classList.add('hide')}
function libDraw(){const a=libRead().sort((x,y)=>y.t-x.t),o=$('lib'),E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 o.innerHTML=`<div class="libp"><div class="lib-top"><span>Treinadores salvos</span><span>${a.length?a.length+' na lista':'lista vazia'}</span></div><i class="fas fa-circle-dot lib-ball"></i><h2>Escolha seu treinador</h2><p class="lib-sub">Salvos no navegador e arquivos .json que você já carregou</p>
 ${a.map((e,i)=>`<div class="lib-row"><div class="lib-card" onclick="libLoad(${i})"><img src="${E(av(e.img,e.n))}" alt="" onerror="this.onerror=null;this.src=av('','${E(e.n).replace(/'/g,'')}')"><div class="lib-i"><b>${E(e.n||'Sem nome')}</b><small>Nv ${E(e.lv)} · ${E(e.p||'Sem caminho')}</small><small class="lib-t"><i class="far fa-clock"></i> ${libWhen(e.t)}${i==0?' · mais recente':''}</small></div><i class="fas fa-chevron-right lib-go"></i></div>
 <div class="lib-act"><button title="Duplicar" onclick="libDup(${i})"><i class="fas fa-clone"></i></button><button title="Baixar .json" onclick="libDl(${i})"><i class="fas fa-download"></i></button><button class="x" title="Remover da lista" onclick="libDel(${i})"><i class="fas fa-xmark"></i></button></div></div>`).join('')||'<p class="lib-empty">Nenhum treinador salvo ainda. Use "Salvar rápido" ou importe um .json.</p>'}
 <label class="lib-imp"><input type="file" accept=".json" hidden onchange="libImport(event)"><b><i class="fas fa-file-import"></i> Importar arquivo .json</b><small>Entra na lista como treinador novo · aceita a ficha antiga</small></label>
 <button class="big alt" onclick="libClose()"><i class="fas fa-arrow-left"></i> Voltar</button></div>`}
const libSorted=()=>libRead().sort((x,y)=>y.t-x.t);
function libLoad(i){const e=libSorted()[i];if(!e)return;const live=$('start').classList.contains('hide')&&!MASTER;if(live&&!confirm('Carregar este treinador substitui a ficha aberta (alterações não salvas serão perdidas). Continuar?'))return;
 libClose();start(JSON.parse(JSON.stringify(e.d)));toast(`${e.n||'Treinador'} carregado!`)}
function libDup(i){const a=libSorted(),e=a[i];if(!e)return;const c=JSON.parse(JSON.stringify(e));c.n=(e.n||'Treinador')+' (cópia)';c.d.name=c.n;c.t=Date.now();a.unshift(c);libWrite(a);libDraw();sfx('ok')}
function libDl(i){const e=libSorted()[i];if(!e)return;const u=URL.createObjectURL(new Blob([JSON.stringify(e.d,null,2)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download=(e.n||'ficha')+'_pokerpg.json';l.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function libDel(i){const a=libSorted(),e=a[i];if(!e||!confirm(`Remover "${e.n}" da lista? (o arquivo .json, se existir, não é apagado)`))return;a.splice(i,1);libWrite(a);libDraw();sfx('del')}
function libImport(e){const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();r.onload=x=>{try{const d=JSON.parse(x.target.result);if(d&&d.format=='pokerpg-master'){libClose();enterMaster(d);return}
 libPut(d,f.lastModified||Date.now());libDraw();toast('Importado! Clique no treinador para abrir.')}catch(err){toast('Arquivo JSON inválido.')}};r.readAsText(f)}
/* integra com o salvamento rápido e com o carregamento (fora do modo Mestre) */
{const f=saveToCache;saveToCache=function(){const r=f.apply(this,arguments);if(!MASTER)libPut(charData,Date.now());return r}}
{const f=loadFromCache;loadFromCache=function(){return MASTER?f.apply(this,arguments):libOpen()}}
function quickLoadOpen(){MASTER?loadFromCache():libOpen()}
{const f=loadJSON;loadJSON=function(e){if(MASTER)return f(e);const file=e.target.files[0];e.target.value='';if(!file)return;const r=new FileReader();r.onload=x=>{try{const d=JSON.parse(x.target.result);if(d&&d.format=='pokerpg-master')return enterMaster(d);start(d);libPut(charData,file.lastModified||Date.now());toast('Treinador carregado!')}catch(err){toast('Arquivo JSON inválido.')}};r.readAsText(file)}}
