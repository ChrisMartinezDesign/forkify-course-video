// Parent class
import View from './view.js';

// Used to render the bookmark in the bookmarks tab
import previewView from './previewView';

class BookmarksView extends View {
  //////////////////////
  // Private variables
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it. 🙂`;
  _successMessage = `We found your recipe 🙂`;

  //////////////////////
  // Private functions

  // Generate HTML for the bookmark in the bookmarks tab
  _generateHTML() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join(``);
  }

  ////////
  // API

  // Handles adding the bookmark to the bookmarks tab UI
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

// Connects the View to the Controller
export default new BookmarksView();
