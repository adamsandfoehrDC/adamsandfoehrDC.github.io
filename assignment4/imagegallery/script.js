const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// creating images array
const images = [
    {filename: "pic1.jpg", alt: "Closeup of a human eye."},
    {filename: "pic2.jpg", alt: "Rock that looks like a wave."},
    {filename: "pic3.jpg", alt: "Purple and white pansies."},
    {filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb."},
    {filename: "pic5.jpg", alt: "Large moth on a leaf."}
];

// creating common URL variable to hold baseURL of image links
const commonURL = "https://mdn.github.io/shared-assets/images/examples/learn/gallery/";

// loop through images in array (for..of)
for (const image of images) {
    // create img element each instance of loop
    const createdImage = document.createElement("img");

    // updating image source & alt
    // combine commonURL with filename of which image in images we are on
    createdImage.src = `${commonURL}${image.filename}`;
    // alt is called same as filename
    createdImage.alt = image.alt;

    // add tab index so user can focus with keyboard
    // 0 is the first thing focused
    createdImage.tabIndex = "0";

    // adding image to thumbnail bar
    thumbBar.appendChild(createdImage);

    // make it so the image will run updateDisplayedImage when clicked
    createdImage.addEventListener("click", updateDisplayedImage);

    // allow <Enter> key press to make the focused image full sized
    createdImage.addEventListener("keydown", function(EnterPress) {
        if (EnterPress.code === "Enter") {
            updateDisplayedImage(EnterPress);
        }
    });
}

// creating updateDisplayedImage function
function updateDisplayedImage(EnterPress) {
    displayedImage.src = EnterPress.target.src;
    displayedImage.alt = EnterPress.target.alt;
}

// add click event listener to btn
btn.addEventListener("click", function() {
    // check IF button has "dark" already set as class
    if (btn.classList.contains("dark")) {
        // change text to "Lighten"
        btn.textContent = "Lighten";
        // change overlay to rgb(0 0 0 / 0.5)
        overlay.style.backgroundColor = "rgb(0 0 0 / 0.5)";
    } 
    
    // if button class IS NOT dark
    else {
        // change text to "Darken"
        btn.textContent = "Darken";
        // change overlay to rgb(0 0 0 / 0)
        overlay.style.backgroundColor = "rgb(0 0 0 / 0)";
    }

    // toggling dark class outside of loop (both loops do it)
    // toggle either removes OR adds class to an element
    btn.classList.toggle("dark");
})