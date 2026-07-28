// Complete variable definitions and random functions
const customName = document.getElementById("custom-name");

const generateBtn = document.querySelector(".generate");

const story = document.querySelector(".story");

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    
    return array[random];
}

// Raw text strings
// arrays made with []
const characters = ["Willy the Goblin", "Big Daddy", "Father Christmas"];

const places = ["the soup kitchen", "Disneyland", "the White House"];

const events = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and slithered away"];

// Partial return random string function
function returnRandomStoryString() {
    const randomCharacter = randomValueFromArray(characters);
    const randomPlace = randomValueFromArray(places);
    const randomEvent = randomValueFromArray(events);

    // when inserting embeddded expressions you must use ` (~ key) to wrap the text, otherwise JS treats entire block as a string
    let storyText = `It was 94 Fahrenheit outside, so ${randomCharacter} went for a walk. When they got to ${randomPlace}, they stared in horror for a few moments, then ${randomEvent}. Bob saw the whole thing, but was not surprised — ${randomCharacter} weighs 300 pounds, and it was a hot day.`

    return storyText;
}

// Event listener and partial generate function definition
generateBtn.addEventListener("click", generateStory);

function generateStory() {
    let newStory = returnRandomStoryString();

    if (customName.value !== "") {
        const name = customName.value;

        newStory = newStory.replace("Bob", name);
    }

    if (document.getElementById("uk").checked) {
        // lbs to stone = lbs / 14
        const weight = `${Math.round(300 / 14)} stone`;
        // f to c = (fah - 32) * (5 / 9)
        // using toFixed as output is a string and I want a number rounded to one decimal place
        // info obtained from: https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript
        const temperature = `${((94 - 32) * (5 / 9)).toFixed(1)} Celsius`;

        newStory = newStory.replace("300 pounds", weight);
        
        newStory = newStory.replace("94 Fahrenheit", temperature);

    }

    // TODO: replace "" with the correct expression
    story.textContent = newStory;
    story.style.visibility = "visible";
}