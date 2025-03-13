"use strict"

history.scrollRestoration = "manual";

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu"),
    scrollPosition = undefined;

window.addEventListener("popstate", async(e) => {
    if (e.state) {
        switch(e.state.name){
            case 'main':                
                await res();
                break;
            default:               
                await contentF(e.state.name);
        }
        scrollP(e);
    }
    })

document.addEventListener("pointerdown", async (e) => {   
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        scrollPosition = { x: window.scrollX, y: window.scrollY };
        history.pushState({name: cp(), scrollPosition, path:window.location.pathname }, "", window.location.pathname);
        await contentF(name);
        scrollP(e);               
    }
    if(e.target.classList.contains("main_content")){
        scrollPosition = { x: window.scrollX, y: window.scrollY };
        history.pushState({name: cp(), scrollPosition, path:"/"},"", "/");
        await res();
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
        //scrollPosition = { x: 0, y: 0 };
        history.replaceState({name: name, path: "/content/" + name + "/"}, "", "/content/" + name + "/");
        if(subMenu.classList.contains("hidden")) subMenu.classList.remove("hidden");
        document.dispatchEvent(new CustomEvent("newContent", {bubbles:true}));        
    } else {
        console.error('Ошибка при отправке запроса:', response.status);
    }
}

let res = async () =>{
    let response = await fetch(`${cp()}?main=main`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        let content = await response.json();
        main.innerHTML = "";
        content.forEach((item) => {
            main.innerHTML +=item;
        })
        //scrollPosition = { x: 0, y: 0 };
        history.replaceState({name: "main", path: "/"}, "", "/");
        subMenu.classList.add("hidden");
        if(document.querySelector(".subUl")) {document.querySelector(".subUl").classList.add("hidden")};
    } else {
        console.log("Error download");
    }        
}

let scrollP = (e) => {
    if (e.state && e.state.scrollPosition) {
        const { x, y } = e.state.scrollPosition;
        window.scrollTo(x, y);
      } else {
        window.scrollTo(0, 0); 
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