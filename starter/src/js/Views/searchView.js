// Parent class
import View from './view.js';

class SearchView extends View {
  //////////////////////
  // Private variables
  _parentEl = document.querySelector(`.search`);

  //////////////////////
  // Private functions

  // Clears the search field once the user has submitted their request
  _clearInput() {
    this._parentEl.querySelector(`.search__field`).value = ``;
  }

  ////////
  // API

  // Gets the user's search request from the search field UI
  getQuery() {
    const query = this._parentEl.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }

  // Handles the user's search request
  addHandlerSearch(handler) {
    this._parentEl.addEventListener(`submit`, function (event) {
      event.preventDefault();
      handler();
    });
  }
}

// Connects the View to the Controller
export default new SearchView();
