// js/data/talent-presets.js — Talentos prontos para a aba "Seu Treinador"
/* Escolher na lista preenche o formulário de talento (nome, descrição e, se houver, bônus); dá para ajustar antes de salvar. */
const TALENT_PRESETS=[
{n:'Acrobata',d:`Você se torna mais ágil, ganhando os seguintes benefícios:
• Aumente seu valor de Destreza em 1.
• Você ganha proficiência na perícia Acrobacia. Se já for proficiente, passa a ser especialista, podendo aplicar o dobro do seu bônus de proficiência nos testes realizados com ela.
• Como uma ação bônus, você pode fazer um teste de Destreza (Acrobacia) CD 15. Se você for bem-sucedido, o terreno difícil não lhe custará movimento extra até o final do turno atual.`},
{n:'Atleta',d:`Você passou por extenso treinamento físico para ganhar os seguintes benefícios:
• Aumente seu valor de Força ou Destreza em 1.
• Quando você estiver caído, se levantar requer apenas 1,5 metro do seu deslocamento.
• Escalar não custa movimento adicional a você.
• Você pode realizar um salto em distância correndo ou um salto em altura correndo se movendo apenas um passo de ajuste de 1,5 metro, ao invés de 3 metros.`},
{n:'Ator',d:`Perito em mímica e dramaturgia, você recebe os seguintes benefícios:
• Aumente seu valor de Carisma em 1.
• Você tem vantagem em testes de Carisma (Atuação) e Carisma (Enganação) quando você estiver tentando se passar por uma pessoa diferente.
• Você pode imitar a articulação de outra pessoa ou os sons feitos por outras criaturas. Você deve ter ouvido a pessoa falando ou ouvido a criatura fazendo o som por, pelo menos, 1 minuto. Um sucesso num teste de Sabedoria (Intuição) resistido pelo seu teste de Carisma (Enganação) permite que um ouvinte determine que o efeito é falso.`},
{n:'Aumento de CA',d:`Treinador: seu cálculo de CA passa a incluir um modificador de atributo adicional além da Destreza, determinado pela sua Classe de Treinador. Use Sabedoria para Treinador Ás, Versátil, Enfermeiro, Patrulheiro e Guru; Inteligência para Pesquisador, Tático e Criador de Pokémon; e Carisma para Mentor Pokémon, Colecionador Pokémon, Comandante e Capanga. Enquanto ainda não possuir uma Classe de Treinador, use seu modificador de Constituição.`},
{n:'Curandeiro',d:`Você é um cirurgião capacitado, permitindo que você trate de ferimentos rapidamente, trazendo seus aliados de volta à luta. Você adquire os seguintes benefícios:
• Quando você usar um kit de primeiros socorros para estabilizar uma criatura morrendo, a criatura recupera 1 ponto de vida, ao invés disso.
• Com uma ação, você pode gastar um uso do kit de primeiros socorros para tratar de uma criatura e restaurar 1d6 + 4 pontos de vida mais uma quantidade de pontos de vida adicionais igual ao número total de Dados de Vida da criatura. A criatura não pode recuperar pontos de vida através desse talento novamente até ter terminado um descanso curto ou longo.`},
{n:'Dedos Rápidos',d:`Seus dedos ágeis e agilidade permitem que você execute prestidigitação. Você ganha os seguintes benefícios:
• Aumente seu valor de Destreza em 1.
• Você ganha proficiência na perícia Prestidigitação. Se já for proficiente, passa a ser especialista, podendo aplicar o dobro do seu bônus de proficiência nos testes realizados com ela.
• Como uma ação bônus, você pode fazer um teste de Destreza (Prestidigitação) para plantar algo em outra pessoa, esconder um objeto em uma criatura, levantar uma bolsa ou tirar algo do bolso.`},
{n:'Disputador',d:`Você desenvolveu técnicas especializadas para agarrar, conter e imobilizar seus oponentes. Você recebe os seguintes benefícios, que se aplicam apenas a agarrões que não tenham sido causados por Moves:
• Suas jogadas de ataque contra uma criatura agarrada por você possuem vantagem. Esse benefício não se aplica enquanto você estiver Impedido. Outras fontes de vantagem e desvantagem continuam seguindo a regra normal de cancelamento.
• Você pode usar sua ação padrão para tentar imobilizar uma criatura já agarrada por você. Para fazer isso, faça outro teste de agarrar. Se você for bem-sucedido, você e a criatura permanecerão Impedidos até que esse agarrão termine.
• Quando uma criatura que você possa ver tenta usar voluntariamente seu movimento para deixar seu alcance sem Desengajar, você pode usar sua reação para tentar agarrá-la antes que ela se mova para fora dele. A tentativa segue os requisitos normais de Agarrão. Você não pode usar essa reação contra uma criatura que tenha encerrado um agarrão seu nesse mesmo turno. Essa reação não é provocada por movimento forçado, teletransporte ou recolhimento para uma Pokébola.
• Você possui vantagem nos testes de perícia realizados para escapar de um agarrão que não tenha sido causado por um Move.`},
{n:'Esquivo',d:`Pré-requisito: Destreza 13 ou maior.
Você é especialista em espreitar através das sombras, ganhando os seguintes benefícios:
• Você pode tentar se esconder quando estiver levemente obscurecido para a criatura de quem você está tentando se esconder.
• Quando você estiver escondido de uma criatura e errar um ataque à distância contra ela, realizar esse ataque não revelará sua posição.
• Penumbra não impõe desvantagem nos seus testes de Sabedoria (Percepção) relacionados a visão.`},
{n:'Explorador de Cavernas',d:`Acostumado a explorar túneis, cavernas e ruínas antigas, você aprendeu a reconhecer os perigos naturais e os segredos ocultos desses ambientes. Sua experiência em locais subterrâneos lhe concede os seguintes benefícios:
• Você tem vantagem em testes de Sabedoria (Percepção) e Inteligência (Investigação) feitos para detectar passagens ocultas, estruturas instáveis, formações frágeis ou entradas escondidas em cavernas, ruínas ou montanhas.
• Você tem vantagem em testes de resistência feitos para evitar desmoronamentos, gases tóxicos naturais, terrenos escorregadios ou outras condições ambientais perigosas.
• Você possui resistência a danos causados por quedas de rochas, desabamentos e outros perigos naturais encontrados em ambientes subterrâneos.
• Você pode mapear e explorar ambientes rochosos ou subterrâneos sem reduzir seu ritmo de viagem, mantendo-se atento a possíveis ameaças e rotas alternativas.`},
{n:'Mente Afiada',d:`Você tem uma mente que pode cronometrar o tempo e memorizar direção e detalhes com precisão absurda. Você ganha os seguintes benefícios:
• Aumente seu valor de Inteligência em 1.
• Você sempre sabe qual a direção do norte.
• Você sempre sabe o número de horas restantes para o próximo nascer ou pôr do sol.
• Você pode relembrar, com precisão, qualquer coisa que você tenha visto ou ouvido no último mês.`},
{n:'Mestre do Tipo',atk:2,dmg:2,d:`Você se torna um verdadeiro especialista em um tipo específico de Pokémon. Escolha um tipo entre suas Especializações. Todos os Pokémon desse tipo recebem os seguintes benefícios:
• Você adiciona seu modificador de Sabedoria ou Carisma na rolagem ao tentar capturar Pokémon do tipo escolhido.
• Você possui vantagem em testes de perícia feitos especificamente para localizar ou rastrear Pokémon do tipo escolhido.
• Seus Pokémon do tipo escolhido adicionam 1d4 aos testes das perícias em que sejam proficientes.
• Pokémon que compartilham esse tipo recebem +2 nas jogadas de acerto e dano. Se o Move utilizado receber STAB, seu dano aumenta em +2 adicionais.
• Uma vez por combate, cada um de seus Pokémon do tipo escolhido pode aumentar em 1 a quantidade de dados de dano de um Move desse mesmo tipo. Declare o uso antes de rolar o dano. O bônus só pode ser aplicado uma vez por uso do Move e é calculado após outros aumentos na quantidade de dados de dano, mas antes da duplicação por acerto crítico.`},
{n:'Musculoso',d:`Você se torna mais forte, ganhando os seguintes benefícios:
• Aumente seu valor de Força em 1.
• Você ganha proficiência na perícia Atletismo. Se já for proficiente, passa a ser especialista, podendo aplicar o dobro do seu bônus de proficiência nos testes realizados com ela.
• Você conta como se fosse um tamanho maior para determinar sua capacidade de carga.`},
{n:'Observador',d:`Rápido em perceber os detalhes do ambiente, você ganha os seguintes benefícios:
• Aumente seu valor de Inteligência ou Sabedoria em 1.
• Se você puder ver a boca de uma criatura enquanto ela fala um idioma que você compreende, você pode interpretar o que ela está dizendo ao ler os seus lábios.
• Você tem +5 de bônus nos seus valores passivos de Sabedoria (Percepção) e Inteligência (Investigação).`},
{n:'Perceptivo',d:`Você aprimora seus sentidos até que eles se tornem afiados. Você ganha os seguintes benefícios:
• Aumente seu valor de Sabedoria em 1.
• Você ganha proficiência na perícia Percepção. Se já for proficiente, passa a ser especialista, podendo aplicar o dobro do seu bônus de proficiência nos testes realizados com ela.
• Estar em uma área levemente obscurecida não impõe desvantagem em seus testes de Sabedoria (Percepção) se você puder ver e ouvir.`},
{n:'Pequeno Grande',d:`Pré-requisito: Treinador de nível 8 ou superior.
Você enxerga o potencial oculto em seus Pokémon e sabe como despertá-lo, sem que eles percam sua força ou, acima de tudo, sua fofura. Embora não impeça seus Pokémon de evoluir, seu apoio e confiança podem fazê-los perceber que não é preciso mudar para provar o próprio valor. Ao atingirem o nível mínimo necessário para realizar sua próxima evolução, seus Pokémon que ainda possuam evoluções possíveis passam a receber os seguintes benefícios:
• Podem utilizar a tabela de Moves da forma final de sua linha evolutiva, respeitando as restrições de nível para aprendê-los. Caso possuam mais de uma evolução possível, uma delas deve ser escolhida quando o Pokémon for afetado por este talento.
• Recebem um bônus de +1 em suas jogadas de ataque e na CD de seus Moves.
• Recebem um bônus nas jogadas de dano de seus Moves igual à metade do Bônus de Proficiência do próprio Pokémon, arredondada para cima. Esse bônus é aplicado apenas uma vez por criatura atingida a cada uso do Move, independentemente da quantidade de golpes.
• Caso estejam a apenas um estágio evolutivo de sua forma final, seu máximo de pontos de vida aumenta em uma quantidade igual ao seu nível atual, e sua CA aumenta em +1.
• Caso estejam a dois ou mais estágios evolutivos de sua forma final, seu máximo de pontos de vida aumenta em uma quantidade igual a duas vezes seu nível atual, e sua CA aumenta em +2.
Se um Pokémon evoluir sem alcançar sua forma final, seus bônus de PV e CA são recalculados de acordo com a quantidade de estágios evolutivos restantes. Caso o Pokémon evolua para seu estágio final, ele perde todos os benefícios deste talento.`},
{n:'Perito',d:`Você ganha proficiência em qualquer combinação de três perícias à sua escolha.`},
{n:'Resiliente',d:`Escolha um atributo. Você ganha os seguintes benefícios:
• Aumente o valor do atributo escolhido em 1.
• Você ganha proficiência em testes de resistência usando o atributo escolhido. Caso já seja proficiente, este bônus não se acumula.`},
{n:'Resistente',d:`Duro e resistente, você ganha os seguintes benefícios:
• Aumente seu valor de Constituição em 1.
• Quando você rolar um Dado de Vida para recuperar pontos de vida, o valor mínimo de pontos de vida que você recupera dessa rolagem será igual a duas vezes seu modificador de Constituição (mínimo de 2).`},
{n:'Robusto',d:`Seu máximo de pontos de vida aumenta em um valor igual a duas vezes seu nível quando você adquire esse talento. Toda vez que você ganhar um nível, após isso, seu máximo de pontos de vida aumenta em 2 pontos de vida adicionais.`},
{n:'Sorrateiro',d:`Você sabe como se esconder melhor. Você ganha os seguintes benefícios:
• Aumente seu valor de Destreza em 1.
• Você ganha proficiência na perícia Furtividade. Se já for proficiente, passa a ser especialista, podendo aplicar o dobro do seu bônus de proficiência nos testes realizados com ela.
• Se estiver escondido, você pode se mover até 3 metros ao ar livre sem se revelar se terminar o movimento em uma posição onde não esteja claramente visível.`},
{n:'Sortudo',d:`Você tem uma sorte inexplicável que parece surgir nos momentos exatos. Você tem 3 pontos de sorte. A qualquer momento que você realizar um teste de perícia ou teste de resistência, você pode gastar um ponto de sorte para rolar um d20 adicional. Você pode escolher gastar um dos seus pontos de sorte depois de rolar o dado, mas antes de saber o resultado da jogada. Você escolhe qual dos d20 irá usar para o teste de perícia ou teste de resistência.
Você também pode gastar um ponto de sorte quando uma jogada de ataque for feita contra você. Role um d20, e então escolha se o ataque irá usar a jogada do atacante ou a sua. Se mais de uma criatura gastar um ponto de sorte para influenciar uma mesma jogada, os pontos se cancelam mutuamente; nenhum dado adicional é rolado.
Você recupera seus pontos de sorte gastos após terminar um descanso longo.`}
].sort((a,b)=>a.n.localeCompare(b.n,'pt'));
function talentPresetInit(){const s=$('talent-preset');if(s)s.innerHTML='<option value="">Talentos prontos — escolha para preencher…</option>'+TALENT_PRESETS.map((t,i)=>`<option value="${i}">${t.n}</option>`).join('')}
function talentPreset(v){if(v==='')return;const t=TALENT_PRESETS[+v];$('new-talent-name').value=t.n;$('new-talent-desc').value=t.d;$('new-talent-atk').value=t.atk||'';$('new-talent-dmg').value=t.dmg||'';$('new-talent-ty').value='';$('talent-preset').value='';sfx('click');toast(`${t.n}: revise e clique em "Salvar Talento".${t.atk?' Escolha o tipo em "Só Moves do tipo".':''}`)}
