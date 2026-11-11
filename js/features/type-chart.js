// js/features/type-chart.js — Tabela de tipos (ataque → defesa) e ícones de tipo
/* Tabela padrão dos jogos (a mesma da imagem de referência do projeto): só aparecem os desvios do ×1.
   TCH[atacante] = {defensor: multiplicador}. Considera apenas os tipos (não habilidades como Levitate). */
const TCH={
 normal:{rock:.5,ghost:0,steel:.5},
 fire:{fire:.5,water:.5,grass:2,ice:2,bug:2,rock:.5,dragon:.5,steel:2},
 water:{fire:2,water:.5,grass:.5,ground:2,rock:2,dragon:.5},
 electric:{water:2,electric:.5,grass:.5,ground:0,flying:2,dragon:.5},
 grass:{fire:.5,water:2,grass:.5,poison:.5,ground:2,flying:.5,bug:.5,rock:2,dragon:.5,steel:.5},
 ice:{fire:.5,water:.5,grass:2,ice:.5,ground:2,flying:2,dragon:2,steel:.5},
 fighting:{normal:2,ice:2,poison:.5,flying:.5,psychic:.5,bug:.5,rock:2,ghost:0,dark:2,steel:2,fairy:.5},
 poison:{grass:2,poison:.5,ground:.5,rock:.5,ghost:.5,steel:0,fairy:2},
 ground:{fire:2,electric:2,grass:.5,poison:2,flying:0,bug:.5,rock:2,steel:2},
 flying:{electric:.5,grass:2,fighting:2,bug:2,rock:.5,steel:.5},
 psychic:{fighting:2,poison:2,psychic:.5,dark:0,steel:.5},
 bug:{fire:.5,grass:2,fighting:.5,poison:.5,flying:.5,psychic:2,ghost:.5,dark:2,steel:.5,fairy:.5},
 rock:{fire:2,ice:2,fighting:.5,ground:.5,flying:2,bug:2,steel:.5},
 ghost:{normal:0,psychic:2,ghost:2,dark:.5},
 dragon:{dragon:2,steel:.5,fairy:0},
 dark:{fighting:.5,psychic:2,ghost:2,dark:.5,fairy:.5},
 steel:{fire:.5,water:.5,electric:.5,ice:2,rock:2,steel:.5,fairy:2},
 fairy:{fire:.5,fighting:2,poison:.5,dragon:2,dark:2,steel:.5}
};
const TYI={normal:'fa-circle',fire:'fa-fire',water:'fa-droplet',electric:'fa-bolt',grass:'fa-leaf',ice:'fa-snowflake',fighting:'fa-hand-fist',poison:'fa-skull-crossbones',ground:'fa-mountain',flying:'fa-feather',psychic:'fa-eye',bug:'fa-bug',rock:'fa-gem',ghost:'fa-ghost',dragon:'fa-dragon',dark:'fa-moon',steel:'fa-gear',fairy:'fa-wand-magic-sparkles'};
/* ícone pequeno do tipo (círculo com o degradê do tipo; o nome aparece ao passar o mouse) */
const tyI=t=>`<span class="tyi t-${t}" title="${TYP[t]||t}"><i class="fas ${TYI[t]||'fa-circle'}"></i></span>`;
/* defesa: quanto cada tipo de ataque causa em um Pokémon com esses tipos → {4:[],2:[],1:[],.5:[],.25:[],0:[]} */
function tyDef(types){const o={4:[],2:[],1:[],.5:[],.25:[],0:[]},T=(types||[]).filter(t=>TCH[t]);
 Object.keys(TCH).forEach(a=>{let m=1;T.forEach(d=>{const v=TCH[a][d];m*=v==null?1:v});if(m>2)m=2;/* no PokeRPG não existe ×4: dupla fraqueza vale ×2 */(o[m]||o[1]).push(a)});return o}
/* ataque: contra quais tipos (simples) um golpe do tipo `a` causa ×2, ×1, ×½ e ×0 */
function tyOff(a){const o={2:[],1:[],.5:[],0:[]};if(!TCH[a])return o;Object.keys(TCH).forEach(d=>{const v=TCH[a][d];(o[v==null?1:v]).push(d)});return o}
const tyIcons=l=>l.map(tyI).join('');
function tyDefHTML(types){const r=tyDef(types),G=[[2,'×2','Fraquezas (super efetivo)','weak'],[1,'×1','Dano normal','nor'],[.5,'×½','Resiste','res'],[.25,'×¼','Resiste muito','res'],[0,'×0','Imune','imm']];
 return`<div class="tdef">${G.filter(g=>r[g[0]].length).map(g=>`<div class="tdr ${g[3]}"><span class="tdl" title="${g[2]}"><b>${g[1]}</b><small>${g[2]}</small></span><span class="tdi">${tyIcons(r[g[0]])}</span></div>`).join('')}<p class="note" style="margin:4px 0 0">Considera só os tipos do Pokémon (habilidades como Levitate não entram).</p></div>`}
const tyWeakCount=types=>{const r=tyDef(types);return r[2].length};
/* resultado do golpe no combate: mini ícones dos tipos-alvo em cada coluna de efetividade (ofensivo) */
function rvTy(ty,k){if(!TCH[ty])return'';if(k==.25)return'<span class="rti q" title="Contra um tipo duplo em que os dois tipos resistem">2 tipos que resistem</span>';const l=tyOff(ty)[k]||[];return l.length?`<span class="rti">${tyIcons(l)}</span>`:'<span class="rti q">—</span>'}
const rvImm=ty=>{if(!TCH[ty])return'';const l=tyOff(ty)[0];return l.length?`<p class="rimm"><b>Sem efeito (×0):</b> ${tyIcons(l)}</p>`:''};
