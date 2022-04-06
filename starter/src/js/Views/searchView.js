// Parent class
import View from './view.js';

class SearchView extends View {
  _parentEl = document.querySelector(`.search`);

  _clearInput() {
    this._parentEl.querySelector(`.search__field`).value = ``;
  }

  ////////
  // API
  getQuery() {
    const query = this._parentEl.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener(`submit`, function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
