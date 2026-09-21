// This file reads the data from data.js and builds the character cards
// on the page. It does not contain any anime/character information itself.

const narutoButton = document.getElementById("naruto-button");
const onePieceButton = document.getElementById("one-piece-button");

const animeHeading = document.getElementById("anime-heading");
const cardContainer = document.getElementById("card-container");

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

  // 4. Remove any cards from the previous anime.
  cardContainer.textContent = "";

  // 5. Build and add a card for each character of the chosen anime.
  animeList.forEach(function (anime) {
    if (anime.name === animeName) {
      anime.characters.forEach(function (character) {
        const card = createCharacterCard(character);
        cardContainer.appendChild(card);
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
