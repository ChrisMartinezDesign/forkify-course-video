import * as model from './model.js';
import { MODAL_CLOSE_SECONDS } from './config.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsVew from './Views/resultsView.js';
import paginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Dev control - maintains state between reloads
if (module.hot) {
  module.hot.accept();
}

/////////////
// Elements
const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////////
// Forkify API Link
// https://forkify-api.herokuapp.com/v2

/////////////////////////
// Controller functions

// Controls the current recipe, recipe results, and bookmarked recipes' View
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsVew.update(model.getSearchResultsPage());

    // Update bookmarksView
    bookmarksView.update(model.state.bookmarks);

    // 1. Load Recipe
    // 'loadRecipe()' will return a promise which must be handled
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2. Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(``);
  }
};

// Controls the search results through the Model
const controlSearchResults = async function () {
  try {
    resultsVew.renderSpinner();

    // 1. Get search results
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsVew.render(model.getSearchResultsPage());

    // 4. Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultsVew.renderError(error);
  }
};

// Controls the pagination of the search results
const controlPagination = function (goto) {
  // 1. Render NEW results
  resultsVew.render(model.getSearchResultsPage(goto));

  // 2. Render pagination buttons
  paginationView.render(model.state.search);
};

// Controls the recipe's ingredients quantity based on the serving size
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

// Controls adding a bookmark
const controlAddBookmark = function () {
  // 1. Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2. Update the recipeView
  recipeView.update(model.state.recipe);

  // 3. Update the boomarksView
  bookmarksView.render(model.state.bookmarks);
};

// Controls rendering each bookmark, if any
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// Controls adding a recipe
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderSuccessMessage();

    // Render the bookmarkView
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, ``, `#${model.state.recipe.id}`);
    // window.history.back();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleHiddenClass();
      addRecipeView.clearInputFields();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (error) {
    console.error(`🔥`, error);
    addRecipeView.renderError(error);
  }
};

// Welcomes a dev to the application
const welcome = function () {
  console.log(`Welcome to the application!`);
};

// Initializes the application
const init = function () {
  // Publisher/subscriber pattern
  // - addHandlerRender() - Publisher
  // - controlRecipes() - Subscriber
  welcome();
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
