

"use strict";
class NavigationManager {
  constructor() {
    // Ссылки на основные DOM-элементы
    this.main = document.querySelector("main");
    this.subMenu = document.querySelector("#subMenu");
    // Отключаем автоматическое восстановление позиции прокрутки браузером
    history.scrollRestoration = "manual";
    // Инициализация прослушивателей событий
    this.setupEventListeners();
    // Обновляем состояние прокрутки при её изменении
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }
  setupEventListeners() {
    // При изменении истории (кнопки «Назад/Вперёд»)
    window.addEventListener("popstate", this.handlePopState.bind(this));
    // При клике по элементам навигации
    document.addEventListener("pointerdown", this.handlePointerDown.bind(this)
    );
  }
  async handlePopState(e) {
    if (e.state) {
      if (e.state.name === "main") {
        await this.restoreMainContent();
      } else {
        await this.loadContent(e.state.name);
      }
    }
    this.restoreScroll();
  }
  async handlePointerDown(e) {
    if (e.target.hasAttribute("data-name")) {
      // Обработка клика по элементу навигации, у которого есть data-name
      const name = e.target.dataset.name;
      this.saveCurrentState();
      await this.loadContent(name);
      window.scrollTo(0, 0);
    } else if (e.target.classList.contains("main_content")) {
      // Обработка перехода на главную (например, при клике по логотипу)
      this.saveCurrentState();
      await this.restoreMainContent();
      window.scrollTo(0, 0);
    }
  }
  async loadContent(name) {
    try {
      const response = await fetch("/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const newDocument = await response.text();
      this.main.innerHTML = newDocument;
      // Обновляем состояние истории без сброса scroll
      this.updateState(name);
      if (this.subMenu.classList.contains("hidden")) {
        this.subMenu.classList.remove("hidden");
      }
      // Диспатчим событие, чтобы другие части приложения знали о подгрузке контента  
      this.notifyContentUpdate();
    } catch (error) {
      console.error("Ошибка при загрузке контента:", error);
    }
  }
  async restoreMainContent() {
    try {
      const response = await fetch(`/?main=main`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const contentArray = await response.json();
      this.main.innerHTML = "";
      contentArray.forEach((item) => {
        this.main.innerHTML += item;
      });
      // Обновляем историю для главной страницы
      this.updateState("main");
      this.subMenu.classList.add("hidden");
      const subUl = document.querySelector(".subUl");
      if (subUl) subUl.classList.add("hidden");
    } catch (error) {
      console.error("Ошибка при восстановлении контента:", error);
    }
  }
  updateState(name) {
    const path = name === "main" ? "/" : `/content/${name}/`;
    history.replaceState(
      {
        name,
        scroll: { x: window.scrollX, y: window.scrollY },
        path,
      },
      "",
      path
    );
  }
  restoreScroll() {
    const state = history.state || {};
    if (state.scroll) {
      window.scrollTo(state.scroll.x, state.scroll.y);
    }
  }
  saveCurrentState() {
    const currentPath = window.location.pathname;
    history.pushState(
      {
        name: this.getPathName(),
        scroll: { x: window.scrollX, y: window.scrollY },
        path: currentPath,
      },
      "",
      currentPath
    );
  }
  handleScroll() {
    // Обновляем текущий объект состояния с актуальной позицией прокрутки
    const state = history.state;
    if (state && state.scroll) {
      state.scroll = { x: window.scrollX, y: window.scrollY };
      history.replaceState(state, "", state.path);
    }
  }
  notifyContentUpdate() {
    // Функция диспатчит событие, чтобы сообщить другим модулям о подгрузке нового контента
    document.dispatchEvent(new CustomEvent("newContent", { bubbles: true }));
  }
  getPathName() {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    if (currentPath.startsWith("/content/") && parts.length >= 3 && parts[2] !== "") {
      return parts[2];
    }
    return "main";
  }
}
// Инициализируем навигационный менеджер
const navigationManager = new NavigationManager();
// Экспортируем функции для обратной совместимости (если используется в других модулях)
export const { loadContent: contentF, restoreMainContent: res } = navigationManager;