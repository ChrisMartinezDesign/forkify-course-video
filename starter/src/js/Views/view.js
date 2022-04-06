// import icons from `../img/icons.svg` // Parcel vs. 1
import icons from 'url:../../img/icons.svg'; // Parcel vs. 1

export default class View {
  _data;

  _clearContainer() {
    this._parentEl.innerHTML = '';
  }

  ////////
  // API
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

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {Boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View instance
   * @author Chris Martinez
   * @todo Finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();

    // Return html for PreviewView and ResultsVies
    if (!render) return html;

    this._clearContainer();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

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
