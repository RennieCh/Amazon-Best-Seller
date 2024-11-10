# Amazon Bestsellers Dashboard

## Project Overview

This project is a web app (Dashboard) that displays the most recent best-selling products across 36 categories from Amazon. The dashboard aims to make it easier for shoppers to browse and analyze bestsellers by summarizing and presenting products with high ratings count. The data is collected using APIs, aggregated into a unified format, and displayed in a user-friendly interface.

The dashboard is built using **React** and styled with **HTML** and **CSS**. It provides insights into product popularity and trends across different categories, enabling users to make informed shopping decisions.

## Team Members

- **Runying Chen – Team Leader**
  - Responsible for project planning, scheduling, and team management.
  
- **Bohan Cao – Team Member**
  - Focuses on API integration, data collection, and the creation of the dashboard interface.

## Data Sources

- **ScrapeHero API**: We are using the ScrapeHero API to gather data from the first page of Amazon best sellers across 40 categories. Categories include:
  - Amazon Devices & Accessories
  - Beauty & Personal Care
  - Books
  - Electronics
  - Home & Kitchen
  - And many more (40 categories in total).

- **ScrapeHero API**: Each product's ASIN is used to pull detailed product-specific information also from the ScrapeHero API.

## Features

- **Real-Time Data**: Pulls data dynamically from Amazon best seller categories.
- **Product Details**: Displays detailed information for each product, including ASIN, price, ratings, and product title.
- **User-Friendly Dashboard**: A clean and simple interface for summarizing the most popular products.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!** This command will remove the single build dependency from your project, giving you full control over the configuration.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **ScrapeHero API**: For collecting best-seller data and fetching detailed product information.
- **HTML/CSS**: For building and styling the user interface.
- **GitHub**: For version control and collaboration.

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).\
To learn more about the APIs used, check out the [ScrapeHero API](https://app.scrapehero.com/home).
