// js/combat/sypher-stone.js — Combate: efeito da Pedra de Sypher (item segurável)
/* +15 em todas as rolagens de dano; a cada rolagem de dano o portador perde de 5% a 10% do PV atual (rolado automaticamente).
   A perda pode derrubar o portador (0 PV). */
const SYPHER={name:'Pedra de Sypher',dmg:15,min:5,max:10};
const hasSypher=p=>!!(p&&p.held&&p.held.name==SYPHER.name);
function sypherApply(p){const hp=p.hpCur,pct=SYPHER.min-1+R(SYPHER.max-SYPHER.min+1),loss=Math.min(Math.max(1,Math.round(hp*pct/100)),hp);p.hpCur=hp-loss;if(loss){sfx('del');renderLists();if(p.hpCur==0)toast(`${p.name} desmaiou!`)}return{pct,loss}}
const sypherTxt=s=>`Pedra de Sypher: +${SYPHER.dmg} no dano. O Pokémon perde ${s.loss} PV (${s.pct}% da vida atual).`;
