//import {list} from "./main_menu.js";

let nav = document.querySelector("nav");
nav.addEventListener("pointerdown", async (e) => {
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        await fetch("https://localhost300" + name);
    }
})