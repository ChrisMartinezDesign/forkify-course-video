// Parent class
import View from './view.js';

class AddRecipeView extends View {
  //////////////////////
  // Private variables
  _parentEl = document.querySelector('.upload');
  _successMessage = `Recipe Uploaded Successfully`;

  _window = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  // Adds handlers to show and hide the 'add recipe' popup when an instance of the class is created
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  //////////////////////
  // Private functions

  // No need to generate HTML because it is written in index.html with the hidden class on page load
  _generateHTML() {
    return ``;
  }

  // Handles showing the 'add recipe' popup
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleHiddenClass.bind(this));
  }

  // Handles hiding the 'add recipe' popup
  _addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleHiddenClass.bind(this));
    this._overlay.addEventListener(`click`, this.toggleHiddenClass.bind(this));
  }

  ////////
  // API

  // Toggles the hidden class
  toggleHiddenClass() {
    this._overlay.classList.toggle(`hidden`);
    this._window.classList.toggle(`hidden`);
  }

  // Handles sending the data to the Model to upload to the Forkify API
  addHandlerUpload(handler) {
    this._parentEl.addEventListener(`submit`, function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

// Connects the View to the Controller
export default new AddRecipeView();
