//import {list} from "./main_menu.js";

let nav = document.querySelector("nav");
nav.addEventListener("pointerdown", async (e) => {
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        let response = await fetch("https://localhost300/content", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name : e.target.dataset.name}),
        });

        if (response.ok) {
            const newDocument = await response.text();
            document.open();
            document.write(newDocument);
            document.close();
        } else {
            console.error('Ошибка при отправке запроса:', response.status);
        }
    }
})