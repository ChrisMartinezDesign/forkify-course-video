// Parent class
import View from './view.js';

// Parcel vs. 1
import icons from 'url:../../img/icons.svg';

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
    if (
      this._parentEl
        .querySelector('.upload__column')
        .classList.contains('hidden')
    )
      this._parentEl
        .querySelectorAll('.upload__column')
        .forEach(column => (column.style.display = 'grid'));
    if (
      document.querySelector('.error') &&
      document.querySelector('.spinner')
    ) {
      document.querySelector('.spinner').classList.add(`hidden`);
      document.querySelector('.error').classList.add(`hidden`);
    }
  }

  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._parentEl
      .querySelectorAll('.upload__column')
      .forEach(column => (column.style.display = 'none'));
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Displays success message
  renderSuccessMessage() {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${this._successMessage}</p>
      </div>`;
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Clears input fields after the user submits a recipe
  clearInputFields() {
    this._parentEl
      .querySelectorAll('input')
      .forEach(input => (input.value = ''));
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
