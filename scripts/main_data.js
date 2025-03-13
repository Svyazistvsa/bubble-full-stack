"use strict"

history.scrollRestoration = "manual";

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu"),
    scrollPosition = undefined;

window.addEventListener("popstate", (e) => {
        switch(e.state.name){
            case 'main':                
                res();
                scrollP(e);
                break;
            default :               
                contentF(e.state.name);
                scrollP(e);
        }
    })

document.addEventListener("pointerdown", (e) => {   
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        scrollPosition = { x: window.scrollX, y: window.scrollY };
        history.pushState({name: name, scrollPosition, path:"/content/"+name+"/" }, "", "/content/"+name+"/");
        contentF(name);
        scrollP(e);               
    }
    if(e.target.classList.contains("main_content")){
        scrollPosition = { x: window.scrollX, y: window.scrollY };
        history.pushState({name: "main", scrollPosition, path:"/"},"", "/");
        res();
        scrollP(e);
    }
})

let contentF = async (name) => {
    let response = await fetch("/content", {
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
    let response = await fetch("/?main=main", {
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
    }        
}

function scrollP(e) {
    if (e.state && e.state.scrollPosition) {
        const { x, y } = e.state.scrollPosition;
        window.scrollTo(x, y);
      } else {
        window.scrollTo(0, 0); // либо прокручиваем страницу вверх по умолчанию
      }
}

export {res, contentF};