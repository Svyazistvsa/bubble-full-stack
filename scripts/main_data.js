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
        let name = e.target.dataset.name;
        history.replaceState({ name: cp(), scroll: { x: window.scrollX, y: window.scrollY }, path:window.location.pathname }, "", window.location.pathname);        
        await contentF(name);        
        window.scrollTo(0, 0);        
    }
    if(e.target.classList.contains("main_content")){
        history.replaceState({ name: cp(), scroll: { x: window.scrollX, y: window.scrollY }, path:window.location.pathname }, "", window.location.pathname);
        await res();        
        window.scrollTo(0, 0);
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
        history.pushState({name: name, scroll: { x: window.scrollX, y: window.scrollY}, path: "/content/" + name + "/"}, "", "/content/" + name + "/");
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
        history.poshState({name: "main", scroll: { x: window.scrollX, y: window.scrollY}, path: "/"}, "", "/");
        subMenu.classList.add("hidden");
        if(document.querySelector(".subUl")) {document.querySelector(".subUl").classList.add("hidden")};
    } else {
        console.log("Error download");
    }        
}

//let scrollP = (e) => {
//    const state = history.state || {};
//    
//  if (state.scroll &&  state.scroll.y !== 0) {
//    alert(state.scroll.y);
//   const { x, y } = state.scroll;
//   window.scrollTo(x, y);
//  } if (e == 'zero'){
//    alert('zero');
//   window.scrollTo(0, 0);
//  }
//};

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