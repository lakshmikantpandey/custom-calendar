**Custom Calendar Resource UI**


This project is a custom calendar resource UI built with React, TypeScript, and Vite. The UI manages time slot rendering, grid rendering, and supports creating, updating, and deleting events. Additionally, it provides an option to change the timezone for custom time zones.

**Features**
Time Slot Rendering: Manages the rendering of time slots in the calendar.
Grid Rendering: Handles the grid layout for the calendar.
Event Management: Allows creating, updating, and deleting events.
Timezone Support: Enables changing the timezone to custom time zones.
Getting Started
Prerequisites
Ensure you have the following installed:

**Node.js**
**npm or yarn**
Installation
Clone the repository:
sh
Copy code
g**it clone https://github.com/lakshmikantpandey/custom-calendar.git**
Navigate to the project directory:
sh
Copy code
**cd custom-calendar**
Install dependencies:
sh
Copy code
**npm install**
or
sh
Copy code
**yarn install**
Running the Project
To start the development server with hot module replacement (HMR):

sh
Copy code
**npm run dev**
or

sh
Copy code
**yarn dev**
Building the Project
To build the project for production:

sh
Copy code
**npm run build**
or

sh
Copy code
**yarn build**
ESLint Configuration
If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules:

Configure the top-level parserOptions property in your ESLint configuration file:

js
Copy code
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
Replace plugin:@typescript-eslint/recommended with plugin:@typescript-eslint/recommended-type-checked or plugin:@typescript-eslint/strict-type-checked.

Optionally add plugin:@typescript-eslint/stylistic-type-checked.

Install eslint-plugin-react and add plugin:react/recommended and plugin:react/jsx-runtime to the extends list.

Project Structure
plaintext
Copy code
├── public          # Static assets
├── src             # Source files
│   ├── components  # React components
│   ├── pages       # Page components
│   ├── hooks       # Custom hooks
│   ├── utils       # Utility functions
│   ├── App.tsx     # Main app component
│   ├── index.tsx   # Entry point
├── .eslintrc.js    # ESLint configuration
├── tsconfig.json   # TypeScript configuration
├── vite.config.ts  # Vite configuration
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
Contributing
We welcome contributions to enhance the functionality of this project. Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
