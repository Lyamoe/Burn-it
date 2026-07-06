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

* [ ] **High Priority**: Break the circular dependency loop between `calcController.js` and `calcOptions.js`
* [ ] **High Priority**: Remove DOM lookups (`getElementById`) from `calcOptions.js` global scope to prevent `null` references on early loads
* [ ] **Medium Priority**: Refactor `activeConfig.calculate()` to return a pure validation/result payload object instead of directly calling UI methods
* [ ] Handle 404 behavior when an invalid query string is passed in `window.location.search`

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
