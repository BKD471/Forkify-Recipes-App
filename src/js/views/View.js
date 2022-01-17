import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  //this method  will be common to all the classes
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
