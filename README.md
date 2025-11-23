# E-Commerce Platform

A simple e-commerce platform with a Go backend (Gin + GORM) and React frontend.

## Features

- User signup and login with token-based authentication
- Item management
- Shopping cart functionality
- Order placement
- User-specific cart and order history

## Tech Stack

**Backend:**
- Go 1.21+
- Gin (Web Framework)
- GORM (ORM)
- SQLite (Database)
- bcrypt (Password Hashing)

**Frontend:**
- React 18
- CSS3

## Project Structure

```
├── backend/
│   ├── main.go              # Entry point
│   ├── models/              # Database models
│   ├── handlers/            # API handlers
│   ├── middleware/          # Auth middleware
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
go mod download
```

3. Run the server:
```bash
go run main.go
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### User Endpoints
- `POST /users` - Create a new user
- `GET /users` - List all users
- `POST /users/login` - Login (returns token)

### Item Endpoints
- `POST /items` - Create an item
- `GET /items` - List all items

### Cart Endpoints (Requires Authentication)
- `POST /carts` - Add item to cart
- `GET /carts` - Get user's cart

### Order Endpoints (Requires Authentication)
- `POST /orders` - Create order from cart
- `GET /orders` - Get user's order history

## Usage Flow

### 1. Create Test Data

First, create some items using the API:

```bash
# Create items
curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"High-performance laptop","price":999.99}'

curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","description":"Wireless mouse","price":29.99}'

curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","description":"Mechanical keyboard","price":79.99}'
```

### 2. Create a User

```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### 3. Login

```bash
curl -X POST http://localhost:8080/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

This returns a token. Use this token for authenticated requests.

### 4. Add Items to Cart

```bash
curl -X POST http://localhost:8080/carts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"item_id":1}'
```

### 5. View Cart

```bash
curl -X GET http://localhost:8080/carts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Create Order

```bash
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"cart_id":1}'
```

### 7. View Orders

```bash
curl -X GET http://localhost:8080/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Frontend Usage

1. Open `http://localhost:3000` in your browser
2. Login with your credentials (username: testuser, password: password123)
3. Browse items and click on any item to add it to your cart
4. Click "Cart" to view cart items
5. Click "Order History" to view past orders
6. Click "Checkout" to convert your cart to an order

## Authentication

The API uses token-based authentication. After login, include the token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Database

The application uses SQLite with the database file `ecommerce.db` created automatically in the backend directory.

## Notes

- A user can only have one active cart at a time
- A user can only be logged in from one device (single token)
- Cart is cleared after creating an order
- All cart and order operations require authentication

## Postman Collection

Import the `postman_collection.json` file into Postman to test all API endpoints.
