// js/features/pokemon/custom-move.js — Move criado pelo usuário e habilidade escrita à mão
/* Um move próprio guarda seus dados em m.cm e é registrado em PKMV/PKMD/DC com id "cm-…",
   assim a ficha, o combate e as rolagens o tratam como qualquer outro move. */
const CMDU={i:['instantaneous',null,0],r1:['round',1,0],m1:['minute',1,0],m1c:['minute',1,1],m10:['minute',10,0]},
 CMEFF={damage:'Dano',healing:'Cura',reduction:'Redução de dano'};
const cmBlank=()=>({name:'',t:'normal',desc:'',pw:[],at:'',tm:'a',r:'m',rd:30,eff:'',dice:'',mod:true,flat:0,pp:10,du:'i',sv:''});
function cmClean(c){c=c&&typeof c=='object'?c:{};const S=(v,n)=>String(v==null?'':v).slice(0,n),N=(v,a,b,d)=>{v=+v;return isFinite(v)?Math.max(a,Math.min(b,Math.round(v))):d},b=cmBlank();
 const dice=/^[1-9]\d?d(4|6|8|10|12|20|100)$/.test(String(c.dice).trim())?String(c.dice).trim():'';
 return{name:S(c.name,60).trim()||'Move',t:TYP[c.t]?c.t:'normal',desc:S(c.desc,1500),pw:(Array.isArray(c.pw)?c.pw:[]).filter(a=>SVK.includes(a)).slice(0,6),at:c.at=='m'||c.at=='r'?c.at:'',tm:['a','b','r'].includes(c.tm)?c.tm:'a',
  r:['m','s','d','v'].includes(c.r)?c.r:'m',rd:N(c.rd,5,1000,30),eff:CMEFF[c.eff]?c.eff:'',dice,mod:c.mod!==false,flat:N(c.flat,0,99,0),pp:N(c.pp,0,99,10),du:CMDU[c.du]?c.du:'i',sv:SVK.includes(c.sv)?c.sv:''}}
function cmReg(m){const c=m&&m.cm;if(!c)return;const k=cmClean(c),id=m.id,d=k.dice,dm=k.eff=='healing'||k.eff=='reduction'?(k.flat?`0 + ${k.flat}`:'0'):(k.mod?(k.flat?`MOVE + ${k.flat}`:'MOVE'):(k.flat?`0 + ${k.flat}`:'0'));
 PKMV[id]=[k.name,k.desc,'','',null];if(d)DC[id]=[d,d,d,d];
 const md={t:k.t,pp:k.pp,tm:k.tm,r:k.r=='d'?['d',k.rd]:[k.r],du:CMDU[k.du].slice()};if(k.pw.length)md.pw=k.pw.slice();if(k.at)md.at=k.at;if(k.sv)md.sv=k.sv;if(d&&k.eff){md.dc=id;md.dt=k.eff=='damage'?'damage':k.eff;md.dm=dm}PKMD[id]=md}
function cmRegAb(p){if(p&&p.abCm&&p.abCm.name&&p.ab&&p.ab.startsWith('cm-ab-'))PKAB[p.ab]=[p.abCm.name,p.abCm.desc||'',0]}
{const f=pkFix;pkFix=function(p){const r=f.apply(this,arguments);if(r&&r.mv)r.mv.forEach(cmReg);cmRegAb(r);return r}}
{const f=pkClean;pkClean=function(o){const p=f.apply(this,arguments),src=new Map((Array.isArray(o&&o.mv)?o.mv:[]).map(m=>[m&&m.id,m]));
 p.mv.forEach(m=>{const s=src.get(m.id);if(/^cm-/.test(m.id)&&s&&s.cm)m.cm=cmClean(s.cm)});p.mv=p.mv.filter(m=>!/^cm-/.test(m.id)||m.cm);
 if(o&&o.abCm&&/^cm-ab-/.test(p.ab)){p.abCm={name:String(o.abCm.name||'').slice(0,80),desc:String(o.abCm.desc||'').slice(0,800)};p.abAny=true}else if(/^cm-ab-/.test(p.ab))p.ab='';return p}}
/* ---- formulário ---- */
function pkCmOpen(i){const p=PKL()[PKI];PKV={q:'',c:'new',e:i==null?-1:i,f:i==null?cmBlank():cmClean(p.mv[i].cm)};PKM='mv';drawPk()}
function cmForm(){const f=PKV.f,o=(v,l,cur)=>`<option value="${v}" ${cur==v?'selected':''}>${l}</option>`,F=(k,e)=>`oninput="PKV.f.${k}=${e||'this.value'}"`;
 return`<div class="cmf"><p class="note">Crie um golpe do seu jeito. Ele funciona na ficha e no combate como os demais.</p>
 <label>Nome do move<input type="text" maxlength="60" value="${esc(f.name)}" ${F('name')} placeholder="Ex.: Raio Prismático"></label>
 <div class="r3"><label>Tipo<select onchange="PKV.f.t=this.value">${Object.keys(TYP).map(k=>o(k,TYP[k],f.t)).join('')}</select></label>
 <label>Uso<select onchange="PKV.f.tm=this.value">${o('a','Ação',f.tm)}${o('b','Ação bônus',f.tm)}${o('r','Reação',f.tm)}</select></label>
 <label>PP (0 = sem limite)<input type="number" min="0" max="99" value="${f.pp}" ${F('pp','+this.value')}></label></div>
 <label>Descrição<textarea rows="4" maxlength="1500" ${F('desc')} placeholder="O que o golpe faz, regras especiais, efeitos...">${esc(f.desc)}</textarea></label>
 <div class="r3"><label>Alcance<select onchange="PKV.f.r=this.value;$('cm-rd').style.display=this.value=='d'?'':'none'">${o('m','Corpo a corpo',f.r)}${o('s','Pessoal (si mesmo)',f.r)}${o('d','À distância',f.r)}${o('v','Variável',f.r)}</select></label>
 <label id="cm-rd" style="${f.r=='d'?'':'display:none'}">Distância (pés)<input type="number" min="5" max="1000" step="5" value="${f.rd}" ${F('rd','+this.value')}></label>
 <label>Duração<select onchange="PKV.f.du=this.value">${o('i','Instantâneo',f.du)}${o('r1','1 rodada',f.du)}${o('m1','1 minuto',f.du)}${o('m1c','1 minuto (concentração)',f.du)}${o('m10','10 minutos',f.du)}</select></label></div>
 <div class="cmb"><b>Atributo do golpe</b><div class="cmrow">${SVK.map((a,i)=>`<label class="ck"><input type="checkbox" ${f.pw.includes(a)?'checked':''} onchange="cmPw('${a}',this.checked)"> ${ATL[i]}</label>`).join('')}</div><small class="note">Se marcar mais de um, vale o maior modificador. Ele entra no acerto, na CD e no dano.</small></div>
 <div class="r3"><label>Teste de acerto<select onchange="PKV.f.at=this.value">${o('','Não usa',f.at)}${o('m','Ataque corpo a corpo',f.at)}${o('r','Ataque à distância',f.at)}</select></label>
 <label>Resistência do alvo (CD)<select onchange="PKV.f.sv=this.value"><option value="">Não usa</option>${SVK.map((a,i)=>o(a,ATL[i],f.sv)).join('')}</select></label></div>
 <div class="r3"><label>Efeito<select onchange="PKV.f.eff=this.value">${o('','Nenhum (só descrição)',f.eff)}${Object.keys(CMEFF).map(k=>o(k,CMEFF[k],f.eff)).join('')}</select></label>
 <label>Dados (ex.: 2d8)<input type="text" maxlength="6" value="${esc(f.dice)}" ${F('dice')} placeholder="2d8"></label>
 <label>Bônus fixo<input type="number" min="0" max="99" value="${f.flat}" ${F('flat','+this.value')}></label></div>
 <label class="ck"><input type="checkbox" ${f.mod?'checked':''} onchange="PKV.f.mod=this.checked"> Somar o modificador do atributo ao dano (cura/redução não somam)</label>
 <div class="cmact"><button class="btn" onclick="cmSave()"><i class="fas fa-check"></i> ${PKV.e>=0?'Salvar alterações':'Criar e aprender'}</button><button class="btn alt" onclick="PKV.c='lvl';PKV.e=-1;drawPk()">Cancelar</button></div></div>`}
function cmPw(a,on){const l=PKV.f.pw;const i=l.indexOf(a);if(on&&i<0)l.push(a);if(!on&&i>=0)l.splice(i,1)}
function cmSave(){const p=PKL()[PKI],f=PKV.f;if(!String(f.name).trim())return toast('Dê um nome ao move.');if(f.dice&&!/^[1-9]\d?d(4|6|8|10|12|20|100)$/.test(String(f.dice).trim()))return toast('Dados inválidos. Use o formato 2d8 (d4, d6, d8, d10, d12, d20 ou d100).');
 if(f.eff&&!f.dice)return toast('Para dano, cura ou redução, informe os dados (ex.: 2d8).');const cm=cmClean(f);
 if(PKV.e>=0){const m=p.mv[PKV.e];m.cm=cm;m.type='';cmReg(m);toast('Move atualizado!')}
 else{const mx=hasT(p,'Move Extra')?5:4;if(p.mv.length>=mx)return toast(`Limite de ${mx} Moves. Esqueça um primeiro (ou pegue o talento Move Extra).`);const m={id:'cm-'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),type:'',dice:'',cm};cmReg(m);p.mv.push(m);toast(`${cm.name} criado!`)}
 sfx('ok');PKM='sheet';PKV={q:'',c:'lvl'};renderLists();drawPk()}
/* ---- habilidade escrita à mão ---- */
function pkAbCustom(){const p=PKL()[PKI],c=p.abCm&&/^cm-ab-/.test(p.ab||'')?p.abCm:{name:'',desc:''};
 $('pkd').innerHTML=`<div class="wc" style="width:min(520px,94vw)"><div class="wbody"><h2>Habilidade própria</h2><p class="note">Escreva o nome e a descrição da habilidade deste Pokémon.</p><input type="text" id="ab-n" maxlength="80" placeholder="Nome da habilidade" value="${esc(c.name)}"><textarea id="ab-d" rows="5" maxlength="800" placeholder="O que a habilidade faz..." style="margin-top:8px">${esc(c.desc)}</textarea></div><div class="wnav"><button class="btn alt" onclick="show('pkd',0)">Cancelar</button><button class="btn" onclick="pkAbCustomSave()">Salvar</button></div></div>`;show('pkd',1)}
function pkAbCustomSave(){const n=$('ab-n').value.trim().slice(0,80),d=$('ab-d').value.trim().slice(0,800);if(!n)return toast('Dê um nome à habilidade.');const p=PKL()[PKI];if(!/^cm-ab-/.test(p.ab||''))p.ab='cm-ab-'+Date.now().toString(36);p.abCm={name:n,desc:d};p.abAny=true;PKAB[p.ab]=[n,d,0];show('pkd',0);sfx('ok');toast(`Habilidade: ${n}`);renderLists();drawPk()}
