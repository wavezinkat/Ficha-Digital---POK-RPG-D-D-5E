// js/data/trainer-data.js — Buffs, caminhos e especializações do treinador
    // --- DADOS E CONSTANTES ---
    const TRAINER_GENERAL_BUFFS = [
        { level: 10, name: "Determinação do Treinador", desc: "Você já obteve bastante experiência em batalhas difíceis e saiu vitorioso e forte. Você agora é imune a medo e pode escolher um segundo teste de resistência para se tornar proficiente." },
        { level: 13, name: "Rastreador Pokémon", desc: "Você já passou inúmeras horas na selva, procurando Pokémon altos e baixos. Uma vez por descanso longo, você pode fazer um teste de SAB CD 15 para procurar Pokémon nas proximidades. Se obtiver sucesso, seu Mestre deve lhe dizer quais Pokémon selvagens podem ser encontrados nas proximidades. Com um sucesso crítico, um Pokémon de sua escolha da lista do Mestre aparece no próximo encontro." },
        { level: 20, name: "Treinador Mestre", desc: "Seus Pokémon atingem o máximo desempenho de luta. Quando você ou seu Pokémon falham em um teste de resistência, você pode optar por ter sucesso automático. Este recurso pode ser usado duas vezes por descanso longo." }
    ];

    const SPEC_BUFFS = {
        "Guardião dos Pássaros": "Você ganha proficiência em Percepção. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Voador.",
        "Maníaco por Insetos": "Você ganha Proficiência em Natureza. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Inseto.",
        "Campista": "Você ganha proficiência em Sobrevivência. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Terra.",
        "Domador de Dragões": "Aumente sua SAB em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Dragão.",
        "Engenheiro": "Aumente sua INT em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Elétrico.",
        "Piromaníaco": "Aumente sua CON em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Fogo.",
        "Jardineiro": "Você ganha proficiência em Natureza. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Grama.",
        "Artista Marcial": "Aumente sua FOR, DES ou CON em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Lutador.",
        "Alpinista": "Aumente sua FOR, DES ou CON em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Pedra.",
        "Místico": "Você ganha proficiência em Arcanismo. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Fantasma.",
        "Metalúrgico": "Aumente sua FOR ou CON em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Aço.",
        "Psíquico": "Você ganha a habilidade de atingir um de seus próprios Pokémon com o feitiço Telepatia (descrito no tópico Extras) uma vez por dia, ignorando os componentes e restrição de Inteligência. Adicione um Bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Psíquico.",
        "Nadador": "Ganhe uma velocidade de natação igual à sua velocidade de movimento. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Água.",
        "Encantador": "Aumente seu CAR em +1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Fada.",
        "Sombrio": "Você ganha proficiência em Enganação ou Furtividade. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Sombrio.",
        "Alquimista": "Você ganha proficiência em Medicina ou Enganação. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Venenoso.",
        "Jogador de Equipe": "Aumente qualquer um dos seus valores de habilidade em 1. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Normal.",
        "Esquiador": "Ganhe proficiência na perícia Atuação ou Persuasão. Adicione um bônus de +1 a todos os testes de habilidade feitos por qualquer um dos seus Pokémon do tipo Gelo."
    };

    const PATH_BUFFS = {
        "Treinador Ás": [
            { level: 2, name: "Treinador Ás", desc: "Seu objetivo é se tornar um dos treinadores mais fortes do mundo, e você se destaca em batalha. Começando no 2º nível, todos os seus Pokémon recebem um bônus de +1 em suas rolagens de ataque e dano." },
            { level: 5, name: "Mestre de Batalha", desc: "Você ganha um número de dados de batalha (d6) igual a 1 + seu modificador de Sabedoria (mínimo de 1). Você pode atribuir um desses dados a qualquer um de seus Pokémon para ser adicionado a uma única rolagem de ataque ou dano, após o resultado. Repõe a cada descanso longo." },
            { level: 9, name: "Potencial Máximo", desc: "Escolha entre aumentar a velocidade de todos os seus Pokémon em 10 pés (3 metros), aumentar a FOR deles em 1, aumentar a DES deles em 1 ou aumentar a CON deles em 1." },
            { level: 15, name: "Troca Rápida", desc: "Você pode recolher e liberar Pokémon como uma ação bônus em vez de uma ação padrão. Pode ser usado 1 + mod. Sab (mínimo 1) vezes por descanso longo. Um Pokémon não pode ser trocado até o final de seu primeiro turno completo." }
        ],
        "Versátil": [
            { level: 2, name: "Versátil", desc: "Você escolhe experimentar uma variedade de habilidades para cuidar de seus Pokémon. No 2º nível, selecione uma especialização adicional e duas novas proficiências em perícias para o seu treinador." },
            { level: 5, name: "Apoiador", desc: "Você ganha um número de dados de habilidade (d6) igual a 1 + seu modificador de SAB (mínimo 1). Você pode atribuir a um Pokémon para adicionar a um único teste de habilidade ou resistência, após o resultado. Repõe a cada descanso longo." },
            { level: 9, name: "Muitas Faces", desc: "Você pode escolher um recurso de 2º, 5º ou 9º nível de qualquer outro caminho de treinador." },
            { level: 15, name: "Troca de Habilidade", desc: "A cada descanso longo, escolha um talento na seção 'Talentos Adicionais' para que todos os seus Pokémon o conheçam naquele dia. O talento pode ser alterado a cada descanso longo." }
        ],
        "Mentor Pokémon": [
            { level: 2, name: "Mentor Pokémon", desc: "Você tem um toque de cuidado e habilidade para orientar o Pokémon. Suas TMs podem ser usadas duas vezes antes de serem quebradas." },
            { level: 5, name: "Pokéchef", desc: "Você está frequentemente preparado com uma 'Guloseima Comestível', curando 2d4+2 PV quando dada como ação. Usos: 1 + mod. SAB. Repõe a cada descanso longo." },
            { level: 9, name: "Líder de Torcida", desc: "Uma vez por descanso curto, use uma ação bônus para impulsionar Pokémon aliados. Até seu próximo turno, adicione seu mod. CAR a ataques OU dano OU CA de todos os aliados. Guloseima agora cura 3d10+6." },
            { level: 15, name: "Professor Mestre", desc: "Os Moves de seus Pokémon podem ser aprendidos e esquecidos a cada descanso longo, em vez de no nível acima. Guloseima agora cura 4d12+10." }
        ],
        "Pesquisador": [
            { level: 2, name: "Pesquisador", desc: "Você pode aumentar um dos testes de perícia que seus Pokémon realizem no valor do modificador de Sabedoria ou Inteligência do seu treinador. Você deve escolher qual ao adotar este caminho." },
            { level: 5, name: "Analista", desc: "Faça um teste de Investigação CD 12 como ação bônus para determinar o nível de um Pokémon e identificar sua habilidade passiva." },
            { level: 9, name: "Especialista em Evolução", desc: "Quando um de seus Pokémon evolui, você pode usar dois de seus pontos de evolução para adquirir um talento." },
            { level: 15, name: "Professor", desc: "Use uma ação bônus para identificar todos os Moves de um alvo. Concede +2 nos ataques aliados em até 18 metros até o fim do seu próximo turno. Usos: 1 + mod. INT. Repõe em descanso longo." }
        ],
        "Colecionador Pokémon": [
            { level: 2, name: "Colecionador Pokémon", desc: "Você agora é especialista em Adestrar Animais, dobrando sua proficiência nesta habilidade." },
            { level: 5, name: "Tenho que Pegar Todos", desc: "Uma vez por descanso longo, faça um teste de Adestrar Animais com vantagem, mesmo que o oponente não sofra efeito negativo." },
            { level: 9, name: "Especialista em Captura", desc: "Qualquer Pokémon capturado será instantaneamente curado de status e terá saúde plena. Adicione seu mod. CAR a qualquer tentativa de captura." },
            { level: 15, name: "Ataques Disciplinados", desc: "Ao causar dano suficiente para fazer um Pokémon desmaiar, você pode escolher deixá-lo com 1 PV." }
        ],
        "Enfermeiro": [
            { level: 2, name: "Enfermeiro", desc: "Ganhe proficiência em Medicina. A cada descanso longo ou visita ao Centro Pokémon, seus Pokémon ganham PV temporários iguais ao seu nível de treinador." },
            { level: 5, name: "Coração Puro", desc: "Com uma ação, toque uma criatura voluntária para restaurar PV de uma reserva (Reserva total = nível de treinador x 5). Repõe em descanso longo." },
            { level: 9, name: "Espírito de Cura", desc: "Sempre que você usar consumível de cura ou seu Pokémon usar Move de cura, jogue os dados duas vezes e obtenha o resultado mais alto." },
            { level: 15, name: "Alegria", desc: "Uma vez por descanso longo, gaste 1 hora para curar totalmente até seis Pokémon (ferimentos e status), como em um Centro Pokémon." }
        ],
        "Mestre do Tipo": [
            { level: 2, name: "Mestre do Tipo", desc: "Aumente o STAB de qualquer Pokémon do mesmo tipo da sua especialização em +1. Tipo duplo com ambas as especializações recebe +2." },
            { level: 5, name: "Poder de Atração", desc: "Pokémon do mesmo tipo das suas especializações adicionam +2 às suas rolagens de ataque." },
            { level: 9, name: "Armazenamento de Energia", desc: "Todos os seus Pokémon carregados dentro dos seus tipos têm resistência a UMA escolha de um de seus tipos de especialização. Vulnerabilidades tornam-se neutras." },
            { level: 15, name: "Liberando Poder", desc: "Para Pokémon do tipo especializado, o STAB pode ser adicionado a qualquer Move prejudicial, mesmo de tipo diferente." }
        ],
        "Comandante": [
            { level: 2, name: "Comandante", desc: "A Lealdade do seu Pokémon inicial aumenta para 'Leal'. Todos os seus Pokémon dobram os bônus de testes de resistência e PV de níveis positivos de lealdade." },
            { level: 5, name: "Siga-me", desc: "Novo Pokémon capturado recebe +1 em Lealdade. A lealdade não pode ser diminuída ao perder uma batalha." },
            { level: 9, name: "Mostre-Me o Que Você Tem", desc: "Uma vez por descanso curto, um Pokémon pode dobrar os dados de dano de um Move OU ativar um Move de um nível acima (ou desconhecido no bloco, se nível máximo)." },
            { level: 15, name: "Somos Uma Equipe", desc: "Ação bônus: comando de vantagem em ataques para aliados a até 18 metros até o fim do seu próximo turno. Usos: 1 + mod. CAR. Repõe em descanso longo." }
        ],
        "Capanga": [
            { level: 2, name: "Capanga", desc: "Ganhe 'Pontos Sombrios' iguais ao seu nível (repõe no descanso longo). Sabotagem: como reação, gaste pontos para diminuir o ataque inimigo contra seu Pokémon." },
            { level: 5, name: "Encrenca em Dobro", desc: "Vantagem Sombria: gaste 3 Pontos Sombrios para obter vantagem em teste de habilidade, ataque ou resistência seu ou do seu Pokémon." },
            { level: 9, name: "Renda-se Agora", desc: "Evasão Sinistra: como reação, gaste 4 Pontos Sombrios para adicionar um nível de resistência a um Move inimigo (Vulnerável → Neutro, etc)." },
            { level: 15, name: "Prepare-se para Lutar", desc: "Copiar Meowth: gaste 5 Pontos Sombrios para qualquer um dos seus Pokémon invocar a reação 'Me First'." }
        ],
        "Tático": [
            { level: 2, name: "Tático", desc: "Ganhe 'Pontos Táticos' iguais ao nível (repõe no descanso longo). Ao curar, gaste pontos para curar +1d4 extras por ponto." },
            { level: 5, name: "Golpe Direcionado", desc: "Gaste 2 Pontos Táticos para rolar dano de ataque duas vezes, obtendo o resultado mais alto." },
            { level: 9, name: "Aumente Suas Defesas", desc: "Como reação, gaste até 3 Pontos Táticos para adicionar à CA de um Pokémon para fazer um ataque falhar." },
            { level: 15, name: "Não Dessa Vez", desc: "Depois que o oponente fizer teste de resistência contra você, aumente a CD em até 5 pontos (gaste 1 ponto tático por aumento) se isso causar falha." }
        ],
        "Patrulheiro": [
            { level: 2, name: "Patrulheiro", desc: "Ganhe proficiência em Natureza e Sobrevivência (ou expertise se já tinha). Velocidade aumenta em 1,5m, e ganha escalada/natação igual caminhada." },
            { level: 5, name: "Conexão Profunda", desc: "Lance 'Falar com Animais' para se comunicar com Pokémon voluntário. Usos: mod. SAB ou CAR (mín. 1) por dia." },
            { level: 9, name: "Ligação Forte", desc: "Você pode criar vínculos com até dois Pokémon em cada descanso longo." },
            { level: 15, name: "Melhores Amigos", desc: "Tenha dois Pokémon Ativos fora das Pokébolas. Em batalha, o segundo Pokémon tem ação/ação bônus própria." }
        ],
        "Guru": [
            { level: 2, name: "Guru", desc: "Ganhe proficiência em Persuasão. Pokémon incontroláveis ficam 'Indiferentes' em vez de 'Desleais'." },
            { level: 5, name: "Mente", desc: "Seus Pokémon são proficientes em testes de SAB e têm vantagem para evitar Confusão." },
            { level: 9, name: "Corpo", desc: "Acesso a ambas as habilidades passivas não ocultas. Talento Incansável agora custa 1 ponto ASI em vez de dois." },
            { level: 15, name: "Espírito", desc: "No início do turno, ative para adicionar mod. SAB a ataques OU dano do seu Pokémon até o próximo turno. Usos: 1 + mod. SAB. Repõe em descanso longo." }
        ]
    };

    const TRAINER_PATHS = Object.keys(PATH_BUFFS);
    TRAINER_PATHS.push("Criador de Pokémon"); 
    const SPECIALIZATIONS = Object.keys(SPEC_BUFFS);

