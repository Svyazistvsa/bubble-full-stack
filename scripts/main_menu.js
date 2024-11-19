async function loadMenu () {
    let response = await fetch('https://localhost:3000',{
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({menu:'menu'}),
    });
    
    if(response.ok){
        let nav = document.querySelector('nav');
        let content = await response.json();
        nav.innerHTML = content;
    }
}