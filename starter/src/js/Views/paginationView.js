// Parent class
import View from './view.js';

// Parcel vs. 1
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  //////////////////////
  // Private variables
  _parentEl = document.querySelector('.pagination');

  //////////////////////
  // Private functions

  // Generates HTML for the paginated pages
  _generateHTML() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      (this._data.results.length + 1) / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // Last page
    if (currentPage === numPages)
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
        </button>
        `;

    // Other page
    if (currentPage < numPages)
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;

    // Page 1, and there are NO other pages
    return ``;
  }

  // Handles when the user clicks a pagination button
  addHandlerClick(handler) {
    this._parentEl.addEventListener(`click`, function (event) {
      const btn = event.target.closest(`.btn--inline`);

      if (!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }
}

// Connects the View to the Controller
export default new PaginationView();
