# E-Commerce Backend API

## Overview

This repository contains the backend for an e-commerce application. It is built using Node.js and Express.js with MongoDB as the database. The backend includes functionality for user authentication, product management, shopping cart operations, order processing, and admin management.

## Table of Contents

1. [Database Design](#database-design)
2. [API Endpoints](#api-endpoints)
3. [How to Run](#how-to-run)
4. [Testing](#testing)
5. [Contributing](#contributing)
6. [License](#license)

## Database Design

### User Collection

```json
{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "passwordHash": "String",
  "createdAt": "Date",
  "updatedAt": "Date",
  "addresses": [
    {
      "addressLine1": "String",
      "addressLine2": "String",
      "city": "String",
      "state": "String",
      "zipCode": "String",
      "country": "String",
      "_id": "ObjectId"
    }
  ],
  "orderHistory": [
    {
      "orderId": "ObjectId",
      "orderDate": "Date",
      "totalAmount": "Number",
      "status": "String"
    }
  ]
}
```

### Product Collection

```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number",
  "category": "String",
  "stock": "Number",
  "image": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Shopping Cart Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "totalPrice": "Number",
  "couponCode": "String",
  "discount": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Order Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "orderDate": "Date",
  "status": "String",
  "totalAmount": "Number",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "shippingAddress": {
    "addressLine1": "String",
    "addressLine2": "String",
    "city": "String",
    "state": "String",
    "zipCode": "String",
    "country": "String"
  },
  "paymentDetails": {
    "paymentMethod": "String",
    "paymentStatus": "String",
    "transactionId": "String"
  },
  "tracking": {
    "dispatchDate": "Date",
    "deliveryDate": "Date",
    "currentStatus": "String"
  }
}
```

### Discount Collection

```json
{
  "_id": "ObjectId",
  "code": "String",
  "description": "String",
  "discountPercentage": "Number",
  "validFrom": "Date",
  "validTo": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Endpoints

### User Management

- **Signup**: `POST /api/users/signup`
- **Signin**: `POST /api/users/signin`
- **Get User Info**: `GET /api/users/me`
- **Update Address**: `PUT /api/users/addresses/:addressId`
- **Get Orders**: `GET /api/users/orders`
- **Get Order by ID**: `GET /api/users/orders/:orderId`

### Product Management (Admin Only)

- **Create Product**: `POST /api/products`
- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:productId`
- **Update Product**: `PUT /api/products/:productId`
- **Delete Product**: `DELETE /api/products/:productId`

### Shopping Cart

- **Add Item to Cart**: `POST /api/cart`
- **Update Item Quantity**: `PUT /api/cart/items/:itemId`
- **Remove Item from Cart**: `DELETE /api/cart/items/:itemId`
- **Apply Coupon**: `POST /api/cart/coupon`
- **Checkout**: `POST /api/orders`

### Order Management (Admin Only)

- **Update Order Tracking**: `PUT /api/orders/:orderId/tracking`

## How to Run

### Prerequisites

- Node.js
- MongoDB
- Razorpay (for payment gateway)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`.

## Testing

Use the provided Postman collection to test the API endpoints. You can import the collection using the JSON files provided in the repository.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute.

## License

This project is licensed under the MIT License.