// js/features/pokemon/images-rolls.js — Pokémon: imagens por forma e rolagens
/* ===== imagens por forma (Showdown) + dados por classe ===== */
const sdk=s=>s.sd||s.i.replace(/[^a-z0-9]/g,''),pimgs=(s,sh,big)=>{if(!s)return[];const ani=`https://play.pokemonshowdown.com/sprites/ani${sh?'-shiny':''}/${sdk(s)}.gif`,off=big?art(s,sh):spr(s,sh);return s.nf?[ani,off]:[off,ani]},
pa=(s,sh,big,img)=>{const l=img?[img]:pimgs(s,sh,big);return`src="${l[0]||''}" data-alt="${l.slice(1).join('|')}" onerror="pkErr(this)"`};
function pkErr(e){const a=(e.dataset.alt||'').split('|').filter(Boolean);if(a.length){e.src=a.shift();e.dataset.alt=a.join('|')}else e.style.visibility='hidden'}
const DC={"0":["1d4","1d6","1d8","1d10"],"10":["1d4","1d6","1d8","2d6"],"20":["1d4","2d4","1d12","4d4"],"30":["1d6","1d10","2d8","5d4"],"40":["1d6","1d12","2d8","4d6"],"50":["1d8","2d6","4d4","3d10"],"60":["1d10","2d8","5d4","4d8"],"70":["1d12","2d8","2d12","6d6"],"80":["2d6","2d8","4d6","6d6"],"90":["2d8","2d10","3d10","4d12"],"100":["4d4","2d12","4d8","8d6"],"110":["3d6","3d8","6d6","7d8"],"120":["2d10","3d8","4d10","7d8"],"130":["5d4","3d10","5d8","8d8"],"140":["2d12","3d10","7d6","8d8"],"150":["3d8","5d6","4d12","8d8"],"160":["4d6","5d6","6d8","6d12"],"180":["3d10","6d6","8d6","7d12"],"200":["5d6","4d10","6d10","8d12"]},tier=l=>l<5?0:l<10?1:l<17?2:3;
function pkRoll(i,k){const p=PKL()[PKI],m=p.mv[i],md=PKMD[m.id]||{},P=pbn(p.lvl),pw=pwl(md).map(a=>mod(p.at[SVK.indexOf(a)])),MVm=pw.length?Math.max(...pw):0,ty=m.type||md.t;sfx('dice');
 if(k=='a'){const r=R(20);return toast(`${mvn(m.id)} — ataque: d20 (${r}) ${sg(MVm+P)} = ${r+MVm+P}${r==20?' · CRÍTICO!':r==1?' · falha crítica':''}`)}
 const dd=(md.dc&&DC[md.dc]?DC[md.dc][tier(p.lvl)]:''),mm=dd.match(/(\d+)d(\d+)/);if(!mm)return toast('Sem dados definidos para este Move.');
 const dm=md.dm||'MOVE',bon=(dm.includes('MOVE')?MVm:0)+(dm=='LEVEL'?p.lvl:0)+(+(dm.match(/\+ (\d+)/)||[0,0])[1])+(!dm.includes('STAB')&&ty&&((p.sx||{}).t||[]).includes(ty)?stab(p.lvl):0),rs=Array.from({length:+mm[1]},()=>R(+mm[2])),tot=rs.reduce((a,b)=>a+b,0)+bon;
 toast(`${mvn(m.id)} — ${md.dt=='healing'?'cura':'dano'}: ${dd} [${rs.join(', ')}] ${sg(bon)} = ${tot}`)}

