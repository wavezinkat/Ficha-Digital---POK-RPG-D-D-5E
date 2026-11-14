// js/ui/mobile.js — Celular: botão flutuante + "menu de pizza" (fatias) para as abas, e altura do topo
/* A classe html.mob (celular / janela estreita) é ligada por um script curto no <head> do index.html.
   Aqui ficam: (1) medir a altura do topo e gravar em --hdr-h; (2) o menu de pizza que substitui a dock da direita. */
(()=>{
 const H=document.documentElement,NS='http://www.w3.org/2000/svg';
 const isMob=()=>H.classList.contains('mob');
 const $$=id=>document.getElementById(id);

 /* ---------- 1) altura do topo -> --hdr-h (as janelas começam logo abaixo) ---------- */
 function measure(){const h=$$('hdr');if(!h)return;if(!isMob()){H.style.removeProperty('--hdr-h');return}
  const b=Math.ceil(h.getBoundingClientRect().height);if(b>0)H.style.setProperty('--hdr-h',b+'px')}
 if(window.ResizeObserver&&$$('hdr'))new ResizeObserver(measure).observe($$('hdr'));
 new MutationObserver(measure).observe(H,{attributes:true,attributeFilter:['class']});
 addEventListener('resize',measure);addEventListener('orientationchange',()=>setTimeout(measure,200));measure();

 /* ---------- 2) menu de pizza ---------- */
 const COL={'tab-dex':'#e0524f','tab-main':'#4f8cff','tab-trainer':'#2fb67d','tab-pokemon':'#f59e42','tab-combat':'#d94673','tab-inventory':'#8e5cf0','tab-traits':'#14b8c4','tab-save':'#7b8aa3','tab-wild':'#7bc043','m-tr':'#ffcb05'};
 const fab=document.createElement('button');fab.id='pieFab';fab.type='button';fab.setAttribute('aria-label','Abrir menu');fab.setAttribute('aria-haspopup','true');
 fab.innerHTML='<span class="pf-top"></span><span class="pf-btm"></span><span class="pf-hub"><i class="fas fa-pizza-slice"></i></span>';
 const pie=document.createElement('div');pie.id='pie';pie.className='hide';pie.setAttribute('role','dialog');pie.setAttribute('aria-label','Menu de abas');
 document.body.appendChild(pie);document.body.appendChild(fab);

 /* fatias = botões da dock (já respeitam perfil Selvagem, Pokédex, modo Mestre) + atalho dos treinadores do mestre */
 function items(){const a=[...document.querySelectorAll('#dock [data-w]')].map(b=>({id:b.dataset.w,ic:(b.querySelector('i')||{}).className||'fas fa-circle',t:(b.querySelector('span')||{}).textContent||b.title,on:b.classList.contains('on')}));
  if(document.body.classList.contains('master')&&$$('lrail')&&!$$('lrail').classList.contains('hide'))a.push({id:'m-tr',ic:'fas fa-users',t:'Treinadores',on:!!document.body.classList.contains('mdrawer')});
  return a}
 const P=(cx,cy,r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
 function sector(cx,cy,r0,r1,a0,a1){const[x0,y0]=P(cx,cy,r1,a0),[x1,y1]=P(cx,cy,r1,a1),[x2,y2]=P(cx,cy,r0,a1),[x3,y3]=P(cx,cy,r0,a0),big=a1-a0>Math.PI?1:0;
  return`M${x0},${y0}A${r1},${r1} 0 ${big} 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 ${big} 0 ${x3},${y3}Z`}
 function build(){const it=items(),n=it.length||1,vw=innerWidth,vh=innerHeight,S=Math.max(240,Math.min(vw-16,vh-24,460)),c=S/2,crust=Math.round(S*.034),R=c-crust-2,r0=S*.135,rm=(r0+R)/2+2,gap=(.012);
  const sl=it.map((o,i)=>{const mid=-Math.PI/2+i*2*Math.PI/n,a0=mid-Math.PI/n+gap,a1=mid+Math.PI/n-gap,col=COL[o.id]||'#4f8cff',[lx,ly]=P(c,c,rm,mid);
   return{o,i,mid,d:sector(c,c,r0,R,a0,a1),col,lx,ly}});
  const svg=`<svg viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" aria-hidden="false">
   <defs>${sl.map(s=>`<radialGradient id="pg${s.i}" cx="${c}" cy="${c}" r="${R}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${s.col}" stop-opacity=".78"/><stop offset="1" stop-color="${s.col}"/></radialGradient>`).join('')}</defs>
   <circle cx="${c}" cy="${c}" r="${c-crust/2-1}" class="pz-crust" stroke-width="${crust}"/>
   ${sl.map(s=>`<g class="pz-s${s.o.on?' on':''}" data-w="${s.o.id}" role="button" tabindex="0" aria-label="${(s.o.t||'').replace(/"/g,'')}"><path d="${s.d}" fill="url(#pg${s.i})"/></g>`).join('')}
   <circle cx="${c}" cy="${c}" r="${r0-2}" class="pz-hub"/></svg>`;
  const lab=sl.map(s=>`<div class="pz-l${s.o.on?' on':''}" style="left:${s.lx}px;top:${s.ly}px;width:${Math.max(54,2*rm*Math.sin(Math.PI/n)*.92)}px"><i class="${s.o.ic}"></i><span>${s.o.t}</span></div>`).join('');
  pie.innerHTML=`<div class="pz-wrap" style="width:${S}px;height:${S}px">${svg}${lab}<button type="button" class="pz-x" aria-label="Fechar menu" style="width:${(r0-2)*2}px;height:${(r0-2)*2}px"><i class="fas fa-xmark"></i></button></div>`;
  pie.querySelectorAll('.pz-s').forEach(g=>{const go=()=>pick(g.dataset.w);g.addEventListener('click',go);g.addEventListener('keydown',e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();go()}})});
  pie.querySelector('.pz-x').onclick=close}
 function open(){if(!isMob())return;build();pie.classList.remove('hide','out');void pie.offsetWidth;pie.classList.add('in');fab.classList.add('open');fab.setAttribute('aria-expanded','true');
  const on=pie.querySelector('.pz-s.on')||pie.querySelector('.pz-s');if(on)on.focus({preventScroll:true})}
 function close(){if(pie.classList.contains('hide'))return;pie.classList.remove('in');pie.classList.add('out');fab.classList.remove('open');fab.setAttribute('aria-expanded','false');setTimeout(()=>{if(!pie.classList.contains('in'))pie.classList.add('hide')},220)}
 function pick(id){close();if(id=='m-tr'){if(window.masterDrawer)masterDrawer('tr');return}
  if(window.openTab)openTab(id)}
 fab.addEventListener('click',()=>pie.classList.contains('hide')||pie.classList.contains('out')?open():close());
 pie.addEventListener('click',e=>{if(e.target===pie)close()});
 addEventListener('keydown',e=>{if(e.key=='Escape'&&!pie.classList.contains('hide'))close()});
 /* se a tela virar (rotação) com o menu aberto, redesenha; se sair do modo celular, fecha */
 addEventListener('resize',()=>{if(pie.classList.contains('hide'))return;if(!isMob())close();else build()});
})();
