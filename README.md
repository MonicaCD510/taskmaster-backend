# TaskMaster Backend

TaskMaster Backend is a secure Express and MongoDB API for user authentication and private bookmark management.

## Features

- User registration
- User login
- Password hashing
- JWT authentication
- Protected bookmark routes
- User-specific bookmark ownership
- Create, read, update, and delete bookmarks

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token
- dotenv

## API Routes

### Users

POST /api/users/register  
POST /api/users/login  

### Bookmarks

POST /api/bookmarks  
GET /api/bookmarks  
GET /api/bookmarks/:id  
PUT /api/bookmarks/:id  
DELETE /api/bookmarks/:id  

All bookmark routes require a Bearer Token.

## Notes

This project uses JWT authentication to protect private bookmark data. Users can only view, update, or delete bookmarks that belong to their own account.