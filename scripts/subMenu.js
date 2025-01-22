"use strict"

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
let ul = document.createElement("ul");

document.addEventListener("newContent", () => {
    let heads = content.querySelectorAll("h1");
    heads.forEach((item, index, array) => {
        let li = document.createElement("li");
        li.innerHTML = item.innerHTML;
        ul.append(li);
        aside.append(ul);
    })
    
})



