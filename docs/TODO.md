# TODO & Roadmap: Bunnit Project

This is the development roadmap for the **Bunnit** project, an engineering-focused Vanilla JS application built with clean architecture principles. This document outlines the upcoming features, calculator modules, and core technical enhancements categorized by their production readiness and strategic importance.

## Priority Definitions

* 🔴 **HIGH:** Core features or heavily important features that affect the user.
* 🟡 **MEDIUM:** Essential enhancements that aren't urgent but should be resolved *as soon as possible*.
* 🔵 **LOW:** Non-blocking nice-to-haves, calculator additions, or deeper documentation.

---

## Core Features & Architecture

* [ ] **HIGH:** Unit Toggle System (Metric vs. Imperial).
* [ ] **HIGH:** Move calculator list to `categoryDisplay.html`.
* [ ] **MEDIUM:** Theme Switcher (Dark/Light Mode).
* [ ] **MEDIUM:** Add JSdoc to the codebase files.
* [ ] **LOW:** FAQ Section at the bottom of `index.html`.
* [ ] **LOW:** Show same-category calculators in the aside sidebar.

---

## Calculator Roadmap

### Health & Body Composition

* [x] *COMPLETED:* Body Mass Index (BMI).
* [x] *COMPLETED:* Body Fat Percentage (U.S. Navy Method).
* [ ] **MEDIUM:** Lean Mass Calculator.

### Nutrition & Diet

* [ ] **MEDIUM:** Daily Energy Expenditure (TDEE) Calculator.
* [ ] **LOW:** Ideal Water Consumption Calculator.

### Workout

* [ ] **MEDIUM:** 1RM (One Repetition Maximum) Calculator for Strength Training.

---

## Fixes, Refactoring & Stability

* [ ] **HIGH:** Handle 404 behavior when an invalid query string is passed in `window.location.search`.
* [ ] **HIGH:** Create a utility function to identify which DOM element is missing in `calcController.js`.
* [ ] **MEDIUM:** Introduce a presentation layer or utility function to handle formatting and HTML templating of results.
* [ ] **MEDIUM:** Add ARIA labels to hidden fields and interactive elements.
