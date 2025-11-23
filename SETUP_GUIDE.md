# Quick Setup Guide

## Prerequisites

- Go 1.21 or higher
- Node.js 16 or higher
- npm or yarn

## Quick Start

### Terminal 1 - Backend

```bash
cd backend
go mod download
go run main.go
```

Backend runs on http://localhost:8080

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

## Create Test Data

Run these commands to populate the database with sample items:

```bash
# Create sample items
curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"High-performance laptop","price":999.99}'

curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","description":"Wireless mouse","price":29.99}'

curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","description":"Mechanical keyboard","price":79.99}'

curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","description":"4K monitor","price":399.99}'

# Create a test user
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Test the Application

1. Open http://localhost:3000
2. Login with:
   - Username: `testuser`
   - Password: `password123`
3. Click on items to add them to cart
4. Click "Cart" to view cart items
5. Click "Checkout" to place an order
6. Click "Order History" to view past orders

## API Testing with Postman

1. Import `postman_collection.json` into Postman
2. The collection includes all API endpoints
3. After running the "Login" request, the token is automatically saved
4. All authenticated requests will use the saved token

## Troubleshooting

**Backend won't start:**
- Make sure port 8080 is not in use
- Run `go mod tidy` to fix dependencies

**Frontend won't start:**
- Delete `node_modules` and run `npm install` again
- Make sure port 3000 is not in use

**CORS errors:**
- Make sure backend is running on port 8080
- Check that CORS middleware is enabled in main.go

**Login fails:**
- Make sure you created a user first
- Check username and password are correct
