"use strict"

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu");    

window.addEventListener("popstate", (e) => {
    if(e.state){
        switch(e.state.name){
            case 'main':
                res();
                break;
            default : 
                contentF(e.state.name);            
        }
    }
})

document.addEventListener("pointerdown", (e) => {   
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        contentF(name);
        history.pushState({name: name, path:"https://localhost:3000/content/"+name+"/" }, "", "https://localhost:3000/content/"+name+"/");       
    }
    if(e.target.classList.contains("main_content")){
        res();
        history.pushState({name: "main", path:"https://localhost:3000"},"", "https://localhost:3000");
    }
})

async function contentF(name){
    let response = await fetch("https://localhost:3000/content", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name : name}),
    });

    if (response.ok) {
        const newDocument = await response.text();
        main.innerHTML = newDocument;
        if(subMenu.classList.contains("hidden")) subMenu.classList.remove("hidden");
        document.dispatchEvent(new CustomEvent("newContent", {bubbles:true}));        
    } else {
        console.error('Ошибка при отправке запроса:', response.status);
    }
}

let res = async () =>{
    let response = await fetch("https://localhost:3000?main=main", {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        let content = await response.json();
        main.innerHTML = "";
        content.forEach((item) => {
            main.innerHTML +=item;
        })
        subMenu.classList.add("hidden");
        if(document.querySelector(".subUl")) {document.querySelector(".subUl").classList.add("hidden")};
    } else {
        console.log("Error download");
        return []; 
    }        
}

export {res};