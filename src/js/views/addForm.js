import icons from 'url:../../img/icons.svg'; //for parcel 2
import View from './View.js';
class AddForm {
  _frmEl = document.querySelector('.upload');
  _rl = document.querySelector('.message');
  formAdder() {
    const markup = `<div class="upload__column">
  <h3 class="upload__heading">Recipe data</h3>
  <label>Title</label>
  <input value="TEST23" required name="title" type="text" />
  <label>URL</label>
  <input value="TEST23" required name="sourceUrl" type="text" />
  <label>Image URL</label>
  <input value="TEST23" required name="image" type="text" />
  <label>Publisher</label>
  <input value="TEST23" required name="publisher" type="text" />
  <label>Prep time</label>
  <input value="23" required name="cookingTime" type="number" />
  <label>Servings</label>
  <input value="23" required name="servings" type="number" />
</div>

<div class="upload__column">
  <h3 class="upload__heading">Ingredients</h3>
  <label>Ingredient 1</label>
  <input
    value="0.5,kg,Rice"
    type="text"
    required
    name="ingredient-1"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 2</label>
  <input
    value="1,,Avocado"
    type="text"
    name="ingredient-2"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 3</label>
  <input
    value=",,salt"
    type="text"
    name="ingredient-3"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 4</label>
  <input
    type="text"
    name="ingredient-4"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 5</label>
  <input
    type="text"
    name="ingredient-5"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
  <label>Ingredient 6</label>
  <input
    type="text"
    name="ingredient-6"
    placeholder="Format: 'Quantity,Unit,Description'"
  />
</div>

<button class="btn upload__btn">
  <svg>
    <use href="src/img/icons.svg#icon-upload-cloud"></use>
  </svg>
  <span>Upload</span>
</button>`;
    this._frmEl.insertAdjacentHTML('afterbegin', markup);

    if (this._frmEl) {
      // console.log(this._rl);

      this._frmEl.childNodes[6].remove();
      //this._rl.remove();
      // this._frmEl.removeChild(this._frmEl.lastChild);
    }
  }
}

export default new AddForm();
