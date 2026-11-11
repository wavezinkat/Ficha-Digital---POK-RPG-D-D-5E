// js/combat/rolls.js — Combate: rolagens de ataque e dano
/* ---- rolar para acertar ---- */
function cbAtk(k,i){const p=CS.act[k],m=typeof i=='object'?i:p.mv[i];if(inc(p))return toast(`${p.name} desmaiou e não pode agir.`);const c=bctx(p,m),I=c.I,df=descFx(I.desc),B=CS.buffs;if(!spendPP(p,m))return;
 const adv=B.some(b=>b.adv),dis=p.st=='Envenenado'||(p.vol||[]).includes('Atordoado'),two=adv!=dis,a=R(20),b=R(20),nat=!two?a:adv?Math.max(a,b):Math.min(a,b),critT=Math.max(2,df.critT-c.crit-bsum(B,'crit')),
 parts=[['Atributo (MOVE)',I.MV],['Proficiência',I.P],...c.atk,...B.filter(b=>b.atk).map(b=>[b.name,b.atk])],base=nat+sumP(parts),crit=nat>=critT,
 fx=[...df.fx,...c.fx].filter(f=>nat>=f[0]).map(f=>f[1]);LASTC.set(m,crit);
 B.forEach(x=>{if(x.adv&&x.uses!=null)x.uses--});CS.buffs=B.filter(x=>!(x.dur=='once'&&(x.atk||x.adv))&&!(x.uses!=null&&x.uses<=0));
 showRes({kind:'atk',title:`${esc(p.name)} usa ${esc(bName(p,m))}!`,dice:[{f:20,v:a,drop:two&&a!=nat},...(two?[{f:20,v:b,drop:b!=nat||b==a}]:[])],parts,base,total:base,nat,crit,fumble:nat==1,adv:two&&adv,dis:two&&dis,critT,fx,warn:inc2(p)})}
const inc2=p=>[...(['Dormindo','Congelado'].includes(p.st)?[`${p.name} está ${p.st}: incapacitado, não pode agir.`]:[]),...(p.st=='Paralisado'?['Paralisado: no início do turno role d4; com 1 fica incapacitado.']:[]),...((p.vol||[]).includes('Confuso')?['Confuso: ao agir role d20; 10 ou menos falha e se fere.']:[])];
/* ---- rolar dano / cura ---- */
function cbDmg(k,i){const p=CS.act[k],m=typeof i=='object'?i:p.mv[i];if(inc(p))return toast(`${p.name} desmaiou e não pode agir.`);const c=bctx(p,m),I=c.I,md=I.md,B=CS.buffs,heal=md.dt=='healing';
 if(!md.at&&!spendPP(p,m))return;const sv=md.sv?ATL[SVK.indexOf(md.sv)]:'';
 const dm=md.dm||'MOVE',parts=[];if(dm.includes('MOVE')&&I.MV)parts.push(['Atributo (MOVE)',I.MV]);if(dm=='LEVEL')parts.push(['Nível',p.lvl]);const fx5=+(dm.match(/\+ (\d+)/)||[0,0])[1];if(fx5)parts.push(['Bônus fixo',fx5]);
 if(!heal&&c.stab)parts.push(['STAB',c.stab]);parts.push(...c.dmg,...B.filter(b=>b.dmg).map(b=>[b.name,b.dmg]));const sy=!heal&&md.dt=='damage'&&hasSypher(p)?sypherApply(p):null;if(sy)parts.push([SYPHER.name,SYPHER.dmg]);
 const dice=md.dc&&DC[md.dc]?DC[md.dc][tier(p.lvl)]:'',mm=dice.match(/(\d+)d(\d+)/),crit=!heal&&!!LASTC.get(m);LASTC.delete(m);
 B.slice().forEach(x=>{});const hi=B.some(b=>b.hi)||c.twice||(heal&&tpath()=='Enfermeiro'&&trainerLevel>=9),burn=!heal&&p.st=='Queimado'&&md.r&&md.r[0]=='m',dbl=B.some(b=>b.dbl);
 CS.buffs=B.filter(x=>!(x.dur=='once'&&(x.dmg||x.dbl||x.hi)));
 if(!mm)return showRes({kind:'special',title:`${esc(p.name)} usa ${esc(bName(p,m))}!`,dice:[],parts,warn:['Este Move tem dano/efeito especial: siga a descrição e some os bônus acima.',...(sy?[sypherTxt(sy)]:[]),...inc2(p)],desc:fmtD(p,m)});
 const n=+mm[1],f=+mm[2],cnt=n*(1+(crit?1:0)+(dbl?1:0)),A=roll(cnt,f),Bs=hi!=burn?roll(cnt,f):null,sA=A.reduce((x,y)=>x+y,0),sB=Bs?Bs.reduce((x,y)=>x+y,0):0,useB=Bs&&(hi?sB>sA:sB<sA),V=useB?Bs:A,O=Bs?(useB?A:Bs):null,ds=V.reduce((x,y)=>x+y,0),base=Math.max(0,ds+sumP(parts));
 showRes({kind:heal?'heal':'dmg',title:`${esc(p.name)} usa ${esc(bName(p,m))}!`,dice:[...V.map(v=>({f,v})),...(O||[]).map(v=>({f,v,drop:1}))],parts,spec:`${cnt}d${f}`,ds,base,total:base,crit,mega:!!p.mg&&md.dt=='damage',hi:!!Bs&&hi,burn:!!Bs&&burn,dbl,sv,note:[...c.note,...(sy?[['sy',sy.pct,sy.loss]]:[])],s5:descFx(I.desc).s5,fx:[],ty:I.ty,pk:k,warn:inc2(p)})}
function cbMetro(k,i){const p=CS.act[k],m=p.mv[i];if(inc(p))return toast(`${p.name} desmaiou e não pode agir.`);if(!spendPP(p,m))return;const v=R(100),t=PKTM.find(z=>z[0]==v),id=t&&PKMV[t[2]]?t[2]:null;CS.tmp=id?{id,_tmp:1}:null;showRes({kind:'metro',title:`${esc(p.name)} usa ${esc(bName(p,m))}!`,dice:[{f:100,v}],parts:[],tm:v,k,warn:inc2(p)})}
function cbUse(k,i){const p=CS.act[k],m=typeof i=='object'?i:p.mv[i];if(inc(p))return toast(`${p.name} desmaiou e não pode agir.`);if(!spendPP(p,m))return;showRes({kind:'use',title:`${esc(p.name)} usa ${esc(bName(p,m))}!`,dice:[],parts:[],warn:inc2(p),desc:fmtD(p,m)})}
function fmtD(p,m){const I=moveInfo(p,m),md=I.md,sv=md.sv?ATL[SVK.indexOf(md.sv)]:'',dd=md.dc&&DC[md.dc]?DC[md.dc][tier(p.lvl)]:'';return esc(I.desc||'Descrição indisponível.').replace(/\{dice\}/g,`<b>${dd||'dados'}</b>`).replace(/\{type\}/g,I.ty?`<b>${TYP[I.ty]||I.ty}</b>`:'').replace(/\buma \{save\}/g,`salvaguarda ${sv?'de '+sv:''}`).replace(/\{save\}/g,`teste de resistência${sv?' de '+sv:''}`).replace(/\{shape\}/g,md.sh?`${SHP[md.sh[0]]||md.sh[0]} de ${ft(md.sh[1])}`:'área')}
