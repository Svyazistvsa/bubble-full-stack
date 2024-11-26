"use strict";

    import { animation } from "./animation_interface.js";
    const butMenu = document.getElementById("mainMenu");
    const mainMenu = document.querySelector('.mainMenu');
    export let allOut = document.querySelectorAll(".out");
    animation(allOut);

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
            mainMenu.innerHTML += element;
        });
        allOut = document.querySelectorAll(".out");
        animation(allOut);
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

    