# Dummy Shopping Site

This is a simple web application for a dummy shopping site that features T-shirts. The project demonstrates the use of modern web technologies and best practices, including localStorage for personalization, cookie consent management, Google Analytics integration, and responsive design.

## Features

- **Product Listings**: A grid layout displaying various T-shirt products with images, names, and prices.
- **Shopping Cart**: A component to manage selected items, view total amounts, and remove items from the cart.
- **Cookie Consent**: A notification system to inform users about cookie usage and manage their consent.
- **Google Analytics**: Integrated for tracking user interactions and site performance.
- **Responsive Design**: The site is designed to be mobile-friendly and adapts to different screen sizes.

## Project Structure

```
dummy-shopping-site
├── public
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # Favicon for the website
│   └── manifest.json       # Metadata for Progressive Web App
├── src
│   ├── assets
│   │   └── styles.css      # CSS styles for the application
│   ├── components
│   │   ├── Cart.js         # Cart component
│   │   ├── CookieConsent.js # Cookie consent component
│   │   ├── Header.js       # Header component with navigation
│   │   ├── ProductList.js   # Component to display product listings
│   │   └── TShirtItem.js   # Individual T-shirt product card
│   ├── utils
│   │   ├── analytics.js     # Google Analytics functions
│   │   └── localStorage.js   # Functions for managing localStorage
│   ├── App.js              # Main application component
│   └── index.js            # Entry point for the React application
├── package.json            # npm configuration file
├── .gitignore              # Files to ignore by Git
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd dummy-shopping-site
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage Guidelines

- Browse through the T-shirt listings and add items to your cart.
- Manage your cart and view the total amount.
- Accept or decline cookie consent when prompted.
- Monitor user interactions through Google Analytics.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.