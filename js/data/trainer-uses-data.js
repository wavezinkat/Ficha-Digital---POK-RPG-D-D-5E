// js/data/trainer-uses-data.js — Descansos, reservas de pontos e habilidades com usos
/* ===== STATS NO TOPO, DESCANSO LONGO E USOS DE HABILIDADES ===== */
const rM=a=>mod((charData.attributes||{})[a]||10),rU1=a=>Math.max(1,1+rM(a)),RRES={curto:'Desc. curto',longo:'Desc. longo',dia:'Por dia'};
/* reservas de pontos (Livro de Regras, caminhos do treinador) */
const RPOOLS={sombrios:{n:'Pontos Sombrios',p:'Capanga',l:2,r:'longo',m:()=>trainerLevel},taticos:{n:'Pontos Táticos',p:'Tático',l:2,r:'longo',m:()=>trainerLevel},cura:{n:'Reserva de cura (Coração Puro)',p:'Enfermeiro',l:5,r:'longo',m:()=>trainerLevel*5,s:5,a:'Ação'}};
/* habilidades com tipo de ação e/ou recarga. a='' = o livro não define o tipo de ação */
const RCMB=[
{n:'Mestre de Batalha',p:'Treinador Ás',l:5,r:'longo',m:()=>rU1('sab'),t:'dados d6',nc:1},
{n:'Troca Rápida',p:'Treinador Ás',l:15,a:'Ação bônus',r:'longo',m:()=>rU1('sab')},
{n:'Apoiador',p:'Versátil',l:5,r:'longo',m:()=>rU1('sab'),t:'dados d6'},
{n:'Troca de Habilidade',p:'Versátil',l:15,r:'longo',m:()=>1,nc:1},
{n:'Pokéchef',p:'Mentor Pokémon',l:5,a:'Ação',r:'longo',m:()=>rU1('sab')},
{n:'Líder de Torcida',p:'Mentor Pokémon',l:9,a:'Ação bônus',r:'curto',m:()=>1},
{n:'Analista',p:'Pesquisador',l:5,a:'Ação bônus'},
{n:'Professor',p:'Pesquisador',l:15,a:'Ação bônus',r:'longo',m:()=>rU1('int')},
{n:'Tenho que Pegar Todos',p:'Colecionador Pokémon',l:5,r:'longo',m:()=>1,nc:1},
{n:'Alegria',p:'Enfermeiro',l:15,r:'longo',m:()=>1,nc:1},
{n:'Mostre-Me o Que Você Tem',p:'Comandante',l:9,r:'curto',m:()=>1},
{n:'Somos Uma Equipe',p:'Comandante',l:15,a:'Ação bônus',r:'longo',m:()=>rU1('car')},
{n:'Sabotagem',f:'Capanga',p:'Capanga',l:2,a:'Reação',pool:'sombrios',cost:1,q:1},
{n:'Encrenca em Dobro',f:'Encrenca em Dobro',p:'Capanga',l:5,pool:'sombrios',cost:3},
{n:'Evasão Sinistra',f:'Renda-se Agora',p:'Capanga',l:9,a:'Reação',pool:'sombrios',cost:4},
{n:'Copiar Meowth',f:'Prepare-se para Lutar',p:'Capanga',l:15,a:'Reação',pool:'sombrios',cost:5},
{n:'Cura Tática',f:'Tático',p:'Tático',l:2,pool:'taticos',cost:1,q:1},
{n:'Golpe Direcionado',p:'Tático',l:5,pool:'taticos',cost:2},
{n:'Aumente Suas Defesas',p:'Tático',l:9,a:'Reação',pool:'taticos',cost:1,q:1},
{n:'Não Dessa Vez',p:'Tático',l:15,pool:'taticos',cost:1,q:1},
{n:'Coração Puro',p:'Enfermeiro',l:5,a:'Ação',pool:'cura',cost:1,q:1,cmb:1},
{n:'Treinador Mestre',p:'*',l:20,r:'longo',m:()=>2},
{n:'Conexão Profunda',p:'Patrulheiro',l:5,r:'dia',m:()=>Math.max(1,rM('sab'),rM('car')),nc:1},
{n:'Ligação Forte',p:'Patrulheiro',l:9,r:'longo',m:()=>2,nc:1},
{n:'Espírito',p:'Guru',l:15,r:'longo',m:()=>rU1('sab')},
{n:'Telepatia',f:'Psíquico',w:'s',p:'Psíquico',r:'dia',m:()=>1,nc:1}];

