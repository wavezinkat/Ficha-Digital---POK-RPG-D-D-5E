// js/trainer/lists.js — Listas: Pokémon, insígnias, inventário, talentos
    // --- MANIPULAÇÃO DE LISTAS ---
    function renderLists() {
        const pokeList = document.getElementById('pokemon-list');
        pokeList.innerHTML = charData.pokemons.map((p, index) => `
            <div class="list-card">
                <div class="action-btns">
                    <button class="star-btn ${p.isMain ? 'active' : ''}" onclick="toggleMain(${index})" title="Marcar como Principal"><i class="fas fa-star"></i></button>
                    <button class="edit-btn" onclick="editPokemon(${index})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="removeItem('pokemons', ${index})" title="Excluir"><i class="fas fa-trash"></i></button>
                </div>
                <img src="${p.img || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p>Nível: <strong style="color:var(--poke-blue);">${p.lvl}</strong></p>
            </div>
        `).join('');

        const achList = document.getElementById('achievement-list');
        achList.innerHTML = [].map((a, index) => `
            <div class="list-card">
                <div class="action-btns">
                    <button class="edit-btn" onclick="editAchievement(${index})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="removeItem('achievements', ${index})" title="Excluir"><i class="fas fa-trash"></i></button>
                </div>
                <img src="${a.img || 'https://via.placeholder.com/150?text=Insígnia'}" alt="${a.name}">
                <h4>${a.name}</h4>
            </div>
        `).join('');

        const invList = document.getElementById('inventory-list');
        invList.innerHTML = charData.inventory.map((i, index) => `
            <div class="list-card">
                <div class="action-btns">
                    <button class="edit-btn" onclick="editInventory(${index})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="removeItem('inventory', ${index})" title="Excluir"><i class="fas fa-trash"></i></button>
                </div>
                <img src="${i.img || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png'}" alt="${i.name}">
                <h4>${i.name} (x${i.qtd})</h4>
                <p style="font-size:0.9em; color:#555;">${i.desc}</p>
            </div>
        `).join('');

        const talentList = document.getElementById('talent-list');
        if(talentList && charData.talents) {
            talentList.innerHTML = charData.talents.map((t, index) => `
                <div class="list-card" style="text-align: left; padding-right: 20px;">
                    <div class="action-btns">
                        <button class="edit-btn" onclick="editTalent(${index})" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" onclick="removeItem('talents', ${index})" title="Excluir"><i class="fas fa-trash"></i></button>
                    </div>
                    <h4 style="margin-bottom: 10px; padding-right: 60px;">${t.name}</h4>
                    <p style="font-size:0.9em; color:#444; line-height: 1.5; white-space: pre-wrap; margin: 0;">${t.desc}</p>
                </div>
            `).join('');
        }

        updateStats(); 
    }

    // Funções de Adicionar
    function addPokemon() {
        let name = document.getElementById('new-poke-name').value;
        let lvl = document.getElementById('new-poke-lvl').value;
        let img = document.getElementById('new-poke-img').value;
        if(name) {
            charData.pokemons.push({ name, lvl: lvl || 1, img, isMain: false });
            document.getElementById('new-poke-name').value = '';
            document.getElementById('new-poke-lvl').value = '';
            document.getElementById('new-poke-img').value = '';
            renderLists();
        }
    }

    function addAchievement() {
        let name = document.getElementById('new-ach-name').value;
        let img = document.getElementById('new-ach-img').value;
        if(name) {
            charData.achievements.push({ name, img });
            document.getElementById('new-ach-name').value = '';
            document.getElementById('new-ach-img').value = '';
            renderLists();
        }
    }

    function addInventory() {
        let name = document.getElementById('new-inv-name').value;
        let qtd = document.getElementById('new-inv-qtd').value;
        let img = document.getElementById('new-inv-img').value;
        let desc = document.getElementById('new-inv-desc').value;
        if(name) {
            charData.inventory.push({ name, qtd: qtd || 1, img, desc });
            document.getElementById('new-inv-name').value = '';
            document.getElementById('new-inv-qtd').value = '1';
            document.getElementById('new-inv-img').value = '';
            document.getElementById('new-inv-desc').value = '';
            renderLists();
        }
    }

    function addTalent() {
        let name = document.getElementById('new-talent-name').value;
        let desc = document.getElementById('new-talent-desc').value;
        if(name) {
            charData.talents.push({ name, desc });
            document.getElementById('new-talent-name').value = '';
            document.getElementById('new-talent-desc').value = '';
            renderLists();
        }
    }

    // Funções de Editar e Remover
    function editPokemon(index) {
        let p = charData.pokemons[index];
        document.getElementById('new-poke-name').value = p.name;
        document.getElementById('new-poke-lvl').value = p.lvl;
        document.getElementById('new-poke-img').value = p.img || '';
        removeItem('pokemons', index);
        document.getElementById('new-poke-name').focus();
    }

    function editAchievement(index) {
        let a = charData.achievements[index];
        document.getElementById('new-ach-name').value = a.name;
        document.getElementById('new-ach-img').value = a.img || '';
        removeItem('achievements', index);
        document.getElementById('new-ach-name').focus();
    }

    function editInventory(index) {
        let i = charData.inventory[index];
        document.getElementById('new-inv-name').value = i.name;
        document.getElementById('new-inv-qtd').value = i.qtd;
        document.getElementById('new-inv-img').value = i.img || '';
        document.getElementById('new-inv-desc').value = i.desc || '';
        removeItem('inventory', index);
        document.getElementById('new-inv-name').focus();
    }

    function editTalent(index) {
        let t = charData.talents[index];
        document.getElementById('new-talent-name').value = t.name;
        document.getElementById('new-talent-desc').value = t.desc || '';
        removeItem('talents', index);
        document.getElementById('new-talent-name').focus();
    }

    function removeItem(list, index) {
        charData[list].splice(index, 1);
        renderLists();
    }

