//import {list} from "./main_menu.js";

let nav = document.querySelector("nav"),
    main = document.getElementsByTagName("main");
    alert(main);
nav.addEventListener("pointerdown", async (e) => {
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        let response = await fetch("https://localhost:3000/content", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name : name}),
        });

        if (response.ok) {
            const newDocument = await response.text();
            main[0].innerHTML = newDocument;
            
        } else {
            console.error('Ошибка при отправке запроса:', response.status);
        }
    }
})