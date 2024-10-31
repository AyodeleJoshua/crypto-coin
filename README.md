# Crypto-coin
This is a simple web app that displays information on cryptocurrency coin prices based on coinlore api data. This app utilizes React + vite, axios for api call and react query for server side state management.

# Prerequisiite
- node (version 22)
- npm or yarn

# User Experience Features
- Responsiveness: web app adapts to any view port including mobile
- Pagination: Coin data is paginated to show 10 items per page
- Optimistic Prefetching: Data for +1 page on table is prefetched so that user only sees loading state when page is first visited
- Data Presentation: Data from CoinLore API is presented to user in a readable manner
- API response caching to ensure already fetched page data are not wiped

# Developers Experience Features
- Tests are written to ensure changes do not break existing features
- Eslint to manage code quality and consistence
- Typescript to provide type safety

# Getting Started
1. Clone the Repository
Clone the repository to your local machine.

git clone https://github.com/AyodeleJoshua/crypto-coin.git
cd crypto-coin

2. Install Dependencies
Navigate to the project directory and install dependencies.
`npm install`

3. Environment Variables
Add .env file to root of the project

5. Run the Application Locally
To start the development server, use the following command:
`npm run dev`

  The application should start up on http://localhost:3000/crypto-coin/

5. Build the Application for Production
To create an optimized production build, use the following command:
`npm run build`

# Unit Tests
The app has been tested decently. To run tests, run
`npm run test`

# Files and Folders Organization
```
crypto-coin/
├── mocks/ 
|   ├── __mock_data__.json 
|   ├── browser.ts
|   └── handlers.ts
├── src/
|   ├── api\
|   |   ├── apiCallMethods.ts
|   |   └── axiosInstance.ts
|   ├── assets\
|   |   └── react.svg
│   ├── components/
|   |   ├── Pagination\
|   |   |   ├── pagination.module.css
|   |   |   └── index.tsx
|   |   ├── Spinner\
|   |   |   ├── spinner.module.css
|   |   |   └── index.tsx
|   |   ├── Table\
|   |   |   ├── table.module.css
|   |   |   └── index.tsx
|   |   ├── TableLoader\
|   |   |   └── index.tsx
│   │   └── index.tsx    
│   ├── pages/
│   |   └── Home/
│   |       ├── home.module.css
|   |       └── index.tsx
│   ├── services/
│   |   └── crypto.services.ts
│   ├── utils/
│   |   ├── environmentVariables.ts
│   |   └── enableMocking.ts
│   ├── App.tsx                
│   ├── index.css 
│   ├── main.tsx             
|   └── vite-env.d.ts
├── tests/
|    └── Home.spec.tsx
├── public/                   # Static assets
|   ├── favicon.svg
|   └── mockServiceWorker.js
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md                 # Documentation file
```
