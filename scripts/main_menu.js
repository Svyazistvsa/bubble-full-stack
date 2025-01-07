"use strict";

let env, list, allOut;

    document.addEventListener("DOMContentLoaded", async () => {
        if(document.getElementById("desctop")){
            env = await import ("./animation_interface.js");
        }
    
        if(document.getElementById("mobile")){
            env = await import ("./animation_interface_mobile.js");
        }
        env.animation(allOut);
    }) 

    const butMenu = document.getElementById("mainMenu");
    const mainMenu = document.querySelector('.mainMenu');
    allOut = document.querySelectorAll(".out");
    
    document.addEventListener("pointerdown", (e) =>{
        if(e.target !== butMenu && mainMenu.querySelector('li') && !mainMenu.querySelector('li').classList.contains('hidden')){
            if(e.target === document.querySelector(".lines")) return ;
            mainMenu.classList.add('hidden');
            return;                        
        }
    })

    butMenu.addEventListener("pointerdown", async (e) => {
        if(mainMenu.querySelector('li')){
            mainMenu.classList.toggle('hidden');
            return;
        }
       
        let arrMenu = await loadMenu();
        
        arrMenu.forEach(element => {
            mainMenu.innerHTML += element;
        });
        allOut = document.querySelectorAll(".out");
        env.animation(allOut);
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

    export {list, butMenu};