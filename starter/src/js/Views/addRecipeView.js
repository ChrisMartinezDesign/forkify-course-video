// Parent class
import View from './view.js';

import previewView from './previewView';
// import icons from `../img/icons.svg` // Parcel vs. 1
import icons from 'url:../../img/icons.svg'; // Parcel vs. 1

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _successMessage = `Recipe Uploaded Successfully`;

  _window = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _generateHTML() {
    return ``;
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleHiddenClass.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleHiddenClass.bind(this));
    this._overlay.addEventListener(`click`, this.toggleHiddenClass.bind(this));
  }

  ////////
  // API
  toggleHiddenClass() {
    this._overlay.classList.toggle(`hidden`);
    this._window.classList.toggle(`hidden`);
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener(`submit`, function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
