# Vue.js To-Do Application for Beginners

A simple Vue.js application that demonstrates essential concepts of the framework through a practical to-do list application with authentication.

## Features

- **User Authentication**: Register and login functionality
- **To-Do Management**: Create, read, update and delete to-do items
- **Data Persistence**: All data is stored in browser's local storage

## Project Overview

This application is designed to help beginners understand how to build a Vue.js application with common features:

- Using Vue 3 Composition API
- Vuex for state management
- Vue Router for navigation
- Client-side data handling with local storage
- Form validation
- Conditional rendering
- List rendering and event handling

## Getting Started

### Prerequisites

- Node.js (v12.0.0 or above)
- npm (v6.0.0 or above)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run serve
```

4. Open your browser and navigate to `http://localhost:8080`

## Demo Account

For testing purposes, a demo account is pre-configured:

- Username: demo
- Password: password

## Project Structure

```
my-vue-app
├── src
│   ├── assets         # Static assets
│   ├── components     # Reusable Vue components
│   │   └── NavBar.vue # Navigation component
│   ├── router         # Vue Router configuration
│   ├── store          # Vuex store
│   ├── views          # Page components
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   └── TodosView.vue
│   ├── App.vue        # Root component
│   └── main.ts        # Application entry point
└── public             # Public static assets
```

## License

This project is licensed under the MIT License.