//This file will contain the logic that is related to view part of MVC
// since view is large, so it will have multiple files
// the way we set up the architecture, the view must not know anything about controllr

//import icons from '../img/icons.svg';// used parcel1
//prettier-ignore
import icons from 'url:../../img/icons.svg'; //for parcel 2
import View from './View.js';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage =
    'Sorry We could not find that recipe 😥😥, Please try with something else';
  _message;

  //this handler argument will be the subscriber func controlRecipes()  passed in as argument from controller
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(events =>
      window.addEventListener(events, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', event => {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;

      // My approach
      // const clickedButtonValue = btn.classList.contains(
      //   'btn--increase-servings'
      // )
      //   ? 1
      //   : 0;
      // handler(clickedButtonValue);

      //Js approach (best one)
      const updateTo = btn.dataset.updateTo; // const {updateTo}=btn.dataset
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" crossorigin/>
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
    <div class="recipe__info">
    <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this._data.cookingTime
    }</span>
    <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
    <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
    <button class="btn--tiny  btn--decrease-servings  btn--update-servings" data-update-to="${
      this._data.servings - 1
    }" >
    <svg>
      <use href="${icons}#icon-minus-circle"></use>
    </svg>
    </button>
    <button class="btn--tiny btn--increase-servings btn--update-servings" data-update-to="${
      this._data.servings + 1
    }">
    <svg>
      <use href="${icons}#icon-plus-circle"></use>
    </svg>
    </button>
    </div>
    </div>

    <div class="recipe__user-generated">
   
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
     ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
    </ul>
    </div>

    <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
    This Recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      this._data.publisher
    }</span>. Please check out
    directions at their website.
    </p>
    <a
    class="btn--small recipe__btn"
    href="${this._data.sourceUrl}"
    target="_blank"
    >
    <span>Directions</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </a>
    </div>`;
  }

  _generateMarkupIngredient(ing) {
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
