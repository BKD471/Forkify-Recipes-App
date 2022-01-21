import icons from 'url:../../img/icons.svg'; //for parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick = handler => {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  };

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //1 we are at page 1 and there are other pages.
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupForNextButton(currentPage);
    //3 last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupForPreviousButton(currentPage);
    //4 other page
    if (currentPage < numPages)
      return [
        this._generateMarkupForNextButton(currentPage),
        this._generateMarkupForPreviousButton(currentPage),
      ].join('');

    //2  we are at page 1 and there are no other pages
    return '';
  }

  _generateMarkupForNextButton(currentPage) {
    return `  <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
                      <span>Page ${currentPage + 1}</span>
                      <svg class="search__icon">
                          <use href="${icons}#icon-arrow-right"></use>
                      </svg>
                </button>`;
  }

  _generateMarkupForPreviousButton(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }"  class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                      <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${currentPage - 1}</span>
            </button>`;
  }
}

export default new PaginationView();
