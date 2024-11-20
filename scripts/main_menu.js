"use strict"

const butMenu = document.getElementById("mainMenu");
const mainMenu = document.querySelector('.mainMenu');
butMenu.addEventListener("pointerdown", async () => {
    let arrMenu = await loadMenu();        
        arrMenu.forEach(element => {
            mainMenu.append(element);
        });
})

async function loadMenu () {
    let response = await fetch('https://localhost:3000',{
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({menu:'menu'}),
    });
    
    if(response.ok){        
        let content = await response.json();
        return content;
    }
}