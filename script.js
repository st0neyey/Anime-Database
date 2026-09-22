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

  card.appendChild(name);
  card.appendChild(anime);
  card.appendChild(description);

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

  animeList.forEach(function (anime) {
    if (anime.name === currentAnimeName) {
      anime.characters.forEach(function (character) {
        if (character.name.toLowerCase().includes(lowerSearchText)) {
          const card = createCharacterCard(character);
          cardContainer.appendChild(card);
        }
      });
    }
  });
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
