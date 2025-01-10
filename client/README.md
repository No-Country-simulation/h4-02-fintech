# h4-02-fintech Frontend

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Package Manager

This project uses [npm](https://www.npmjs.com/), a widely-used package manager for JavaScript.

For more information on `npm`, you can check out the [npm documentation](https://docs.npmjs.com/).

## Setup Guide

### Download all dependencies

Run the following command to install all dependencies:

```
npm install
```

### Start development

Run the following command to start the development server:

```
npm run dev
```

### Build frontend

Run the following command to build the project for production:

```
npm run build
```

## Architecture

```
└── 📁src
    └── 📁assets
        └── 📁fonts
        └── 📁images
        └── react.svg
        └── 📁styles
    └── 📁config
    └── 📁core
        └── 📁auth
            └── 📁components
            └── 📁hooks
            └── 📁pages
            └── 📁services
            └── 📁store
        └── 📁config
        └── 📁controllers
        └── 📁dashboard
            └── 📁components
            └── 📁hooks
            └── 📁pages
            └── 📁services
            └── 📁store
        └── 📁middleware
        └── 📁notifications
        └── 📁routes
        └── 📁services
        └── 📁utils
        └── 📁validators
    └── 📁data
        └── 📁api
        └── 📁dataModels
    └── 📁modules
        └── 📁account
            └── 📁components
            └── 📁hooks
            └── 📁pages
            └── 📁preferences
            └── 📁profile
            └── 📁services
            └── 📁settings
            └── 📁store
            └── 📁utils
        └── 📁community
            └── 📁components
            └── 📁forums
            └── 📁hooks
            └── 📁news
            └── 📁pages
            └── 📁services
            └── 📁store
            └── 📁utils
        └── 📁investment
            └── 📁components
            └── 📁exploration
            └── 📁filters
            └── 📁hooks
            └── 📁pages
            └── 📁performance
            └── 📁services
            └── 📁store
            └── 📁utils
        └── 📁transactions
            └── 📁components
            └── 📁history
            └── 📁hooks
            └── 📁management
            └── 📁pages
            └── 📁services
            └── 📁store
            └── 📁utils
    └── 📁tests
        └── 📁integration
        └── 📁unit
    └── 📁utils
    └── App.jsx
    └── index.css
    └── main.jsx
```
