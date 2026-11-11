// js/ui/boxes.js — Caixas móveis, redimensionáveis e minimizáveis
/* caixas: móveis, redimensionáveis, minimizáveis */
function mkBox(d,custom){const s=custom?d:(LAY[d.id]=LAY[d.id]||{x:d.x,y:d.y,w:d.w,h:d.h,min:0}),el=document.createElement('div');
 el.id=d.id;el.className='box'+(d.cls?' '+d.cls:'')+(custom?' custom':'');
 el.innerHTML=`<div class="bx"><img class="bi" src="${IMG}items/${d.ic||'poke-ball'}.png" alt="" onerror="this.remove()"><b></b><button class="mn" title="Minimizar"><i class="fas fa-minus"></i></button>${custom?'<button class="dl" title="Apagar caixa"><i class="fas fa-trash"></i></button>':''}</div><div class="by"></div>`;
 const bx=el.firstChild,t=bx.querySelector('b'),by=el.lastChild;t.textContent=d.t;
 if(custom){by.innerHTML='<textarea placeholder="Escreva aqui..."></textarea>';const ta=by.firstChild;ta.value=d.txt||'';ta.oninput=()=>d.txt=ta.value;
  t.title='Dois cliques para renomear';t.ondblclick=()=>{t.contentEditable=true;t.focus()};t.onblur=()=>{t.contentEditable=false;d.t=t.textContent.trim()||'Caixa'};t.onkeydown=e=>{if(e.key=='Enter'){e.preventDefault();t.blur()}};
  bx.querySelector('.dl').onclick=()=>{if(confirm('Apagar esta caixa?')){const a=charData.boxes[d.tab];a.splice(a.indexOf(d),1);el.remove();sfx('del')}}}
 else d.nodes.forEach(n=>n&&by.appendChild(n));
 const ap=()=>{Object.assign(el.style,{left:s.x+'px',top:s.y+'px',width:s.w+'px',height:s.min?'':s.h+'px'});el.classList.toggle('min',!!s.min)};ap();
 bx.querySelector('.mn').onclick=()=>{s.min=s.min?0:1;ap();sfx('min');saveBoxes()};
 bx.addEventListener('pointerdown',e=>{el.style.zIndex=++BZ;if(e.target.closest('button')||t.isContentEditable)return;sfx('box');const sx=e.clientX-el.offsetLeft,sy=e.clientY-el.offsetTop,P=el.parentNode;
  const mv=ev=>{s.x=Math.max(0,Math.min(P.clientWidth-70,ev.clientX-sx));s.y=Math.max(0,ev.clientY-sy);el.style.left=s.x+'px';el.style.top=s.y+'px'},up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);saveBoxes()};
  addEventListener('pointermove',mv);addEventListener('pointerup',up);e.preventDefault()});
 new ResizeObserver(()=>{if(!s.min&&el.offsetWidth>0&&(Math.abs(el.offsetWidth-s.w)>1||Math.abs(el.offsetHeight-s.h)>1)){s.w=el.offsetWidth;s.h=el.offsetHeight;clearTimeout(BT);BT=setTimeout(saveBoxes,400)}}).observe(el);
 return el}
function addBox(tab){charData.boxes=charData.boxes||{};const a=charData.boxes[tab]=charData.boxes[tab]||[],d={id:'c'+Date.now(),tab,t:'Nova caixa',txt:'',ic:pick(['poke-ball','great-ball','ultra-ball','premier-ball']),x:60+a.length*28,y:60+a.length*28,w:340,h:260,min:0};a.push(d);$(tab).querySelector('.board').appendChild(mkBox(d,true));sfx('ok')}
function renderCustom(){document.querySelectorAll('.box.custom').forEach(e=>e.remove());charData.boxes=charData.boxes||{};WINS.forEach(([id])=>(charData.boxes[id]||[]).forEach(d=>{d.tab=id;$(id).querySelector('.board').appendChild(mkBox(d,true))}))}
function resetBoxes(){if(!cur||!DEFS[cur])return;const wb=$(cur).querySelector('.board');DEFS[cur].forEach(d=>delete LAY[d.id]);wb.querySelectorAll('.box:not(.custom)').forEach(b=>b.remove());DEFS[cur].forEach(d=>wb.prepend(mkBox(d)));saveBoxes();sfx('ok')}
function minAll(tab,btn){const bs=[...$(tab).querySelectorAll('.board .box')],allMin=bs.length&&bs.every(b=>b.classList.contains('min'));bs.forEach(b=>{if(b.classList.contains('min')==allMin)b.querySelector('.mn').click()});if(btn)btn.innerHTML=allMin?'<i class="fas fa-compress"></i> Minimizar tudo':'<i class="fas fa-expand"></i> Expandir tudo'}
function initBoxes(){const C={},cl=(s,c)=>document.querySelector(s).closest(c),B=(id,t,ic,x,y,w,h,nodes,cls)=>({id,t,ic,x,y,w,h,nodes,cls});
 WINS.forEach(([id])=>{const w=$(id),wb=w.querySelector('.wb');C[id]=[...wb.children];
  w.querySelector('.bar button').insertAdjacentHTML('beforebegin',`<img class="deco" src="${IMG}pokemon/versions/generation-v/black-white/animated/${DECO[id]}.gif" alt="" onerror="this.remove()"><button class="add" onclick="addBox('${id}')"><i class="fas fa-plus"></i> Nova caixa</button><button class="add sm" onclick="resetBoxes()" title="Reorganizar as caixas para o modo padrão"><i class="fas fa-table-cells-large"></i> Padrão</button><button class="add sm" onclick="minAll('${id}',this)" title="Minimizar ou expandir todas as caixas"><i class="fas fa-compress"></i> Minimizar tudo</button>`)});
 const au=document.createElement('div');au.className='card';
 au.innerHTML=`<label><input type="checkbox" id="au-m" ${AU.m?'checked':''}> Música de fundo</label><input type="range" id="au-mv" min="0" max="1" step=".05" value="${AU.mv}"><label><input type="checkbox" id="au-s" ${AU.s?'checked':''}> Efeitos sonoros</label><input type="range" id="au-sv" min="0" max="1" step=".05" value="${AU.sv}"><div id="au-pl"></div>`;
 au.querySelector('#au-m').onchange=e=>{AU.m=+e.target.checked;saveAu();applyAu()};au.querySelector('#au-s').onchange=e=>{AU.s=+e.target.checked;saveAu()};
 au.querySelector('#au-mv').oninput=e=>{AU.mv=+e.target.value;bgm.volume=AU.mv;saveAu()};au.querySelector('#au-sv').oninput=e=>{AU.sv=+e.target.value;saveAu();sfx('click')};
 const t=C['tab-trainer'],p=C['tab-pokemon'],i=C['tab-inventory'],tr=C['tab-traits'],sv=C['tab-save'][0].children;
 DEFS={'tab-combat':[],'tab-main':[B('b-me2','Treinador','poke-ball',16,16,340,430,[$('char-avatar-preview'),imgUpNode(cl('#char-img','.input-group')),cl('#char-name','.input-group'),cl('#char-path','.grid-2')]),B('b-sp2','Especializações','great-ball',372,16,350,430,[cl('#specs-container','.card')]),B('b-at2','Atributos e Resistências','rare-candy',738,16,540,210,[$('saves'),$('attributes-container')]),B('b-sk2','Perícias','master-ball',738,242,540,330,[cl('#skills-container','.card')],'two')],
 'tab-trainer':[B('b-ft','Habilidades do Treinador','premier-ball',16,16,720,520,[t[0],t[1]]),B('b-tl','Talentos e Extras','rare-candy',752,16,440,520,t.slice(3)),B('b-us','Usos e descansos','potion',16,552,720,260,[usosNode()])],
 'tab-pokemon':[B('b-party','Party','poke-ball',16,16,1060,300,[pkPartyNode(p[2])]),B('b-box','PC / Box','great-ball',16,332,1060,400,[pkBoxNode()])],
 'tab-inventory':[B('b-il','Mochila','poke-ball',16,16,1000,620,[invNode(i[1])])],
 'tab-traits':[B('b-hi2','História','premier-ball',16,16,430,200,[traitNode('hist',tr[0],'Escreva um trecho da história e aperte Enter para adicionar...')],'auto'),B('b-pe2','Personalidade','great-ball',462,16,430,200,[traitNode('pers',tr[1],'Escreva um traço (ideais, laços, defeitos...) e aperte Enter para adicionar...')],'auto'),B('b-ac2','Conquistas','master-ball',908,16,470,200,[achNode()],'auto')],
 'tab-save':[B('b-vi','Personalização Visual','ultra-ball',16,16,380,210,[sv[0]]),B('b-bl','Computador do Bill','master-ball',412,16,380,430,[sv[1]]),B('b-au','Áudio','rare-candy',808,16,370,270,[au])]};
 statsInit();
 WINS.forEach(([id])=>{const wb=$(id).querySelector('.wb');wb.innerHTML='';wb.classList.add('board');DEFS[id].forEach(d=>wb.appendChild(mkBox(d)))})}

