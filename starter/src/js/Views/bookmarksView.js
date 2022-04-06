// Parent class
import View from './view.js';

import previewView from './previewView';
// import icons from 'url:../../img/icons.svg'; // Parcel vs. 1
import icons from 'url:../../img/icons.svg'; // Parcel vs. 2

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it. 🙂`;
  _successMessage = `We found your recipe 🙂`;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTML() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join(``);
  }
}

export default new BookmarksView();
