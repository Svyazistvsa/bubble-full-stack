"use strict"

window.history.scrollRestoration = "manual";

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu"),
    scrollP = 0;

let scrollE = () => {     
    scrollP = window.scrollY;;
    console.log(scrollP);
    history.replaceState({name: cp(), scroll: +`${scrollP}`, path: window.location.pathname},"",window.location.pathname);
}

let throttle = (callee, timeout) => {
    let timer = null;
    return function perform(...arg){
        if(timer) return;
        timer = setTimeout(() => {
            callee(...arg);
            timer = null;
        }, timeout);
    }
}

let scrollET = throttle(scrollE, 100);

window.addEventListener("scroll", scrollET);

window.addEventListener("popstate", async(e) => { 
    if (e.state) {
          console.log(e.state.scroll+" and "+scrollP+" length "+history.length );
        switch(e.state.name){
            case 'main':                
                await res("y");                
                break;
            case 'relax':
                hid("yes");
                break;
            default:                             
                await contentF(e.state.name, "y");                
        }
        window.scrollTo(0, e.state.scroll);      
    }
});

document.addEventListener("pointerdown", async (e) => {   
    if(e.target.hasAttribute("data-name")){
        let name = e.target.dataset.name;
        await contentF(name);
    }
    if(e.target.classList.contains("main_content")){
        await res();        
    }
    if(e.target.classList.contains("relax")){
        hid("yes");
        history.pushState({ name: "relax", scroll: +`${scrollP}`, path: "/relax" }, "", "/relax");        
    }
});

let contentF = async (name, pop) => {
    let response = await fetch("/content", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name : name}),
    });

    if (response.ok) {
        hid("no");
        if (pop == "y"){
            const newDocument = await response.text();
            main.innerHTML = newDocument;
        }else{
            history.pushState({name: name, path: "/content/" + name + "/"}, "", "/content/" + name + "/");
            const newDocument = await response.text();
            main.innerHTML = newDocument;
            window.scrollTo(0, 0);
        }        
        if(subMenu.classList.contains("hidden")) subMenu.classList.remove("hidden");
        document.dispatchEvent(new CustomEvent("newContent", {bubbles:true}));
    } else {
        console.error('Ошибка при отправке запроса:', response.status);
    }
}

let res = async (pop) =>{
    let response = await fetch(`/?main=main`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        hid("no");
        if (pop == "y"){
            let content = await response.json();
            main.innerHTML = "";
            content.forEach((item) => {
            main.innerHTML +=item;
        });
        }else{
            history.pushState({name: "main", path: "/"}, "", "/");
            let content = await response.json();
            main.innerHTML = "";
            content.forEach((item) => {
            main.innerHTML +=item;
            window.scrollTo(0, 0);
            
        });
        }        
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
        name = "main";
    }
    return name;
}

export {res, contentF, hid, scrollP};