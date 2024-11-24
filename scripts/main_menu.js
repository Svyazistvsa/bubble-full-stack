"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const butMenu = document.getElementById("mainMenu");
    const mainMenu = document.querySelector('.mainMenu');

    butMenu.addEventListener("pointerdown", async (e) => {
        let arrMenu = await loadMenu();

        // Удаляем старые элементы перед добавлением новых
        mainMenu.innerHTML = '';

        // Добавляем новые элементы
        arrMenu.forEach(element => {
            const li = document.createElement('li'); // Создаем новый элемент li
            li.innerHTML = element; // Заполняем его содержимым
            mainMenu.append(li); // Добавляем в mainMenu
        });
    });

    async function loadMenu() {
        let response = await fetch('https://localhost:3000?menu=menu', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            let content = await response.json(); // Получаем JSON-ответ
            return content; // Возвращаем массив
        } else {
            console.log("Error download");
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }
});