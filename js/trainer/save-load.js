// js/trainer/save-load.js — Salvar/carregar (navegador e JSON)
    // --- SAVE / LOAD ---
    function updateFormFromData() {
        // Garantir que a array de talentos exista ao carregar uma ficha antiga
        if (!charData.talents) {
            charData.talents = [];
        }

        document.getElementById('char-name').value = charData.name || '';
        document.getElementById('char-path').value = charData.path || 'Treinador Ás';
        document.getElementById('char-hp').value = charData.hp || '';
        document.getElementById('char-coins').value = charData.coins || 0;
        document.getElementById('char-inspiration').value = charData.inspiration || 0;
        document.getElementById('char-ac').value = charData.ac || 10;
        document.getElementById('char-speed').value = charData.speed || '9m';
        document.getElementById('char-maxcr').value = charData.maxcr || 1;
        document.getElementById('char-img').value = charData.img || '';
        document.getElementById('bg-url').value = charData.bg || '';
        document.getElementById('char-history').value = charData.history || '';
        document.getElementById('char-personality').value = charData.personality || '';

        updateCharImage();
        updateBackground();

        ATTRS.forEach(a => {
            document.getElementById(`attr-${a.id}`).value = charData.attributes[a.id] || 10;
        });

        SKILLS.forEach(s => {
            document.getElementById(`prof-${s.id}`).checked = !!charData.proficiencies[s.id];
        });

        if(typeof charData.specs === 'string') charData.specs = {};
        SPECIALIZATIONS.forEach((s, i) => {
            document.getElementById(`spec-${i}`).checked = !!charData.specs[s];
        });

        renderLists();
        renderTrainerTab(); 
    }

    function saveToCache() {
        localStorage.setItem('pokeRpgFicha', JSON.stringify(charData));
        alert("Computador do Bill: Dados salvos com sucesso!");
    }

    function loadFromCache() {
        let saved = localStorage.getItem('pokeRpgFicha');
        if(saved) {
            charData = JSON.parse(saved);
            updateFormFromData();
            alert("Computador do Bill: Dados carregados com sucesso!");
        } else {
            alert("Computador do Bill: Nenhum dado encontrado!");
        }
    }

    function downloadJSON() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(charData, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", (charData.name || "ficha") + "_pokerpg.json");
        dlAnchorElem.click();
    }

    function loadJSON(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                charData = JSON.parse(e.target.result);
                updateFormFromData();
                alert("Ficha importada com sucesso!");
            } catch (err) {
                alert("Erro ao ler o arquivo JSON. O Porygon encontrou um bug!");
            }
        };
        reader.readAsText(file);
    }

    
