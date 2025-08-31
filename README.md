# Hotel Management API

A Node.js RESTful API for managing hotel staff and menu items using Express and MongoDB.

## Features

- Manage hotel staff (`Person`) with CRUD operations
- Manage menu items (`Menu`) with CRUD operations
- Filter staff by work type (chef, waiter, manager)
- Filter menu items by taste (spicy, sweet, sour, salty, umami)
- MongoDB integration via Mongoose

## Project Structure

```
.
├── db.js
├── models/
│   ├── Menu.js
│   └── Person.js
├── routes/
│   ├── menuRoutes.js
│   └── personRoutes.js
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB running locally (e.g., `mongodb://localhost:27017/hotels`)

### Installation

```sh
npm install
```

### Running the Server

```sh
node server.js
```

Or with nodemon for development:

```sh
npx nodemon server.js
```

## API Endpoints

### Person

- `POST /person` - Add a new staff member
- `GET /person` - Get all staff members
- `GET /person/:workType` - Get staff by work type (`chef`, `waiter`, `manager`)
- `PUT /person/:id` - Update staff member by ID
- `DELETE /person/:id` - Delete staff member by ID

### Menu

- `POST /menu` - Add a new menu item
- `GET /menu` - Get all menu items
- `GET /menu/:taste` - Get menu items by taste (`spicy`, `sweet`, `sour`, `salty`, `umami`)
- `PUT /menu/:id` - Update menu item by ID
- `DELETE /menu/:id` - Delete menu item by ID