// Imports
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
import { async } from 'regenerator-runtime';

// Maintains state between reload
// if (module.hot) {
//   module.hot.accept();
// }
console.log('TEST');

// Elements
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

const controlPagination = function (goto) {
  // 1. Render NEW results
  resultsVew.render(model.getSearchResultsPage(goto));

  // 2. Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servigs (in state)
  model.updateServings(newServings);

  // UPdate the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2. Update the recipeView
  recipeView.update(model.state.recipe);

  // 3. Update the boomarksView
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderMessage();

    // Render the bookmarkView
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, ``, `#${model.state.recipe.id}`);
    // window.history.back();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleHiddenClass();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (error) {
    console.error(`🔥`, error);
    addRecipeView.renderError(error);
  }
};

const newFeature = function () {
  console.log(`Welcome to the application!`);
};

const init = function () {
  // Publichser/subscriber pattern
  // - addHandlerRender() - Publisher
  // - controlRecipes() - Subscriber
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
