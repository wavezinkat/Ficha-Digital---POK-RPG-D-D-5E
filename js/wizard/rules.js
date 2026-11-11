// js/wizard/rules.js — Regras de criação (Livro de Regras, cap. 1)
/* ===== regras de criação (Livro de Regras, cap. 1) ===== */
const CLS=['acrobatics','athletics','stealth','intimidation','investigation','medicine','nature','perception','persuasion','sleight','survival'],ALLS=SKILLS.map(s=>s.id),sn=id=>SKILLS.find(s=>s.id==id).name,
STEPS=['Nome','Nível','Caminho','Especialização','Perícias','Atributos','Vida','Revisão'],MAXSR=[2,2,5,5,5,8,8,10,10,10,12,12,12,14,14,14,15,15,15,15],
PRE=['red','leaf','ethan','lyra','brendan','may','lucas','dawn','hilbert','hilda','calem','serena'],
NAMES=['Ash','Misty','Rowan','Iris','Kai','Mira','Tobias','Luna','Dante','Aiko','Bruno','Selene','Caio','Nara','Otto','Yara'],
PRIM={'Pesquisador':'int','Comandante':'car','Colecionador Pokémon':'car','Mentor Pokémon':'car'};
const AT=['for','des','con'],G={"Guardião dos Pássaros":{s:'perception'},"Maníaco por Insetos":{s:'nature'},"Campista":{s:'survival'},"Domador de Dragões":{a:'sab'},"Engenheiro":{a:'int'},"Piromaníaco":{a:'con'},"Jardineiro":{s:'nature'},"Artista Marcial":{ac:AT},"Alpinista":{ac:AT},"Místico":{s:'arcana'},"Metalúrgico":{ac:['for','con']},"Psíquico":{},"Nadador":{},"Encantador":{a:'car'},"Sombrio":{sc:['deception','stealth']},"Alquimista":{sc:['medicine','deception']},"Jogador de Equipe":{ac:['for','des','con','int','sab','car']},"Esquiador":{sc:['performance','persuasion']}};
let W,S=0;
const newW=()=>({name:'',img:'',level:1,path:'',picks:[],cls:[],extra:[],save2:'',method:'std',pool:[15,14,13,12,10,8],as:{},asi:{},hd:[]});
const slots=w=>1+(w.level>=7)+(w.level>=18)+(w.path=='Versátil'&&w.level>=2?1:0),asiPts=l=>2*[4,8,12,16,19].filter(x=>x<=l).length,rs=()=>{W.cls=[];W.extra=[]};
const prio=p=>[...new Set([PRIM[p]||'sab','sab','car','con','des','int','for'])];
function skillSet(w){const p={animal:1},e={},add=s=>p[s]?e[s]=1:p[s]=1;
 w.picks.forEach(k=>{const g=G[k.n];if(g.s)add(g.s);if(g.sc)add(k.c||g.sc[0])});
 if(w.level>=2){const P=w.path;if(P=='Colecionador Pokémon')e.animal=1;if(P=='Enfermeiro')add('medicine');if(P=='Guru')add('persuasion');if(P=='Patrulheiro'){add('nature');add('survival')}}
 [...w.cls,...(w.path=='Versátil'&&w.level>=2?w.extra:[])].forEach(s=>p[s]=1);return{p,e}}
function taken(w,key){const s=new Set(Object.keys(skillSet({...w,cls:[],extra:[]}).p));['cls','extra'].forEach(k=>{if(k!=key)(w[k]||[]).forEach(x=>s.add(x))});return s}
function fin(w){const f={};ATTRS.forEach(a=>{f[a.id]=(w.as[a.id]!=null?w.pool[w.as[a.id]]:8)+(w.asi[a.id]||0)});
 w.picks.forEach(k=>{const g=G[k.n],t=g.a||(g.ac&&(k.c||g.ac[0]));if(t)f[t]++});ATTRS.forEach(a=>f[a.id]=Math.min(20,f[a.id]));return f}
const hp=w=>{const c=mod(fin(w).con);return 8+c+w.hd.reduce((s,r)=>s+Math.max(1,(r||0)+c),0)};
const left=w=>asiPts(w.level)-Object.values(w.asi).reduce((a,b)=>a+b,0);
function autoAsi(w){w.asi={};const pr=prio(w.path);for(let p=asiPts(w.level);p>0;p--){const a=pr.find(k=>fin(w)[k]<20);if(!a)break;w.asi[a]=(w.asi[a]||0)+1}}
function build(w){const f=fin(w),ss=skillSet(w),h=hp(w),pr={},sp={},img='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';
 Object.keys(ss.p).forEach(s=>pr[s]=true);w.picks.forEach(k=>sp[k.n]=(sp[k.n]||0)+1);
 return{name:w.name.trim(),path:w.path||'Treinador Ás',img:w.img,hp:`${h} / ${h}`,coins:1000+100*(R(4)+R(4)+R(4)+R(4)),inspiration:0,ac:10+mod(f.des),speed:'9m',maxcr:MAXSR[w.level-1],bg:'',
 attributes:f,proficiencies:pr,expertise:ss.e,saves:{car:1,...(w.save2?{[w.save2]:1}:{})},specs:sp,pokemons:[],achievements:[],talents:[],history:'',personality:'',level:w.level,levelMode:'manual',hdRolls:w.hd.slice(),
 inventory:startInv()}}

