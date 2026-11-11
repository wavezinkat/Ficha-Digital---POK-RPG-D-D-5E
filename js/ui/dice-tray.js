// js/ui/dice-tray.js — Bandeja de dados flutuante (jogador e mestre)
/* Janela móvel para rolar dados: vários dados juntos (2d6 + 3d8), modificador, vantagem/desvantagem,
   rolagens prontas da ficha do treinador e histórico. Não altera nenhuma outra função. */
const DT={mode:'n',mod:0,open:false,hist:[],pos:null},DTK='pokeRpgDice',DTF=[4,6,8,10,12,20,100];
try{const o=JSON.parse(localStorage.getItem(DTK)||'{}');if(Array.isArray(o.h))DT.hist=o.h.slice(0,40);if(o.p&&isFinite(o.p.x)&&isFinite(o.p.y))DT.pos=o.p}catch(e){}
const dtSave=()=>{try{localStorage.setItem(DTK,JSON.stringify({h:DT.hist.slice(0,40),p:DT.pos}))}catch(e){}};
/* ---- expressão ---- */
function dtParse(str){const s=String(str||'').toLowerCase().replace(/\s+/g,'').replace(/[−–]/g,'-').replace(/,/g,'.'),r={ok:true,terms:[],k:0};if(!s)return r;
 const re=/([+-]?)(?:(\d*)d(\d+)|(\d+))/y;let pos=0,nd=0,first=true;
 while(pos<s.length){re.lastIndex=pos;const m=re.exec(s);if(!m||(!first&&!m[1]))return{ok:false,err:'Expressão inválida. Use algo como 2d6 + 3d8 + 4.'};
  const sg=m[1]=='-'?-1:1;if(m[3]){const n=m[2]===''?1:+m[2],f=+m[3];if(n<1||n>100||f<2||f>1000)return{ok:false,err:'Use de 1 a 100 dados com 2 a 1000 faces.'};nd+=n;r.terms.push({s:sg,n,f})}else r.k+=sg*(+m[4]);
  first=false;pos=re.lastIndex}
 if(nd>200)return{ok:false,err:'Máximo de 200 dados por rolagem.'};return r}
function dtFmt(p){let o=p.terms.map((t,i)=>(i?(t.s<0?' − ':' + '):(t.s<0?'−':''))+t.n+'d'+t.f).join('');if(p.k)o+=(o?(p.k<0?' − ':' + '):(p.k<0?'−':''))+Math.abs(p.k);return o}
function dtAdd(f){const p=dtParse($('dt-x').value);if(!p.ok){p.terms=[];p.k=0}const t=p.terms.find(t=>t.f==f&&t.s>0&&t.n<100);t?t.n++:p.terms.push({s:1,n:1,f});$('dt-x').value=dtFmt(p);sfx('click')}
function dtMod(d){DT.mod=Math.max(-99,Math.min(99,DT.mod+d));$('dt-m').textContent=DT.mod;sfx('click')}
function dtMode(m){DT.mode=m;document.querySelectorAll('#dice .dtmode button').forEach(b=>b.classList.toggle('on',b.dataset.m==m));sfx('click')}
function dtClear(){$('dt-x').value='';DT.mod=0;$('dt-m').textContent=0;dtMode('n');$('dt-res').innerHTML='<span class="dt-hint">Monte a rolagem e role</span>';sfx('click')}
/* ---- rolagem ---- */
function dtRoll(expr,label){const ex=expr==null?$('dt-x').value:expr,p=dtParse(ex);if(!p.ok)return toast(p.err);if(!p.terms.length&&!p.k&&!(expr==null&&DT.mod))return toast('Escolha ao menos um dado.');
 const mode=DT.mode,mod=expr==null?DT.mod:DT.mod;let total=p.k+mod,det=[],crit='',sawD20=false;
 p.terms.forEach(t=>{const rs=[];for(let i=0;i<t.n;i++){if(t.f==20){sawD20=true;if(mode!='n'){const a=R(20),b=R(20);rs.push({k:mode=='v'?Math.max(a,b):Math.min(a,b),a,b})}else rs.push({k:R(20)})}else rs.push({k:R(t.f)})}
  const sum=rs.reduce((a,r)=>a+r.k,0);total+=t.s*sum;if(t.f==20&&t.n==1&&t.s>0&&!crit)crit=rs[0].k==20?'crit':rs[0].k==1?'fail':'';
  det.push((det.length?(t.s<0?'− ':'+ '):(t.s<0?'− ':''))+t.n+'d'+t.f+' ['+rs.map(r=>r.a!=null?`${r.a}|${r.b}→${r.k}`:r.k).join(', ')+']')});
 if(p.k)det.push((det.length?(p.k<0?'− ':'+ '):(p.k<0?'− ':''))+Math.abs(p.k));if(mod)det.push((mod<0?'− ':'+ ')+Math.abs(mod)+' (mod.)');
 const note=mode!='n'?(sawD20?(mode=='v'?'vantagem':'desvantagem'):'vantagem/desvantagem só afeta d20'):'';
 const e={l:label||'',e:dtFmt(p)+(mod?(mod<0?' − ':' + ')+Math.abs(mod):''),d:det.join(' '),t:total,n:note,c:crit,ts:Date.now()};
 sfx('dice');dtShow(e,true);DT.hist.unshift(e);DT.hist.length=Math.min(DT.hist.length,40);dtSave();dtHistDraw();return e}
function dtShow(e,anim){const r=$('dt-res');r.innerHTML=`<div class="dt-l">${esc(e.l||e.e)}</div><div class="dt-t ${e.c}" id="dt-tt">${anim?'…':e.t}</div><div class="dt-d">${esc(e.d)}</div>${e.n?`<div class="dt-n">${esc(e.n)}</div>`:''}${e.c=='crit'?'<div class="dt-n ok">Crítico!</div>':e.c=='fail'?'<div class="dt-n bad">Falha crítica</div>':''}`;
 if(anim){const t=$('dt-tt');let i=0;const h=setInterval(()=>{t.textContent=Math.max(1,Math.abs(e.t)+R(9)-4);if(++i>7){clearInterval(h);t.textContent=e.t}},45)}}
function dtHistDraw(){const h=$('dt-hist');if(!h)return;h.innerHTML=DT.hist.map((e,i)=>`<div class="dt-h ${e.c}" onclick="dtShow(DT.hist[${i}])" title="${esc(e.d)}"><span class="dt-hl">${esc(e.l||e.e)}<small>${esc(e.l?e.e:'')}${e.n?' · '+esc(e.n):''}</small></span><b>${e.t}</b></div>`).join('')||'<p class="note" style="margin:6px 2px">Nenhuma rolagem ainda.</p>'}
function dtHistClear(){DT.hist=[];dtSave();dtHistDraw();sfx('del')}
/* ---- rolagens da ficha ---- */
const dtB=n=>(n<0?'− ':'+ ')+Math.abs(n);
function dtSheet(){const o=[],T=!charData.isWild;
 if(T){const at=charData.attributes||{},M=id=>mod(+at[id]||10),pb=profBonus||2;
  const g=(t,rows)=>o.push(`<h5>${t}</h5>`+rows.map(([l,e,s])=>`<button class="dt-r" onclick="dtRoll('${e}',this.dataset.l)" data-l="${esc(l)}"><span>${esc(l)}</span><em>${s}</em></button>`).join(''));
  const f=n=>`1d20 ${n<0?'−':'+'} ${Math.abs(n)}`;
  g('Geral',[['Iniciativa',f(M('des')).replace('−','-'),f(M('des'))]]);
  g('Teste de atributo',ATTRS.map(a=>[a.name.charAt(0)+a.name.slice(1).toLowerCase(),f(M(a.id)).replace('−','-'),f(M(a.id))]));
  g('Resistências',ATTRS.map(a=>{const b=M(a.id)+((charData.saves||{})[a.id]?pb:0);return['Resist. '+a.name.slice(0,3).toLowerCase(),f(b).replace('−','-'),f(b)]}));
  g('Perícias',SKILLS.map(s=>{const pr=(charData.proficiencies||{})[s.id],b=M(s.attr)+(pr?pb*((charData.expertise||{})[s.id]?2:1):0);return[s.name,f(b).replace('−','-'),f(b)]}))}
 return o.join('')||'<p class="note">Os golpes dos Pokémon ficam no modo Combate. Aqui ficam as rolagens do treinador.</p>'}
let DTR;function dtSheetRefresh(){if(!DT.open)return;clearTimeout(DTR);DTR=setTimeout(()=>{const d=$('dt-sheet');if(d&&d.parentNode.open)d.innerHTML=dtSheet()},150)}
['renderLists','updateStats'].forEach(n=>{const f=window[n];if(typeof f=='function')window[n]=function(){const r=f.apply(this,arguments);dtSheetRefresh();return r}});
/* ---- janela ---- */
function dtBuild(){if($('dice'))return;const d=document.createElement('section');d.id='dice';d.className='hide';
 d.innerHTML=`<header class="dth"><i class="fas fa-dice-d20"></i><b>Bandeja de dados</b><button onclick="diceToggle()" title="Fechar"><i class="fas fa-xmark"></i></button></header><div class="dtb">
 <div class="dtd">${DTF.map(f=>`<button onclick="dtAdd(${f})" oncontextmenu="event.preventDefault();dtRem(${f})" title="Clique para somar um d${f} (botão direito remove)">d${f}</button>`).join('')}</div>
 <input id="dt-x" type="text" autocomplete="off" placeholder="Toque nos dados ou digite: 3d6 + 2" onkeydown="if(event.key=='Enter')dtRoll()">
 <div class="dtm"><span>Mod.</span><button onclick="dtMod(-1)">−</button><b id="dt-m">0</b><button onclick="dtMod(1)">+</button></div>
 <div class="dtmode"><button class="on" data-m="n" onclick="dtMode('n')">Normal</button><button data-m="v" onclick="dtMode('v')">Vantagem</button><button data-m="d" onclick="dtMode('d')">Desvantagem</button></div>
 <div class="dta"><button class="btn alt" onclick="dtClear()">Limpar</button><button class="btn" onclick="dtRoll()"><i class="fas fa-dice-d20"></i> Rolar</button></div>
 <div id="dt-res" class="dtres"><span class="dt-hint">Monte a rolagem e role</span></div>
 <details class="dts" ontoggle="if(this.open)$('dt-sheet').innerHTML=dtSheet()"><summary>Rolagens da ficha</summary><div id="dt-sheet"></div></details>
 <div class="dthh"><span>Histórico</span><button onclick="dtHistClear()">Limpar</button></div><div id="dt-hist"></div></div>`;
 document.body.appendChild(d);dtHistDraw();
 const hd=d.querySelector('.dth');hd.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;d.style.zIndex=9650;const sx=e.clientX-d.offsetLeft,sy=e.clientY-d.offsetTop;
  const mv=ev=>dtPlace(ev.clientX-sx,ev.clientY-sy),up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);dtSave()};addEventListener('pointermove',mv);addEventListener('pointerup',up);e.preventDefault()});
 addEventListener('resize',()=>{if(DT.open)dtPlace(d.offsetLeft,d.offsetTop)})}
function dtPlace(x,y){const d=$('dice');x=Math.max(0,Math.min(innerWidth-d.offsetWidth,x));y=Math.max(0,Math.min(innerHeight-60,y));d.style.left=x+'px';d.style.top=y+'px';DT.pos={x,y}}
function dtRem(f){const p=dtParse($('dt-x').value);if(!p.ok)return;const i=p.terms.findIndex(t=>t.f==f&&t.s>0);if(i<0)return;p.terms[i].n--;if(p.terms[i].n<1)p.terms.splice(i,1);$('dt-x').value=dtFmt(p);sfx('click')}
function diceToggle(){dtBuild();const d=$('dice');DT.open=!DT.open;d.classList.toggle('hide',!DT.open);$('dicebtn').classList.toggle('on',DT.open);sfx(DT.open?'open':'close');
 if(DT.open){const hh=($('hdr')||{}).offsetHeight||110;const p=DT.pos||{x:Math.max(10,innerWidth-480),y:hh+16};dtPlace(p.x,p.y);const det=d.querySelector('.dts');if(det.open)$('dt-sheet').innerHTML=dtSheet()}}
