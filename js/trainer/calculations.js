// js/trainer/calculations.js — Cálculos: especializações, nível, bônus, atributos
    // --- CÁLCULOS PRINCIPAIS ---
    function updateSpecs() {
        if(typeof charData.specs !== 'object') charData.specs = {};
        SPECIALIZATIONS.forEach((s, i) => {
            charData.specs[s] = document.getElementById(`spec-${i}`).checked;
        });
        renderTrainerTab();
    }

    function getLevelFromSum(sum) {
        if (sum >= 114) return 20;
        if (sum >= 108) return 19;
        if (sum >= 102) return 18;
        if (sum >= 96) return 17;
        if (sum >= 90) return 16;
        if (sum >= 70) return 15;
        if (sum >= 65) return 14;
        if (sum >= 60) return 13;
        if (sum >= 55) return 12;
        if (sum >= 50) return 11;
        if (sum >= 36) return 10;
        if (sum >= 32) return 9;
        if (sum >= 28) return 8;
        if (sum >= 24) return 7;
        if (sum >= 20) return 6;
        if (sum >= 12) return 5;
        if (sum >= 9) return 4;
        if (sum >= 6) return 3;
        if (sum >= 3) return 2;
        return 1;
    }

    function calculateLevel() { if(true){trainerLevel=+charData.level||1;profBonus=Math.ceil(trainerLevel/4)+1;document.getElementById('display-trainer-level').innerText=trainerLevel;document.getElementById('display-prof-bonus').innerText=profBonus;renderTrainerTab();return;}
        let mainPokes = charData.pokemons.filter(p => p.isMain);
        
        if (mainPokes.length === 0) {
            trainerLevel = 1;
        } else {
            let sum = mainPokes.reduce((acc, p) => acc + (parseInt(p.lvl) || 1), 0);
            trainerLevel = getLevelFromSum(sum);
            
            let allowed = getMaxMain(trainerLevel);
            let loopCount = 0; 
            while (mainPokes.length > allowed && loopCount < 10) {
                mainPokes.sort((a, b) => (parseInt(a.lvl) || 1) - (parseInt(b.lvl) || 1));
                mainPokes[0].isMain = false; 
                
                mainPokes = charData.pokemons.filter(p => p.isMain);
                if (mainPokes.length === 0) { trainerLevel = 1; break; }
                
                sum = mainPokes.reduce((acc, p) => acc + (parseInt(p.lvl) || 1), 0);
                trainerLevel = getLevelFromSum(sum);
                allowed = getMaxMain(trainerLevel);
                loopCount++;
                
                alert("Atenção: A soma dos seus níveis caiu e o limite da Party diminuiu. O Pokémon principal de menor nível foi desmarcado automaticamente para ajustar!");
            }
        }
        
        profBonus = Math.ceil(trainerLevel / 4) + 1;
        document.getElementById('display-trainer-level').innerText = trainerLevel;
        document.getElementById('display-prof-bonus').innerText = profBonus;
        
        renderTrainerTab();
    }

    function updateStats() {
        calculateLevel();

        ATTRS.forEach(a => {
            let val = parseInt(document.getElementById(`attr-${a.id}`).value) || 10;
            charData.attributes[a.id] = val;
            let mod = Math.floor((val - 10) / 2);
            document.getElementById(`mod-${a.id}`).innerText = (mod >= 0 ? '+' : '') + mod;
        });

        SKILLS.forEach(s => {
            let isProf = document.getElementById(`prof-${s.id}`).checked;
            charData.proficiencies[s.id] = isProf;
            
            let attrVal = charData.attributes[s.attr];
            let mod = Math.floor((attrVal - 10) / 2);
            let total = mod + (isProf ? profBonus * (charData.expertise && charData.expertise[s.id] ? 2 : 1) : 0);
            document.getElementById(`skill-${s.id}`).innerText = (total >= 0 ? '+' : '') + total;
        });
    }

