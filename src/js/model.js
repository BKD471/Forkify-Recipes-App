//This file will contain the logic that is related to model part of MVC

// add polyfills for es6 features
import 'core-js/stable'; // for polyfilling everything general
import 'regenerator-runtime/runtime'; // for polyfilling async await
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
  bookmarks: {},
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
  } catch (error) {
    throw error;
  }
};
