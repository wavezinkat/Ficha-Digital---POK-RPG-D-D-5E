// js/trainer/party-limit.js — Limite de Pokémon principais na party
    // --- LÓGICA DE LIMITE DE PARTY ---
    function getMaxMain(level) {
        if (level <= 4) return 3;
        if (level <= 9) return 4;
        if (level <= 14) return 5;
        return 6;
    }

    function toggleMain(index) {
        let p = charData.pokemons[index];
        let currentMainCount = charData.pokemons.filter(poke => poke.isMain).length;
        let allowed = getMaxMain(trainerLevel);

        if (!p.isMain && currentMainCount >= allowed) {
            alert(`Você só pode ter ${allowed} Pokémons principais no Nível ${trainerLevel}! Suba de nível para liberar mais espaço.`);
            return;
        }

        p.isMain = !p.isMain;
        updateStats(); 
        renderLists();
    }

