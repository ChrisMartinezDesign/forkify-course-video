// Parent class
import View from './view.js';

import previewView from './previewView';
// import icons from `../img/icons.svg` // Parcel vs. 1
import icons from 'url:../../img/icons.svg'; // Parcel vs. 1

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipes found for your query. Please try again. 🙂`;
  _successMessage = `We found your recipe 🙂`;

  _generateHTML() {
    return this._data.map(recipe => previewView.render(recipe, false)).join(``);
  }
}

export default new ResultsView();
