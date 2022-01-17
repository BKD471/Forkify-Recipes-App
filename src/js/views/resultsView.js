import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Recipes found for your query!!🤔🤔🤔';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(res) {
    //prettier-ignore

    return `<li class="preview">
         <a class="preview__link " href="#${res.id}">
            <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}"  crossorigin/>
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
               
              </div>
          </a>
    </li>`;
  }
}

export default new ResultsView();
