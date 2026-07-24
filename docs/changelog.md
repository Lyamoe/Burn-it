# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Created `categoryDisplay.html` to showcase specific calculators.
- Integrated Jest testing framework into the project.
- Included formula metadata in `calcTextContent.js` (for display in `calculator.html`).
- Same category calculators being shows in `calculator.html` aside.

### Changed

- Updated the TODO list to follow a priority-driven structure.
- Updated category hero subtitle.

## [1.0.0] - 2026-07-07

### Added

- **Core Features**: Index page with a "How to Use" guide and layout improvements.
- **Calculators**: Added an IMC (BMI) and new body fat percentage calculator page with introductory sections, full SCSS styling, and standard input validation.
- **UI/UX Components**: Implemented an aside element on the calculator page and added functionality to dynamically update banner images depending on the selected calculator.

### Changed

- **Refactoring & Modernization**:
  - Upgraded DOM querying from `getElementById` to `querySelector`.
  - Reorganized JavaScript architecture to prevent circular dependencies.
  - Re-engineered forms to be fully dynamic with updated input DOM handling.
  - Restructured the project styles by removing external Bootstrap classes in favor of a clean, custom SCSS structure.
  - Relocated the aside component inside the main HTML tag for better semantic structure.

### Fixed

- Resolved issue where previous BMI calculation results remained visible after a new submission.
- Standardized error handling by replacing `bmiErrorHandling` with a generic, reusable validation function.
- Fixed layout behavior regarding box-hip toggling.
- Cleared and resolved all temporary `TODO` comments embedded across codebase files.

[unreleased]: https://github.com/Lyamoe/Bunnit/compare/v1.0.0...develop
[1.0.0]: https://github.com/Lyamoe/Bunnit/releases/tag/v1.0.0
