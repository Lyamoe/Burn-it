# TODO

This is the development roadmap for the Bunnit project, focusing on engineering Vanilla JS features and clean architecture.

## Features

* [ ] FAQ Section at the Bottom of index
* [ ] Information about the calculator under the calculator box
  * [ ] What the formula is
  * [ ] Since then it exists and short history
  * [ ] Information about the benefits of using it
* [ ] Theme Switcher (Dark/Light Mode)
* [ ] Save user metrics in localStorage so they don't have to re-enter them.
* [ ] Add a testing suite (like Jest)
* [ ] Unit Toggle System (Metric vs. Imperial)
* [ ] Change the calculator's image (over it) per topic
* [ ] Show same category calculators in the aside
* [ ] Add JSdoc to the files
* [ ] SCSS for radio buttons (including error design)

### Calculator Ideas

* [ ] Health & Body Composition
  * [x] Body Mass Index (BMI)
  * [x] Body Fat Percentage (U.S. Navy Method)
  * [ ] Lean Mass
* [ ] Nutrition & Diet
  * [ ] Daily Energy Expenditure (TDEE)
  * [ ] Ideal Water Consumption
* [ ] Workout
  * [ ] 1RM (One Repetition Maximum) calculator for strength training
* [ ] Change the navbar to (Health | Nutrition | Workout)

## Fixes & Refactoring

* [ ] Handle 404 behavior when an invalid query string is passed in `window.location.search`
* [ ] Introduce a presentation layer or utility function to handle formatting and HTML templating of results

## DONE

* [x] Add a Navigation Bar (Home | About | Contact)
* [x] A Hero Section Subtitle or Intro
* [x] "How it Works" Section
* [x] Robust Form Validation (e.g., prevent height greater than 3 meters or zero weight)
* [x] Separate logic layer from UI layer
* [x] Eliminate the 48px magic number in_Common.scss (content-wrapper)
* [x] Separate color palette from functional varibles
* [x] Results must be hidden after the user presses calculate again
* [x] Use the same HTML to all calculators
* [x] Break the circular dependency loop between `calcController.js` and `calcOptions.js`
* [x] Refactor `resetStyles()` to query inputs *only* within the active form
* [x] Replace the rigid string interpolation in `inputsDOM` with a scalable pattern
* [x] Refactor `CalculatorConfigs` so that `calculate` receives plain data objects (e.g., via `FormData`)
* [x] Refactor `CalculatorConfigs` so that `calculate` returns raw results instead of DOM
* [x] Implement a mechanism to handle conditional field display
* [x] Move Body Fat calculations and input error handling into `calcService.js`
* [x] Edit meta tags in `index.html` and `calculator.html`
