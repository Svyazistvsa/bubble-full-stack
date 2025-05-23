"use strict"

window.history.scrollRestoration = "manual";

let main = document.getElementsByTagName("main")[0],
    subMenu = document.querySelector("#subMenu"),
    scrollP = 0;

let scrollE = () => {     
    scrollP = window.scrollY;;
    history.replaceState({name: cp(), scroll: scrollP, path: window.location.pathname},"",window.location.pathname);
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
        switch(e.state.name){
            case 'relax':
                relaxWork("y");
                break;
            case 'main':                
                await res("y");                
                break;
            default:                             
                await contentF(e.state.name, "y");                
        }
        window.scrollTo(0, e.state.scroll);      
    }
});

document.addEventListener("pointerup", async (e) => {   
    let target = e.target;

    if(target.classList.contains("mm"||"zag")) target = target.parentElement;
    if(target.hasAttribute("data-name")){
        let name = target.dataset.name;
        await contentF(name);
    }
    if(target.classList.contains("main_content")){
        await res();        
    }
    if(target.classList.contains("relax")){
        relaxWork();   
    }
});

let relaxWork = (pop) => {
    if(pop == "y"){
        hid("yes");
        window.scrollTo(0,0);
    } else {
        history.pushState({ name: "relax", scroll: +`${scrollP}`, path: "/relax" }, "", "/relax");
        hid("yes");
        window.scrollTo(0,0);    
    }
    document.body.style.overflow = "hidden";
}

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
            history.replaceState({name: cp(), scroll: scrollP, path: window.location.pathname},"",window.location.pathname);
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
    document.body.style.overflow = "auto";
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
            history.replaceState({name: cp(), scroll: scrollP, path: window.location.pathname},"",window.location.pathname);
        });
        } else {
            history.pushState({name: "main", path: "/"}, "", "/");
            let content = await response.json();
            main.innerHTML = "";
            content.forEach((item) => {
            main.innerHTML +=item;
        });
        window.scrollTo(0, 0); 
        }        
        subMenu.classList.add("hidden");
        if(document.querySelector(".subUl")) {document.querySelector(".subUl").classList.add("hidden")};
        
    } else {
        console.error("Error download");
    }
    document.body.style.overflow = "auto";
}

let hid = (question) =>{
    let page,mobMenu,subUl,
        footer = document.querySelector("footer");

    if(document.querySelector("#desctop")) {
        subUl = undefined;
        mobMenu = undefined;    
        page = document.querySelector("#page");
    }
    if(document.querySelector("#mobile")) {
        page = main;
        subUl = document.querySelector(".subUl");
        mobMenu = document.querySelector("#subMenu");
    }

    if(question == "yes"){
        page.classList.add("hidden");
        footer.classList.add("hidden");
        if(mobMenu) mobMenu.classList.add("hidden");
        if(subUl) subUl.classList.add("hidden");
    } 
    if(question == "no") {
        if(page.classList.contains("hidden")) page.classList.remove("hidden");
        if(footer.classList.contains("hidden")) footer.classList.remove("hidden");
        if( mobMenu && mobMenu.classList.contains("hidden")) mobMenu.classList.add("hidden");
        if( subUl && subUl.classList.contains("hidden")) subUl.classList.add("hidden");

    }    
}

let cp = () => {
    let currentPath = window.location.pathname,
        name,
        parts = currentPath.split('/');
    if (currentPath.startsWith('/content/') && parts[2] !== "") {
        name = parts[2];            
    }else if (currentPath.startsWith('/relax')) {
        name = "relax";
    } else {    
        name = "main";
    }
    return name;
}

export {res, contentF, hid, relaxWork, scrollP};