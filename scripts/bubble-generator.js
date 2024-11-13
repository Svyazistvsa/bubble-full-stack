"use strict"

let screen = document.querySelector('#screen'),
    ww = window.innerWidth; 

window.addEventListener("resize", () => winWidth());

function winWidth(){    
    ww = window.innerWidth;
    screen.style.cssText = `width: ${ww}px`;
    
}

screen.addEventListener("animationend", (e) => {    
        if(e.animationName == "ascent") e.target.remove()
    }
)

function generator(){    
    let div = document.createElement('div'),
        bottomPoint = getRandomInt(150, ww-150),
        diametr = getRandomInt(10, 200),
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

  function destroy(){
    let arr = screen.querySelectorAll(".backB");
    for(let i=0; i<arr.length; i++){
        let client = arr[i].getBoundingClientRect();
        if(client.right > ww){
            arr[i].remove();
        }
    }
    
  }  
  
let timerId = setInterval(generator, 500);
