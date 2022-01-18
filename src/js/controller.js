//This file will contain the logic that is related to controller part of MVC
////////////////////////////////

//this will import everything from model
import * as model from './model.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchViews.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
///////////////////////////////////////

//enabling hot module reloading
if (module.hot) {
  module.hot.accept();
}

// for loading the recipe
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1 Loading Recipe
    await model.loadRecipe(id); // this is async func so lets wait, it wont return but it will mutate the state object in model

    //2 Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

// for fetching the query from searchbar
const controlSearchResults = async () => {
  try {
    //Get serach query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //2 load the results
    await model.loadSearchResults(query); // doesnot return , mutates the state only

    //3 render results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4 render pagination page number
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = goToPage => {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new pagination btn
  paginationView.render(model.state.search);
};

const controlServings = changedValve => {
  //Update the recipe servings in state
  let updatedServings = changedValve;
  // valve === 1
  //   ? (updatedServings = model.state.recipe.servings + 1)
  //   : (updatedServings = model.state.recipe.servings - 1);
  // if (updatedServings <= 0) return;

  model.updateServings(updatedServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // updates only text and attributes in the dom without again rendering entire view
};

// window.addEventListener('hashchange',  controlRecipes);
// window.addEventListener('load', controlRecipes);

// This is the logic part of publisher subscriber
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();

//NOTE: events should be handled in controller otherwise, we'll have application logic in view
//NOTE: events should be listend in the view, otherwise we'll need dom elements in controller
// In publisher subscriber model, we've a publisher addHandlerRender(), which has some code that knows when to react to event in View,
// we also have a subscriber in controller that has some code controlRecipes() that wants to react, although publisher doesnt know about subscriber   present in controller
// we now can subscribe to the publisher by passing in the subscriber func as argument
// as soon as prgm loads, init() is called which calls addHandlerRender() with argument controlRecipes passed as argument in view
// This is how we implement event handlers and lsiteners in MVC

// A()-> B    here func A calls func B, so A has all the control
// b----> A(X) ->X   , func A receives func B as input and calls it's input func, here func A has no control on whom its calling, it will call anything , it receives as input
