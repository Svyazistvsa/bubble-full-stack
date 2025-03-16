"use strict"

let screen = document.querySelector('#screen'),
    ww = window.innerWidth,
    pudding, diam;

let bubble = (ww) =>{
    if(ww <= 450){
        pudding = 20;
        diam = 100;
    } else {
        pudding = 100;
        diam = 200;
    }    
}

bubble(ww);

window.addEventListener("resize", () => winWidth());

function winWidth(){    
    ww = window.innerWidth;
    screen.style.cssText = `width: ${ww}px`;
    bubble(ww);
}

screen.addEventListener("animationend", (e) => {    
        if(e.animationName == "ascent") e.target.remove()
    }
)

function generator(){    
    let div = document.createElement('div'),
        bottomPoint = getRandomInt(pudding, ww-(pudding)),
        diametr = getRandomInt(10, diam),
        zIndex = getRandomInt(0.0001, 0.01);
    div.classList.add('backB');
    div.style.cssText += `
        translate(-${zIndex}px);
        --castomD: ${diametr}px;
        --castomL: ${bottomPoint}px;
        `
    ;
    screen.append(div);    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
let timerId = setInterval(generator, 500);
