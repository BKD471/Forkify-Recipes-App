class SearchViews {
  #parentElement = document.querySelector('.search');
  //#btnEl = document.querySelector('.btn');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault(); // to prevent reloading the page
      handler();
    }); // we attach to formbutton because it will work for both hitting submit search button or hitting enter
  }
}

export default new SearchViews();
