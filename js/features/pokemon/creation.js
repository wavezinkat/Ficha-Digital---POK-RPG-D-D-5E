// js/features/pokemon/creation.js — Pokémon: criação
/* ---- criação ---- */
function pkFix(p){if(p.mg&&!MEGAON.has(p))megaRevert(p);const d={loy:0,at:[10,10,10,10,10,10],mv:[],tl:[],vol:[],st:'',held:null,asiPend:0,evoPend:0,asiSp:[0,0,0,0,0,0],sx:{t:[],sk:[],sv:[],se:[],spd:[],ab:[]},hd:'d8',sex:'-',ac:10,notes:'',sp:''};for(const k in d)if(p[k]===undefined)p[k]=d[k];p.lvl=Math.max(1,+p.lvl||1);if(p.hpMax===undefined)p.hpMax=10;if(p.hpCur===undefined)p.hpCur=p.hpMax;return p}
function applyNat(at,n,sg_){for(const[k,v]of Object.entries(PKNAT[n]||{})){const i=SVK.indexOf(k);if(i>=0)at[i]=Math.max(1,Math.min(30,at[i]+sg_*v))}}
const natL=n=>Object.entries(PKNAT[n]||{}).map(([k,v])=>(v>0?'+':'−')+ATL[SVK.indexOf(k)]).join(' ')||'(neutra)';
function newPk(s,L,o){const at=[...s.at],hdn=+s.hd.slice(1),cm=mod(at[2]);let hp=s.hp,pend=0;for(let l=s.ml+1;l<=L;l++)hp+=Math.max(1,Math.floor(hdn/2)+1+cm);for(const l of [4,8,12,16,20])if(l>s.ml&&l<=L)pend+=pkAsi(s);
 const nat=o.nat&&PKNAT[o.nat]?o.nat:'';if(nat){applyNat(at,nat,1);hp+=L*(mod(at[2])-mod(s.at[2]))}
 return{nature:nat,sp:s.i,name:o.nick||s.n,nick:o.nick||'',lvl:L,lvlMin:s.ml,img:'',isMain:false,sex:o.sex,shiny:!!o.shiny,loy:0,hpMax:hp,hpCur:hp,ac:s.ac,at,hd:s.hd,sx:snap(s),ab:(s.ab.find(a=>!a[1])||s.ab[0]||[''])[0],mv:(s.mv.start||[]).slice(0,4).map(id=>({id,type:'',dice:''})),tl:[],held:null,st:'',vol:[],asiPend:pend,evoPend:0,asiSp:[0,0,0,0,0,0],notes:''}}
const rollSex=g=>{const[f,m]=(g||'0:0').split(':').map(Number);return f+m==0?'-':R(f+m)<=f?'F':'M'};
function pkRet(p){if(!p.held)return;const h=p.held,inv=invList(),ex=inv.find(v=>v.name==h.name&&v.cat==h.cat);if(ex)ex.qtd=(+ex.qtd||0)+1;else inv.push({...h,qtd:1});p.held=null}
{const r=removeItem;removeItem=function(t,i){if(t=='pokemons'&&charData.pokemons[i])pkRet(charData.pokemons[i]);r(t,i)}}
function addPokemon(){openPkCat()}
function editPokemon(i){openPk(i)}

