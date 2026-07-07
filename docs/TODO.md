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

### Calculator Ideas

* [ ] Health & Body Composition
  * [x] Body Mass Index (BMI)
  * [ ] Body Fat Percentage (U.S. Navy Method)
  * [ ] Lean Mass
* [ ] Nutrition & Diet
  * [ ] Daily Energy Expenditure (TDEE)
  * [ ] Ideal Water Consumption
* [ ] Workout
  * [ ] 1RM (One Repetition Maximum) calculator for strength training
* [ ] Change the navbar to (Home | Nutrition | Workout)

## Fixes & Refactoring

* [ ] Handle 404 behavior when an invalid query string is passed in `window.location.search`
* [ ] Replace the rigid string interpolation in `inputsDOM` with a more scalable component-rendering pattern.
* [ ] Refactor `CalculatorConfigs` so that `calculate` receives plain data objects (e.g., via `FormData`) and returns raw numeric/structural results instead of directly querying the DOM via `document.getElementById` and rendering HTML strings.
* [ ] Move Body Fat calculations and input error handling into `calcService.js`
* [ ] Implement a mechanism (e.g., `onFieldChange` or visibility dependencies) in the configuration schema to handle conditional field display (e.g., hiding/showing the Hip field based on the selected sex)
* [ ] Introduce a dedicated presentation layer or utility function to handle formatting and HTML templating of results, removing template literals from the configuration layer.

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
* [x] Refactor `resetStyles()` to query inputs *only* within the active form.
