"use strict"

document.addEventListener("newContent", () => {
    let main = document.querySelector("main"),
        allScreen = document.querySelector("#all");
        alert(allScreen);
    
    main.addEventListener("pointerdown", (e) =>{
        let target = e.target;
        if(target.tagName == "IMG"){
            let imgScreen = document.createElement("DIV");
            imgScreen.classList.add("fullImg");
            imgScreen.append(target.cloneNode(true));
            allScreen.append(imgScreen);
            imgScreen.addEventListener("pointerdown", () => {
                imgScreen.remove();
            })
        }
    })

})
