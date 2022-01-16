//This file will contain the logic that is related to view part of MVC
// since view is large, so it will have multiple files
// the way we set up the architecture, the view must not know anything about controllr

//import icons from '../img/icons.svg';// used parcel1
//prettier-ignore
import icons from 'url:../../img/icons.svg'; //for parcel 2

import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage =
    'Sorry We could not find that recipe 😥😥, Please try with something else';
  #message;
  //this method  will be common to all the classes
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner = () => {
    const markup = `
        <div class="spinner">
           <svg>
              <use href="${icons}#icon-loader"></use>
           </svg>
        </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(messages = this.#errorMessage) {
    const markup = `
                    <div class="message">
                      <div>
                          <svg>
                              <use href="${icons}#icon-smile"></use>
                          </svg>
                      </div>
                      <p>${messages}</p>
                    </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(messages = this.#message) {
    const markup = `
                    <div class="error">
                      <div>
                          <svg>
                              <use href="${icons}#icon-alert-triangle"></use>
                          </svg>
                      </div>
                      <p>${messages}</p>
                    </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(events =>
      window.addEventListener(events, handler)
    );
  }
  //this handler argument will be the subscriber func controlRecipes()  passed in as argument from controller

  #clear(markup) {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" crossorigin/>
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
    <div class="recipe__info">
    <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this.#data.cookingTime
    }</span>
    <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
    <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this.#data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
    <svg>
      <use href="${icons}#icon-minus-circle"></use>
    </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
    <svg>
      <use href="${icons}#icon-plus-circle"></use>
    </svg>
    </button>
    </div>
    </div>

    <div class="recipe__user-generated">
    <svg>
    <use href="${icons}#icon-user"></use>
    </svg>
    </div>
    <button class="btn--round">
    <svg class="">
    <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
    </button>
    </div>

    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
     ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
    </ul>
    </div>

    <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
    This Recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      this.#data.publisher
    }</span>. Please check out
    directions at their website.
    </p>
    <a
    class="btn--small recipe__btn"
    href="${this.#data.sourceUrl}"
    target="_blank"
    >
    <span>Directions</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </a>
    </div>`;
  }

  #generateMarkupIngredient(ing) {
    return `
         <li class="recipe__ingredient">
             <svg class="recipe__icon">
               <use href="${icons}#icon-check"></use>
             </svg>
             <div class="recipe__quantity">${
               ing.quantity ? new Fraction(ing.quantity).toString() : ''
             }</div>
             <div class="recipe__description">
               <span class="recipe__unit">${ing.unit}</span> ${ing.description}
             </div>
         </li>`;
  }
}

//here we create the obj and export it
export default new RecipeView();
