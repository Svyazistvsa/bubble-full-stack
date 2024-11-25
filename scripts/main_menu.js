"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const butMenu = document.getElementById("mainMenu");
    const mainMenu = document.querySelector('.mainMenu');

    butMenu.addEventListener("pointerdown", async (e) => {
        if(mainMenu.querySelector('li')){
            let list = mainMenu.querySelectorAll('li');
            for(let elem of list){
                elem.classList.toggle('hidden');
            }
            return;
        }

        let arrMenu = await loadMenu();
        
        arrMenu.forEach(element => {
            //const li = document.createElement('li'); 
            //li.innerHTML = element; 
            //mainMenu.append(li); 
            mainMenu.innerHTML += element;
        });
    });

    async function loadMenu() {
        let response = await fetch('https://localhost:3000?menu=menu', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            let content = await response.json(); 
            return content; 
        } else {
            console.log("Error download");
            return []; 
        }
    }
});