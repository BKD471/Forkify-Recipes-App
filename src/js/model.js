//This file will contain the logic that is related to model part of MVC

// add polyfills for es6 features
import 'core-js/stable'; // for polyfilling everything general
import 'regenerator-runtime/runtime'; // for polyfilling async await
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

//This function will just change the state obj which will contain recipe
// from which controller will grab and take out recipe from here and render it on view
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    // formatting the recipe object of state in model
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    )
      ? true
      : false;
  } catch (error) {
    console.error(`${error} `);

    throw error; // throw so that it propagates to controller
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    //data.data.recipes  is the array which contains all recipe objects related to searched query
    // lets loop over all recipes and format them  and return this formatted object and store them in our search{} state
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // new qty=(old qty * newServings)/oldServngs
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = recipe => {
  //Add Bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  //if (recipe.id === state.recipe.id)
  state.recipe.bookmarked = true;

  //add bookmarks to storage
  persistBookmarks();
};

export const deleteBookmark = id => {
  //delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as not bookmarked
  //if (id === state.recipe.id)
  state.recipe.bookmarked = false;

  //remove bookmarks from storage
  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};

//clearBookmarks();
