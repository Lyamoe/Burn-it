# TODO

This is the development roadmap for the Bunnit project, focusing on engineering robust Vanilla JS features and clean architecture.

## Features

### Navigation & Layout

* [x] Add a Navigation Bar (Home | About | Contact)
* [x] A Hero Section Subtitle or Intro
* [x] "How it Works" Section
* [ ] FAQ Section at the Bottom

### Calculator Suite & Categories

* [ ] Health & Body Composition
  * [ ] Body Mass Index (BMI) with dynamic visual feedback (colors by range)
  * [ ] Body Fat Percentage (U.S. Navy Method) with conditional inputs by gender
  * [ ] Lean Mass (Calculation based on body fat percentage)
* [ ] Nutrition & Diet
  * [ ] Daily Energy Expenditure (TDEE) using basal metabolic rate and activity factor
  * [ ] Ideal Water Consumption (Customized calculation by weight and activity level)
  * [ ] Macronutrient Split (Proteins, Carbohydrates, and Fats based on goal: cutting/bulking)
* [ ] Workout
  * [ ] 1RM (One Repetition Maximum) calculator for strength training
  * [ ] Advanced Timer (Timer for HIIT/Tabata workouts with sound alerts via Web Audio API)

### Portfolio-Enhancing Features (The JavaScript "Flex")

* [ ] Local History (LocalStorage): Save the user's latest calculated results so they can track their progress without needing an external database.
* [ ] Data Export: Button to generate a report in a text file (.txt) or simple PDF with all the user's calculated metrics.
* [ ] Theme Switcher (Dark/Light Mode): Implement via JS by manipulating classes in the body or custom CSS properties (variables).
* [ ] Robust Form Validation: Custom real-time validation (e.g., prevent height greater than 3 meters or zero weight) without using native browser alerts.

## Fixes & Refactoring

* [ ] Refactor Main Layout CSS (index.scss):
  * [ ] Eliminate the 48px magic number on line 18 of index.scss (content-wrapper).
* [ ] JS Architecture (Separation of Concerns): Separate purely mathematical functions (logic layer) from functions that modify the HTML (UI layer).
