
document.addEventListener("DOMContentLoaded", function () {    
    
    console.log('bye')
    let monsterListData = []
    const monsterURL = "http://localhost:4000/monsters";    
    const monsterCollectionDiv = document.getElementById("monster-container")
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward")
    let currentPage = 0
    const monstersPerPage = 50;
    const createMonsterDiv = document.getElementById("create-monster")    
    
    
    
    
    console.log(monsterURL);
    
    fetch(monsterURL)
        .then((res) => res.json())
        .then((monsters) => {
            monsterListData = monsters;
            //   console.log(monsters)
            renderMonsters(monsterListData);
        });
    
    function renderMonsters(monsterList) {
        // console.log(monsterList)
        monsterCollectionDiv.innerHTML = "";
        const startIndex = currentPage * monstersPerPage;
        const endIndex = startIndex + monstersPerPage;
        const monstersToShow = monsterListData.slice(startIndex, endIndex)
        monstersToShow.forEach(renderMonster);
        updateButtons()
    }
    
    function renderMonster(monster) {
        console.log(monster)
        const card = document.createElement("div")
        card.classList.add("card");
        // card.id = "card";
        
        card.innerHTML = `
        <h2>Name: ${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
        `
        monsterCollectionDiv.append(card);
    }

    backButton.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            renderMonsters();
        }
    });

    forwardButton.addEventListener("click", function () {
        const maxPages = Math.ceil(monsterListData.length / monstersPerPage);
        if (currentPage < maxPages - 1) {
            currentPage++;
            renderMonsters();
        }
    });

    function updateButtons() {
        backButton.disabled = currentPage === 0;
        forwardButton.disabled = currentPage === Math.ceil(mosterListData.length / monstersPerPage) - 1;
    }
});