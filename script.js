// This file reads the data from data.js and builds the character cards
// on the page. It does not contain any anime/character information itself.

const narutoButton = document.getElementById("naruto-button");
const onePieceButton = document.getElementById("one-piece-button");

const animeHeading = document.getElementById("anime-heading");
const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("character-search");

// Tracks which anime is currently selected, so the search box knows which
// character list to filter. Starts as null (nothing selected yet).
let currentAnimeName = null;

// The name localStorage will save the favorites list under.
const FAVORITES_KEY = "animeDatabaseFavorites";

// Read the saved favorites list from localStorage. localStorage only holds
// text, so JSON.parse turns that text back into a real array. If nothing
// has been saved yet, start with an empty list instead.
let favoriteCharacters = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

// A simple way to identify one character uniquely: its anime plus its name.
function getCharacterId(character) {
  return character.anime + "::" + character.name;
}

function isFavorite(character) {
  return favoriteCharacters.includes(getCharacterId(character));
}

// Add or remove a character from the favorites list, then save the updated
// list back to localStorage. JSON.stringify turns the array into text,
// since localStorage can only store text.
function toggleFavorite(character) {
  const id = getCharacterId(character);

  if (favoriteCharacters.includes(id)) {
    favoriteCharacters = favoriteCharacters.filter(function (favoriteId) {
      return favoriteId !== id;
    });
  } else {
    favoriteCharacters.push(id);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteCharacters));
}

// Build one character card element from a character's data.
function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";

  const name = document.createElement("h3");
  name.textContent = character.name;

  const anime = document.createElement("p");
  anime.textContent = "Anime: " + character.anime;

  const description = document.createElement("p");
  description.textContent = character.description;

  const powers = document.createElement("p");
  powers.textContent = "Powers: " + character.powers;

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  favoriteButton.textContent = isFavorite(character) ? "★ Favorited" : "☆ Favorite";
  favoriteButton.addEventListener("click", function () {
    toggleFavorite(character);
    renderCards(searchInput.value);
  });

  card.appendChild(name);
  card.appendChild(anime);
  card.appendChild(description);
  card.appendChild(powers);
  card.appendChild(favoriteButton);

  return card;
}

// Switch the whole page to one anime: its theme, heading, active button,
// and character cards.
function showAnime(animeName, themeClass, activeButton) {
  // 1. Switch the theme. style.css reacts to this class on <body>.
  document.body.className = themeClass;

  // 2. Show the anime's name as the heading.
  animeHeading.textContent = animeName;

  // 3. Mark only the clicked button as the active one.
  narutoButton.classList.remove("active");
  onePieceButton.classList.remove("active");
  activeButton.classList.add("active");

  // 4. Remember the selection and clear any previous search text.
  currentAnimeName = animeName;
  searchInput.value = "";

  // 5. Show every character of the chosen anime (no search filter yet).
  renderCards("");
}

// Show only the characters of the current anime whose name contains
// searchText (case-insensitive). Called on anime selection and on typing.
function renderCards(searchText) {
  cardContainer.textContent = "";

  if (currentAnimeName === null) {
    return;
  }

  const lowerSearchText = searchText.toLowerCase();
  let matchCount = 0;

  animeList.forEach(function (anime) {
    if (anime.name === currentAnimeName) {
      anime.characters.forEach(function (character) {
        if (character.name.toLowerCase().includes(lowerSearchText)) {
          const card = createCharacterCard(character);
          cardContainer.appendChild(card);
          matchCount = matchCount + 1;
        }
      });
    }
  });

  if (matchCount === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No characters found.";
    cardContainer.appendChild(noResultsMessage);
  }
}

narutoButton.addEventListener("click", function () {
  showAnime("Naruto", "theme-naruto", narutoButton);
});

onePieceButton.addEventListener("click", function () {
  showAnime("One Piece", "theme-one-piece", onePieceButton);
});

// Re-filter the visible cards every time the search box's text changes.
searchInput.addEventListener("input", function () {
  renderCards(searchInput.value);
});
