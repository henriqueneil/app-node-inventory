# Inventory Management System

## Overview

This is a modern inventory management system built with TypeScript, Express, and RxDB. The application provides a RESTful API to manage products in an inventory, with support for creating, retrieving, and searching products with various filters.

## Tech Stack

- **TypeScript (v5.8.3)**: Strongly-typed JavaScript for enhanced development experience
- **Express (v5.1.0)**: Web framework for building the REST API
- **RxDB (v16.13.0)**: Reactive, offline-first NoSQL database
- **Node.js**: Runtime environment

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
app-node-inventory/
├── apis/               # API route handlers
│   └── products.api.ts # Product-related endpoints
├── database/           # Database configuration and entity implementations
│   ├── rxdb.ts         # Database manager, initialization and connection
│   └── product.db.ts   # Product entity schema and collection definition
├── models/             # Data models and interfaces
│   └── product.model.ts # Product entity interface
├── services/           # Business logic layer
│   └── product.service.ts # Product-related business operations
├── utils/              # Utility functions
├── initial-load/       # Initial data for seeding the database
├── index.ts            # Application entry point
└── package.json        # Project dependencies
```


## Architecture

### API Layer (/apis)

The application exposes RESTful endpoints through Express routers. Each entity has its own router file in the `apis/` folder.

- `products.api.ts`: Implements GET and POST operations for product management

Routes follow RESTful conventions:
- `GET /api/products`: Retrieve all products with optional filtering
- `GET /api/products/:id`: Retrieve a specific product by ID
- `POST /api/products`: Create a new product

### Service Layer (/services)

The service layer contains the business logic of the application. Services are responsible for implementing business rules, data validation, and coordinating database operations.

- `product.service.ts`: Implements product-related operations like:
    - Finding products with filtering and sorting
    - Retrieving products by ID
    - Creating new products with automatic ID generation
    - Field selection for query responses

### Database Layer (/database)

The database layer is built around RxDB, a reactive, offline-first NoSQL database.

- `rxdb.ts`: The central database manager that handles database initialization, connection, and collection setup. It also loads initial data when the application first runs.
- `product.db.ts`: Defines the product schema and collection configuration for RxDB.

### Data Models (/models)

The models folder contains TypeScript interfaces that represent the entities used throughout the application:

- `product.model.ts`: Defines the structure of product entities with properties like id, name, category, price, etc.

### Initial Data (/initial-load)

The application includes a seeding mechanism that loads initial product data when the database is empty. This ensures that new installations start with a set of sample products for testing and demonstration.

## Key Features

1. **Case-insensitive Search**: Products can be searched by name, category, or brand with case-insensitive matching
2. **Price Range Filtering**: Products can be filtered by minimum and maximum price
3. **Field Selection**: API responses include only relevant fields to minimize payload size
4. **Auto-generated IDs**: New products automatically receive incremental, zero-padded IDs
5. **Error Handling**: Comprehensive error handling across all layers
6. **Data Validation**: Ensures data integrity through schema validation

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
```
npm install
```

3. Build the TypeScript code:
```
npm run build
```

4. Start the development server:
```
npm run dev
```


The server will start on http://localhost:3000 by default. The available routes will be logged to the console on startup.

## API Examples

### Get all products
```
GET /api/products
```


### Filter products
```
GET /api/products?name=desk&minPrice=100&maxPrice=500&category=furniture
```


### Get product by ID
```
GET /api/products/00001
```


### Create a new product
```
POST /api/products
Content-Type: application/json

{
  "name": "Office Chair",
  "category": "Furniture",
  "brand": "ErgoMax",
  "price": 249.99,
  "description": "Ergonomic office chair with lumbar support"
}
```


## Technical Notes

- The application uses RxDB's query builder plugin for more flexible querying
- Field selection is implemented using a custom `pickFields` utility function
- Case-insensitive search is achieved using regular expressions with the 'i' flag
- The application includes polyfills for crypto functionality required by RxDB in some environments