/*jshint esversion: 6*/
/**
*
* Manipulating the DOM exercise.
* Exercise programmatically builds navigation,
* scrolls to anchors from navigation,
* and onScreenLinkss section in viewport upon scrolling.
*
* Dependencies: None
*
* JS Version: ES2015/ES6
*
* JS Standard: ESlint
*
*/

/**
* Define Global Variables
*
*/


/**
* End Global Variables
* Start Helper Functions
*
*/



/**
* End Helper Functions
* Begin Main Functions
*
*/

// build the nav

// Scroll to anchor ID using scrollTO event
//const navOutput = document.getElementById("navoutput");
// Detect Scrolling event
let scrollDirection = null;
let lastScrollPosition = null;
document.addEventListener("scroll",
function(event) {
  //alert(`You are scrolling ${event.}`);
  if (event === null) {return;}
  //console.log('Scroll listener direction',window.scrollY);
  if (lastScrollPosition == null) {
    lastScrollPosition = window.scrollY;
    return;
  }
  // if scrolling down
  if (lastScrollPosition < window.scrollY) {
    scrollDirection = 'down';
  } else {
    scrollDirection = 'up';
  }
  lastScrollPosition = window.scrollY;
}
);

/**
* End Main Functions
* Begin Events
*
*/

// Build menu

// Dynamically add Section items to menu

let staticNodeListOfSections = document.querySelectorAll('[data-nav]');
let navBarTarget = document.querySelector("#navbar__list");

for (const section of staticNodeListOfSections){

  // Create list item and style
  const newListElement = document.createElement("li");
  newListElement.classList.add('menu__link');

  // Create anchor and style
  const anchor = document.createElement("a");
  anchor.classList.add("navbar__menu");
  anchor.style.textDecoration = 'none';

  // Attach elements together.
  newListElement.appendChild(anchor);
  navBarTarget.appendChild(newListElement);


  putSectionNameOnMenuLink(section, anchor);

  attachPageTargetForClickToScroll(section, anchor);

}


function putSectionNameOnMenuLink(section, anchor) {
  // Attach data-nav name to menulink
  const dataAttribute = section.getAttribute("data-nav");
  anchor.textContent = dataAttribute;
}

// Scroll to section on link click

function attachPageTargetForClickToScroll(pageTarget,anchor) {

  const idAttribute = pageTarget.getAttribute("id");
  anchor.setAttribute('href',`#${idAttribute}`);
}


// onScreenLinks Navigation Sections when scrolling
// Add class 'active' to section when near top of viewport


// Create an observer to watch when a section appears on screen
let IDforLastSectionHighlighted = null;
const observer = new IntersectionObserver(
  // When 25% of a section is visible; this will capture that event
  // Callback
  (events, observer) => {
    for (const event of events) {
      // 45% or 65% intersection
      if (event.isIntersecting === false) { continue;}
      if (scrollDirection == 'down') {
        if (event.intersectionRatio >= 0.45) {
          onScreenLinksNavBarEventProcessing(event,event.target.getAttribute("data-nav"));
        }
      } else { //scrollDirection is up
        if (event.intersectionRatio >= 0.65) {
          onScreenLinksNavBarEventProcessing(event,event.target.getAttribute("data-nav"));
        }
      }
    }
  }, {root:null, rootMargin: '0px', threshold: [0.45,0.65]}
);

// Attach an observer to each section to onScreenLinks the navigation bar
//const containerOfElements = document.querySelectorAll(".landing__container");
const containerOfElements = document.querySelectorAll("section");
for (const item of containerOfElements) {
  observer.observe(item);
}


// Set sections as active
function onScreenLinksNavBarEventProcessing(event,nameOfSection) {

  const navbarHTMLElement = document.querySelector('.navbar__menu');
  if (navbarHTMLElement != null) {
    // Search for the node that needs onScreenLinksing
    const onScreenLinks = navbarHTMLElement.getElementsByTagName('a');
    toggleNavbarHighlightFromScrolling(onScreenLinks,nameOfSection);
  }
}


function toggleNavbarHighlightFromScrolling(onScreenLinks,nameOfSection) {
  // Iterate across elements onScreenLinksing newly encoutered section and unhighligthing the rest.
  for (const link of onScreenLinks) {

    if (link.innerText == nameOfSection) {

      // Turn On coloring for listitem
      link.parentElement.classList.add('onScreenLinks');

    } else { // Turn Off Coloring for list item

      if (link.parentElement.classList.contains('onScreenLinks')) {
        link.parentElement.classList.toggle('onScreenLinks');
      }
    }
  }
}
