// js/core/state.js — Estado global: charData, atributos, perícias, nível
    let charData = {
        name: "", path: "Treinador Ás", img: "",
        hp: "", coins: 0, inspiration: 0, ac: 10, speed: "9m", maxcr: 1, bg: "",
        attributes: { for: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 },
        proficiencies: {}, specs: {}, pokemons: [], achievements: [], inventory: [], talents: [],
        history: "", personality: ""
    };

    const ATTRS = [
        { id: 'for', name: 'FORÇA' }, { id: 'des', name: 'DESTREZA' }, { id: 'con', name: 'CONSTITUIÇÃO' },
        { id: 'int', name: 'INTELIGÊNCIA' }, { id: 'sab', name: 'SABEDORIA' }, { id: 'car', name: 'CARISMA' }
    ];

    const SKILLS = [
        { id: 'acrobatics', name: 'Acrobacia', attr: 'des' }, { id: 'animal', name: 'Adestrar Animais', attr: 'sab' },
        { id: 'arcana', name: 'Arcanismo', attr: 'int' }, { id: 'athletics', name: 'Atletismo', attr: 'for' },
        { id: 'deception', name: 'Enganação', attr: 'car' }, { id: 'history', name: 'História', attr: 'int' },
        { id: 'insight', name: 'Intuição', attr: 'sab' }, { id: 'intimidation', name: 'Intimidação', attr: 'car' },
        { id: 'investigation', name: 'Investigação', attr: 'int' }, { id: 'medicine', name: 'Medicina', attr: 'sab' },
        { id: 'nature', name: 'Natureza', attr: 'int' }, { id: 'perception', name: 'Percepção', attr: 'sab' },
        { id: 'performance', name: 'Atuação', attr: 'car' }, { id: 'persuasion', name: 'Persuasão', attr: 'car' },
        { id: 'religion', name: 'Religião', attr: 'int' }, { id: 'sleight', name: 'Prestidigitação', attr: 'des' },
        { id: 'stealth', name: 'Furtividade', attr: 'des' }, { id: 'survival', name: 'Sobrevivência', attr: 'sab' }
    ];

    let trainerLevel = 1;
    let profBonus = 2;

