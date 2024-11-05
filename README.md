# Crypto-coin

This is a simple web app that displays information on cryptocurrency coin prices based on coinlore api data. This app utilizes React + vite, axios for api call, react query for server side state management, react testing library(RTL) for integration test and Mock service worker(MSW) for test data mocking.

# Prerequisiite

- node (version 22)
- npm or yarn

# User Experience Features

- Accessibility: Web app is useable for persons with disability
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

1. Clone the Repository:
   Clone the repository to your local machine.

git clone https://github.com/AyodeleJoshua/crypto-coin.git
cd crypto-coin

2. Install Dependencies:
   Navigate to the project directory and install dependencies.
   `npm install`

3. Environment Variables:
   Add .env file to root of the project

4. Run the Application Locally:
   To start the development server, use the following command:
   `npm run dev`

The application should start up on http://localhost:3000/crypto-coin/

5. Build the Application for Production:
   To create an optimized production build, use the following command:
   `npm run build`

# Integration Tests

The app has been tested decently. Test is done with react-testing-library(RTL) and data mocked with mock service worker(msw).
Integration test has also been added as part of the workflow process. This means the build and deployment will fail when code is pushed to this repo if test fails
To run tests, run
`npm run test`

# Files and Folders Organization

```
crypto-coin/
├── mocks/                     # folder contains mock data and api inteceptors for test
|   ├── __mock_data__.json     # mock data for test
|   ├── server.ts             # browser code to intecept api call for test (as generated by mock service worker for api
|   └── handlers.ts            # handlers to intercept api call
├── src/                       # web app source code
|   ├── api\                   # folder contains everything related to api methods and interceptors
|   |   └── apiCallMethods.ts  # export reuseable api methods\status code is returned from external api
|   ├── assets\                # assets for app
|   |   └── react.svg          # react.svg asset
│   ├── components/            # reuseable components
|   |   ├── Pagination\        # pagination folder
|   |   |   ├── pagination.module.css  # style for pagination component
|   |   |   └── index.tsx      # pagination component declarative structure
|   |   ├── Spinner\           # spinner for loading state
|   |   |   ├── spinner.module.css  #stle for spinner component
|   |   |   └── index.tsx      # spinner component declarative structure
|   |   ├── Table\             # reuseable table component
|   |   |   ├── table.module.css # styles for table component
|   |   |   └── index.tsx      # table component declarative structure
|   |   ├── TableLoader\       # reuseable table loader for loading state
|   |   |   └── index.tsx      # table loader component declarative structure
│   │   └── index.tsx          # export of all all reuseable component happens here so that components folder act as a library for export of all unit components
│   ├── customHooks/           # custom hooks
|   |   └── useCoins.ts        # coins list fetching
│   ├── pages/                 # pages in app
│   |   └── Home/              # brings together all components and general styles for homepage
│   |       ├── home.module.css  # home page styles
|   |       └── index.tsx      # declarative structure for homepage. This is where all components come together to make the home page
│   ├── services/              # folder to bring together all api services
│   |   └── crypto.services.ts # fetch data that has to do with crypto
│   ├── utils/                 # utility folder
│   |   ├── environmentVariables.ts  # all environment variable import happens here. This is so that things like `import.meta.env.VITE_BASE_URL` does not happen anywhere else in code
│   |   └── enableMocking.ts   # export function to determine if api response should be mocked
│   ├── App.tsx                # routes for pages go here
│   ├── index.css              # application level css goes here
│   ├── main.tsx               # app entry
|   └── vite-env.d.ts          # vite environment variables declaration file
├── tests/                     # folder for unit and integration tests
|    └── Home.spec.tsx         # test for homepage
├── public/                    # Static assets
|   ├── favicon.svg            # app favicon
|   └── mockServiceWorker.js   # file to make api response mocking possible in the browser
├── .env.example               # samples for environment variables
├── .gitignore                 # git ignore
├── eslint.config.js           # lint settings
├── index.html                 # html file to load react components into
├── package-lock.json          # library installation actual version
├── package.json               # package and app information + scripts
├── tsconfig.app.json          # typescript configration for client app
├── tsconfig.json              # typescript config to mix server and client info
├── tsconfig.node.json         # typescript config for node related things
├── vite.config.ts             # config for vite bundler
└── README.md                  # Documentation file
```
