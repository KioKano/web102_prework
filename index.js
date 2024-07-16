/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {

        let game = games[i]; 

       // create a new div element, which will become the game card
        const div = document.createElement("div");

        // add the class game-card to the list
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `
    
            <img class="game-img" id=${game.name + "-img"} src=${game.img} />
            <h2>${game.name}</h2>
            <h4>${game.description}</h4>
            <p>$${(game.pledged).toLocaleString("en-US")} out of $${(game.goal).toLocaleString("en-US")} </br> received from ${(game.backers).toLocaleString("en-US") } backers.</p>  
            <!-- add commas to the funding amounts --> 

        `;

        // append the game to the games-container
        gamesContainer.appendChild(div);

    } // End of for loop

} // End of function addGamesToPage

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON); // use the variable GAMES_JSON

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalBackers = GAMES_JSON.reduce( (acc, game) => {

    return acc + game.backers;

}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US'); // US English code

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalPledged = GAMES_JSON.reduce( (acc, game) => {

    return acc + game.pledged;

}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = "$" + totalPledged.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length; // use the length of the array for total games

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (game) => {

        return game.pledged < game.goal;

    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    
    // console.log(unfundedGames);

} // End of function filterUnfundedOnly

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {

        return game.pledged >= game.goal;

    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    
    // console.log(fundedGames);

} // End of function filterFundedOnly

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

} // End of showAllGames function 

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly); // Change view based on mouse clicks
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.reduce( (acc, game) => {

    return acc + (game.pledged < game.goal ? 1 : 0); // If goal isn't met, increase variable by 1

}, 0);

// let fundedGames = GAMES_JSON.reduce((acc, game) => {

//     return acc + (game.pledged >= game.goal ? 1 : 0); // If goal is met, increase variable by 1

// }, 0);

// let fundedTotal = (GAMES_JSON.reduce( (acc, game) => {

//     return acc + (game.pledged >= game.goal ? game.pledged : 0); // If goal is met, add pledged amount to variable

// }, 0)).toLocaleString("en-US"); // Add commas to the funding amount

// create a string that explains the number of unfunded games using the ternary operator
// Using ternary operator to ensure statement is grammatically correct based on number of unfunded games.
const displayString = `A total of $${(totalPledged).toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedGames} game${unfundedGames > 1 ? "s" : ""} remain${unfundedGames > 1 ? "" : "s"} unfunded. We need your help to fund these amazing games!`

// Original message focusing only on funded games; changed to mirror example.
// const displayString = `A total of $${fundedTotal} has been raised for ${fundedGames} games. Currently, ${unfundedGames} game${unfundedGames > 1 ? "s" : ""} remain${unfundedGames > 1 ? "" : "s"} unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const p = document.createElement("p");
p.innerHTML = displayString;
descriptionContainer.append(p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFunded = document.createElement("p");
mostFunded.innerHTML = firstGame.name;
firstGameContainer.append(mostFunded);

// do the same for the runner up item
const secondFunded = document.createElement("p");
secondFunded.innerHTML = secondGame.name;
secondGameContainer.append(secondFunded);