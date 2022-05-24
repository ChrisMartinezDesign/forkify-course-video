import { API_URL, RESULTS_PER_PAGE, DEV_KEY } from './config.js';
import { AJAX } from './helpers.js';

//////////
// State

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

//////////////////////
// Private functions

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: 2,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

////////
// API

// Generates a recipe object for the current recipe and checks if it is bookmarked
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${DEV_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.error(`${error} 🔥`);
    throw error;
  }
};

// Gets all pertinent information from each recipe returned from the Forkify API
export const loadSearchResults = async function (query) {
  try {
    state.search.page = 1;

    const data = await AJAX(`${API_URL}?search=${query}&key=${DEV_KEY}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

// Determines the number of search result pages for the recipe results View UI
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

// Updates the ingredients quantity based on the serving size
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// Saves the bookmarks to local storage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Adds a bookmark to the bookmarks state
export const addBookmark = function (recipe) {
  // Add recipe to the bookmark array in the state object
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

// Removes a bookmark to the bookmarks state
export const removeBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

// Initialize the bookmarks state from local storage
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// Dev control - clear all bookmarks
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// Uploads the user defined recipe to the Forkify API
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith(`ingredient`) && entry[1] !== ``)
      .map(ing => {
        const ingArr = ing[1].split(`,`).map(ing => ing.trim());
        if (ingArr.length !== 3)
          throw new Error(
            `Wrong ingredient format. Please use the correct format`
          );

        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${DEV_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
