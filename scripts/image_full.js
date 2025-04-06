"use strict"

let main = document.querySelector("main"),
        allScreen = document.querySelector("body");

document.addEventListener("newContent", () => {    
    main.removeEventListener("pointerdown", full);
    main.addEventListener("pointerdown", full);
})

let full = (e) =>{
    allScreen.addEventListener("pointermove", () => {return})
    let target = e.target;
    if(target.tagName == "IMG"){
        let imgScreen = document.createElement("DIV"),
            clone = target.cloneNode(true);
        
        imgScreen.classList.add("fullImg");
        imgScreen.append(clone);
        allScreen.prepend(imgScreen);
        for(let i of clone.classList){
            clone.classList.remove(i);
        }
        imgScreen.addEventListener("pointerdown", () => {
            imgScreen.remove();                
        })
    }
}