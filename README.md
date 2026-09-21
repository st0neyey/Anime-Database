# Anime Database

A simple webpage that displays anime and their characters as cards. Plain
HTML, CSS, and JavaScript only — no frameworks, no database, no API.

## What it shows

One page with two buttons: Naruto and One Piece. When the page first loads,
no anime is selected. Clicking a button switches the *entire* page to that
anime's theme (colors, background, title style, button and card styling),
shows the anime's name as a heading, and shows its three character cards.
Clicking the other button replaces everything with the other anime's theme
and characters. Only one theme is ever shown at a time.

## Files, explained simply

- **`data.js`** — Just the raw information: a list of anime, and for each
  anime, a list of its characters (name, anime, description). This file has
  no display logic in it at all — it's purely the "facts."

- **`index.html`** — The page's structure. It has a title, the two anime
  buttons, one heading (empty until an anime is chosen), and one empty box
  where the character cards appear. JavaScript fills in the heading and box.

- **`style.css`** — All the visual styling. Colors are stored in variables.
  A default set of colors is used at first, and two theme blocks
  (`body.theme-naruto` and `body.theme-one-piece`) replace those colors when
  their class is on the page. It also styles the active button and makes cards
  stack in a single column on a narrow screen (like a phone).

- **`script.js`** — The logic. When you click an anime button it: switches
  the theme class on the page, sets the heading, marks that button as active,
  clears the old cards, and builds new cards from `data.js` for the chosen
  anime. Adding a new character later only means editing `data.js`.

## How the files work together

1. `index.html` loads `style.css` (for appearance), then `data.js` (the
   information), then `script.js` (the logic) — in that order, since
   `script.js` needs the data to already exist before it can use it.
2. When you click a button, `script.js` changes the page's theme class,
   heading, active button, and cards.
3. `style.css` reacts automatically: the new theme class swaps the color
   variables, so the whole page restyles at once.

## How to open and test it

1. Go to this folder in File Explorer:
   `C:\Users\Kevin\Desktop\Claude-Code-Learning\Anime-Database`
2. Double-click `index.html` to open it in your browser.
3. You should see a plain gray-and-white page with the title and two
   buttons, and no cards.
4. Click "Naruto" — the page turns orange/black/cream, the Naruto button
   looks selected, and the Naruto heading and three cards appear.
5. Click "One Piece" — the page turns ocean blue/teal/parchment, the One
   Piece button looks selected, and the Naruto content is replaced by the
   One Piece heading and cards.
6. Try resizing your browser window narrower (or open it on your phone) —
   the cards should stack into a single column.
