## [1.3.0](https://github.com/Adravilag/sagebox/compare/v1.2.1...v1.3.0) (2025-12-02)


### ✨ Features

* add astro documentation site with github pages deployment ([04e0e4b](https://github.com/Adravilag/sagebox/commit/04e0e4be188d4db4cad8a630ecac6149b4a34298))


### 🐛 Bug Fixes

* build only stencil components for docs deployment ([f064357](https://github.com/Adravilag/sagebox/commit/f064357037566db847e08bee03c92f3a442625b0))
* ensure base url has trailing slash for docs links ([92da3bf](https://github.com/Adravilag/sagebox/commit/92da3bfa7b18d46ec5aed5530c62932f4b2112ec))
* resolve angular and react build errors ([4bc0fb1](https://github.com/Adravilag/sagebox/commit/4bc0fb128d0fb2392dfb2edf42893bfdf5ac4772))
* resolve merge conflict in package.json angular exports ([cb23a79](https://github.com/Adravilag/sagebox/commit/cb23a79108b52f772d8244584e0f56d917753f5a))
* simplify build process and fix docs urls ([5fa6e4f](https://github.com/Adravilag/sagebox/commit/5fa6e4f44ca6b4e8667fd4883387adefd60552a3))
* update back-link to use base_url and fix tests ([efa0ad0](https://github.com/Adravilag/sagebox/commit/efa0ad0ad54cbd3199941ce6d8671744c522391a))
* update node version to 20+ and fix test configuration ([e760b2a](https://github.com/Adravilag/sagebox/commit/e760b2ab19b6801d52ed92c842d5b10ee2034dd8))

## [1.2.1](https://github.com/Adravilag/sagebox/compare/v1.2.0...v1.2.1) (2025-12-02)


### 🐛 Bug Fixes

* **angular:** add event binding to angular wrapper proxies ([3506f50](https://github.com/Adravilag/sagebox/commit/3506f5056b00e4a92c1ada77e862cc9a9d67fcb1))

## [1.2.0](https://github.com/Adravilag/sagebox/compare/v1.1.0...v1.2.0) (2025-12-02)


### ✨ Features

* **angular:** add angular standalone wrappers for all components ([b0b3a0d](https://github.com/Adravilag/sagebox/commit/b0b3a0d8c3f1c7d83544a3ed332ca609b41710ad))
* **components:** add theme-toggle component and badge tests ([8824f7b](https://github.com/Adravilag/sagebox/commit/8824f7b12b9e63ec86fa1d860354654ed02995ae))


### ♻️ Code Refactoring

* **angular:** simplify angular wrappers with manual proxies ([d6bd07a](https://github.com/Adravilag/sagebox/commit/d6bd07ada4c16b1dce9720932618a3dbfe412b20))

## [1.1.0](https://github.com/Adravilag/sagebox/compare/v1.0.1...v1.1.0) (2025-12-01)


### ✨ Features

* **svg-icon:** add fill property as alias for color and enhance icon name handling ([b86410f](https://github.com/Adravilag/sagebox/commit/b86410f098d280d015b3f9a57c07af44dc0ee8e2))


### ♻️ Code Refactoring

* improve code structure for readability and maintainability ([076603b](https://github.com/Adravilag/sagebox/commit/076603b24ac4681330d7c0a45b7f77bc580f2d8f))

## [1.0.1](https://github.com/Adravilag/sagebox/compare/v1.0.0...v1.0.1) (2025-12-01)


### 🐛 Bug Fixes

* correct repository url case for npm provenance ([c6999a3](https://github.com/Adravilag/sagebox/commit/c6999a3f94a31b254ffaef303031b780ea055e5a))

## 1.0.0 (2025-12-01)


### ✨ Features

* initial release with ci/cd pipeline ([1363127](https://github.com/adravilag/sagebox/commit/1363127b798a4f72c27e3bf7eeb90e00dbff3c67))


### 🐛 Bug Fixes

* disable husky in ci and add prettierignore ([37c0266](https://github.com/adravilag/sagebox/commit/37c026619db8ce0136a8882638d420dedb650f24))
* resolve test failures in i18n and svg-icon ([e2061fd](https://github.com/adravilag/sagebox/commit/e2061fd1af490ad47e2435c9630f848a064eda13))
* update release workflow npm auth ([6b4c3f8](https://github.com/adravilag/sagebox/commit/6b4c3f870b80924ae33df0e566e6ecf290880018))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CI/CD pipeline with GitHub Actions
- Automatic versioning with semantic-release
- Storybook deployment to GitHub Pages
- Contributing guidelines
- Pull request template

<!-- Releases will be automatically documented below by semantic-release -->
