# Hotel Management API

A professional Node.js RESTful API for managing hotel staff and menu items, featuring authentication with JWT, built using Express and MongoDB.

## Features

- **Authentication**: Secure endpoints with JWT-based authentication
- **Staff Management**: CRUD operations for hotel staff (`Person`)
- **Menu Management**: CRUD operations for menu items (`Menu`)
- **Filtering**: Filter staff by work type and menu by taste
- **MongoDB Integration**: Data persistence via Mongoose

## Project Structure

```text
.
├── db.js
├── jwt.js
├── auth.js
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

## Authentication

All protected endpoints require a valid JWT token in the `Authorization` header.

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

Include this token in the `Authorization` header for protected requests:

```
Authorization: Bearer <token>
```

## API Endpoints

### Person

- `POST /person` - Add a new staff member *(protected)*
- `GET /person` - Get all staff members *(protected)*
- `GET /person/:workType` - Get staff by work type *(protected)*
- `PUT /person/:id` - Update staff member by ID *(protected)*
- `DELETE /person/:id` - Delete staff member by ID *(protected)*

### Menu

- `POST /menu` - Add a new menu item *(protected)*
- `GET /menu` - Get all menu items *(protected)*
- `GET /menu/:taste` - Get menu items by taste *(protected)*
- `PUT /menu/:id` - Update menu item by ID *(protected)*
- `DELETE /menu/:id` - Delete menu item by ID *(protected)*

## Usage Examples

### Add a New Staff Member

```http
POST /person
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30,
  "work": "chef",
  "salary": 35000
}
```

### Get All Menu Items

```http
GET /menu
Authorization: Bearer <token>
```

### Example Error (Unauthorized)

```json
{
  "error": "Unauthorized"
}
```

## JWT & Auth Implementation

- **jwt.js**: Handles JWT token creation and verification.
- **auth.js**: Middleware to protect routes and validate tokens.

## Visualization

- **Staff**: Filter by work type (chef, waiter, manager)
- **Menu**: Filter by taste (spicy, sweet, sour, salty, umami)
- **Authentication**: Secure all endpoints with JWT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

> Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API endpoints.