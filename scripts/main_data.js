"use strict"

let main = document.getElementsByTagName("main")[0];

document.addEventListener("pointerdown", async (e) => {
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        let response = await fetch("https://localhost:3000/content", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name : name}),
        });

        if (response.ok) {
            const newDocument = await response.text();
            main.innerHTML = newDocument;            
        } else {
            console.error('Ошибка при отправке запроса:', response.status);
        }
    }
    if(e.target.classList.contains("main_content")){
        let response = await fetch("https://localhost:3000?main=main", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            let content = await response.json();
            main.innerHTML = content[0];
            
        } else {
            console.log("Error download");
            return []; 
        }        
    }
})