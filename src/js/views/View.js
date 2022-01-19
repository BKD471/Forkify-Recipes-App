import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  //this method  will be common to all the classes
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup); // this method will convert the string into real dom node
    // this behaves like virtual dom  that is not there on the page and we can compare it the dom on page
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      //Updating the changed text
      //prettier-ignore
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        currEl.textContent=newEl.textContent;

      }
      //updating the changed attribute
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner = () => {
    const markup = `
        <div class="spinner">
           <svg>
              <use href="${icons}#icon-loader"></use>
           </svg>
        </div>`;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(messages = this._errorMessage) {
    const markup = `
                    <div class="message">
                      <div>
                          <svg>
                              <use href="${icons}_icon-smile"></use>
                          </svg>
                      </div>
                      <p>${messages}</p>
                    </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(messages = this._message) {
    const markup = `
                    <div class="error">
                      <div>
                          <svg>
                              <use href="${icons}_icon-alert-triangle"></use>
                          </svg>
                      </div>
                      <p>${messages}</p>
                    </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear(markup) {
    this._parentElement.innerHTML = '';
  }
}
