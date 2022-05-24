// Parent class
import View from './view.js';

// Used to render the recipe preview
import previewView from './previewView';

class ResultsView extends View {
  //////////////////////
  // Private variables
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipes found for your query. Please try again. 🙂`;
  _successMessage = `We found your recipe 🙂`;

  //////////////////////
  // Private functions

  // Generates HTML for recipe previews from search results
  _generateHTML() {
    return this._data.map(recipe => previewView.render(recipe, false)).join(``);
  }
}

// Connects the View to the Controller
export default new ResultsView();
