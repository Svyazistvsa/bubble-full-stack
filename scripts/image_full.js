"use strict"

document.addEventListener("newContent", () => {
    let main = document.querySelector("main"),
        allScreen = document.querySelector("#all");
    
    main.addEventListener("pointerdown", (e) =>{
        let target = e.target;
        if(target.tagName == "IMG"){
            let imgScreen = document.createElement("DIV"),
                clone = target.cloneNode(true);
            
            imgScreen.classList.add("fullImg");
            imgScreen.append(clone);
            allScreen.append(imgScreen);
            for(let i of clone.classList){
                clone.classList.remove(i);
            }
            imgScreen.addEventListener("pointerdown", () => {
                imgScreen.remove();
            })
        }
    })

})
