# E-Commerce REST API using Node.js

## Use of the app
To use the app, you can use a tool like Postman to send HTTP requests to the API endpoints.

You have to first signup as an admin, then you can login and add products (with the token).
You can see al the products using the get action. 

To be able to create an invoice, you have to signup again as a user, login, see products and add an invoice using a product that already exists. 

Here is an example of an input:
{
    "date": "2025-03-31T10:00:00.000Z",
    "items": [
        { "productName": "Wireless Headphones", "model": "WH-1000XM5", "quantity": 2 },
        { "productName": "Smartwatch Pro", "model": "Forerunner 965", "quantity": 1 }
    ]
}

## Functionalitites

### User Management
User registration & login (JWT or OAuth authentication)
Role-based access control (Admin, Customer, Vendor)
Profile management

### Product Management
Create, update, delete products
Categories and tags for filtering

### Cart & Checkout
Add/remove items from the cart
Calculate total cost

### Order & Payment System
Generate invoices

### API & Security
RESTful API with Express.js
Middleware for authentication and authorization
Rate limiting & validation


## Technologies & Resources

Node.js (runtime environment)
Express.js (framework for APIs)
JWT/OAuth (authentication & security)
Multer (for handling file uploads, if images are needed)
Env config package


Database
MongoDB (NoSQL, using Mongoose for schemas)


## Testing & Debugging (Optional)

Postman (for API testing)
Jest or Mocha/Chai (unit testing)

