"use strict"

window.history.scrollRestoration = "manual";

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu");

window.addEventListener("popstate", async(e) => {
    history.replaceState({ name: cp(), scroll: { x: window.scrollX, y: window.scrollY }, path:window.location.pathname }, "", window.location.pathname);
    if (e.state) {
        switch(e.state.name){
            case 'main':                
                await res();
                break;
            default:               
                await contentF(e.state.name);
        }        
    }
    const { x, y } = e.state.scroll;
    window.scrollTo(x, y);
});

document.addEventListener("pointerdown", async (e) => {   
    if(e.target.hasAttribute("data-name")){
        hid("no");
        let name = e.target.dataset.name;
        history.pushState({ name: cp(), scroll: { x: window.scrollX, y: window.scrollY }, path:window.location.pathname }, "", window.location.pathname);        
        await contentF(name);        
        window.scrollTo(0, 0);
    }
    if(e.target.classList.contains("main_content")){
        hid("no");
        history.pushState({ name: cp(), scroll: { x: window.scrollX, y: window.scrollY }, path:window.location.pathname }, "", window.location.pathname);
        await res();        
        window.scrollTo(0, 0);
    }
    if(e.target.classList.contains("relax")){
        hid("yes");
        history.pushState({ name: "relax", scroll: { x: window.scrollX, y: window.scrollY }, path: "/relax" }, "", "/relax");
        //history.replaceState({name: "relax", scroll: { x: window.scrollX, y: window.scrollY}, path: "/relax" }, "", "/relax");
        
    }
});

let contentF = async (name) => {
    let response = await fetch("/content", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name : name}),
    });

    if (response.ok) {
        const newDocument = await response.text();
        main.innerHTML = newDocument;
        history.replaceState({name: name, scroll: { x: window.scrollX, y: window.scrollY}, path: "/content/" + name + "/"}, "", "/content/" + name + "/");
        if(subMenu.classList.contains("hidden")) subMenu.classList.remove("hidden");
        document.dispatchEvent(new CustomEvent("newContent", {bubbles:true}));        
    } else {
        console.error('Ошибка при отправке запроса:', response.status);
    }
}

let res = async () =>{
    let response = await fetch(`/?main=main`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        let content = await response.json();
        main.innerHTML = "";
        content.forEach((item) => {
            main.innerHTML +=item;
        });
        history.replaceState({name: "main", scroll: { x: window.scrollX, y: window.scrollY}, path: "/"}, "", "/");
        subMenu.classList.add("hidden");
        if(document.querySelector(".subUl")) {document.querySelector(".subUl").classList.add("hidden")};
    } else {
        console.log("Error download");
    }        
}

let hid = (question) =>{
    let page,
        footer = document.querySelector("footer");

    if(document.querySelector("#desctop")) page = document.querySelector("#page");
    if(document.querySelector("#mobile")) page = main;

    if(question == "yes"){
        page.classList.add("hidden");
        footer.classList.add("hidden");
    } 
    if(question == "no") {
        if(page.classList.contains("hidden")) page.classList.remove("hidden");
        if(footer.classList.contains("hidden")) footer.classList.remove("hidden");
    }    
}

let cp = () => {
    let currentPath = window.location.pathname,
        name,
        parts = currentPath.split('/');
    if (currentPath.startsWith('/content/') && parts.length >= 3 && parts[2] !== "") {
        name = parts[2];            
    } else {    
        name = "/";
    }
    return name;
}

export {res, contentF};