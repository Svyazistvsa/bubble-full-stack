"use strict"

const content = document.getElementsByTagName("main")[0];


document.addEventListener("newContent", () => {
    let head = content.querySelectorAll("h1,h3,h4");
    alert(`${head[0].innerHTML}`);    
})



