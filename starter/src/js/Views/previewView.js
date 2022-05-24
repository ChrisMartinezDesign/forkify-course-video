// Parent class
import View from './view.js';

// Parcel vs. 1
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  //////////////////////
  // Private variables
  _parentEl = ``;

  //////////////////////
  // Private functions

  // Generates HTML for a preview of each recipe that returns from the user's search results
  _generateHTML() {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? `preview__link--active` : ``
        }" href="#${this._data.id}">
        <figure class="preview__fig">
            <img src="${this._data.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
        </div>
        </a>
    </li>
  `;
  }
}

// Connects the View to the Controller
export default new PreviewView();
