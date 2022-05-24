// Parcel vs. 1
import icons from 'url:../../img/icons.svg';

// Parent class
export default class View {
  //////////////////////
  // Private variables
  _data;

  //////////////////////
  // Private functions

  // Clears the HTML from the parent container
  _clearContainer() {
    this._parentEl.innerHTML = '';
  }

  ////////
  // API

  // Renders the spinner while content is loading
  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Render a given error for the class calling this function
  renderError(message = this._errorMessage) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Render a given message for the class calling this function
  renderMessage(message = this._successMessage) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Render the given HTML from the class calling this function
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();

    // Return HTML for PreviewView and ResultsView
    if (!render) return html;

    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  // Update the UI within a given container
  update(data) {
    this._data = data;
    const newHTML = this._generateHTML();

    // Creates a virtual DOM which exists in memory
    const newDOM = document.createRange().createContextualFragment(newHTML);
    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const currentElements = Array.from(this._parentEl.querySelectorAll(`*`));

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];

      // Updates changed texts
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // Updates change attributes
      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attribute => {
          currentEl.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
}
