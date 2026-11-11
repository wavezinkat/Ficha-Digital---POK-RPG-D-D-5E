// js/combat/buff-engine.js — Combate: motor de buffs
/* ---- motor de buffs ---- */
function bctx(p,m){const I=moveInfo(p,m),L=trainerLevel,path=tpath(),ty=I.ty,atk=[],dmg=[],fx=[],note=[];let crit=0,stabEx=0,stabMul=1,any=false;const sp=specTypes();
 if(path=='Treinador Ás'&&L>=2){atk.push(['Treinador Ás',1]);dmg.push(['Treinador Ás',1])}
 if(path=='Mestre do Tipo'){const n=Math.min(2,I.types.filter(t=>sp.includes(t)).length);if(n){if(L>=2)stabEx+=n;if(L>=5)atk.push(['Poder de Atração',2]);if(L>=15)any=true}}
 const tb=t=>{if((+t.atk||+t.dmg)&&(!t.type||t.type==ty)){if(+t.atk)atk.push([t.name,+t.atk]);if(+t.dmg)dmg.push([t.name,+t.dmg])}};tTal().forEach(tb);(p.tl||[]).forEach(tb);
 const h=p.held&&p.held.name,harm=I.md.dt=='damage';let twice=false;
 {const ab=p.ab||'',mel=I.md.r&&I.md.r[0]=='m';if(harm){if(ab=='tough-claws'&&mel)dmg.push(['Tough Claws',I.P]);twice=(ab=='adaptability'&&I.types.includes(I.ty))||(ab=='technician'&&ppMax(p,I.md)>=15)||(ab=='strong-jaw'&&BITE.has(m.id))||(ab=='mega-launcher'&&PULSE.has(m.id))||(['aerilate','pixilate','refrigerate'].includes(ab)&&I.md.t=='normal')}}
 if(h){if(harm&&ITEMT[h]&&ITEMT[h]==ty)dmg.push([h,I.P]);if(h=='Life Orb'&&harm){dmg.push([h,I.P]);note.push(['lo',I.P])}if(h=='Wide Lens')atk.push([h,1]);if(h=='Scope Lens'||h=='Razor Claw')crit++;if(h=='Lucky Punch'&&p.sp=='chansey')crit++;if(h=='Stick'&&p.sp=='farfetchd')crit++;if(h=="King's Rock")fx.push([19,"King's Rock: o alvo fica Atordoado."]);if(h=='Deep Sea Tooth'&&p.sp=='clamperl')stabEx++;if(h=='Thick Club'&&['cubone','marowak','alolan-marowak'].includes(p.sp))stabMul=2;if(h=='Griseous Orb'&&/^giratina/.test(p.sp)&&['dragon','ghost'].includes(ty))stabMul=2}
 const on=harm&&ty&&(I.types.includes(ty)||(any&&I.types.some(t=>sp.includes(t))));return{I,atk,dmg,crit,fx,note,twice,stab:on?stab(p.lvl)*stabMul+stabEx:0}}
function descFx(desc){const o={critT:20,fx:[],s5:[]};String(desc||'').replace(/\{[a-z]+\}/g,'').split(/\.\s+/).forEach(s=>{const t=s.match(/(\d+)\s*(?:ou mais|ou 20|ou maior|ou superior)/);if(/crítico/i.test(s)&&t){o.critT=Math.min(o.critT,+t[1])}else if(/natura(l|is)/i.test(s)&&t)o.fx.push([+t[1],s.trim().replace(/\.+$/,'')+'.']);else if(/por 5 ou mais/i.test(s))o.s5.push(s.trim().replace(/\.+$/,'')+'.')});return o}
function spendPP(p,m){if(m._tmp)return true;const mx=ppMax(p,PKMD[m.id]);if(!mx)return true;const c=m.pp==null?mx:m.pp;if(c<=0){toast(`Sem PP em ${mvn(m.id)}!`);return false}m.pp=c-1;return true}
const bName=(p,m)=>mvn(m.id),inc=p=>p.hpCur<=0;
