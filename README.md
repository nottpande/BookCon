# BookCon 📚

**BookCon** is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) for managing an online bookstore. The application supports multiple roles with distinct access and capabilities for users, sellers, and admins. It features scalable models, JWT-based authentication, and role-based access control.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Roles](#roles)
4. [Technology Stack](#technology-stack)
5. [Setup Instructions](#setup-instructions)
6. [Authentication](#authentication)
7. [Why Vite Over CRA](#why-vite-over-cra)
8. [Scalability](#scalability)
9. [Models Overview](#models-overview)
10. [Routes](#routes)
11. [Future Plans](#future-plans)

---

## Overview

BookCon is an online bookstore where:
- **Guests** can browse books.
- **Sellers** can add, update, and remove books.
- **Admins** can manage users, books, and orders.
- **Buyer** can browse and buy books.

It is designed to be scalable and flexible, providing authentication and authorization mechanisms through JWT, and handling various types of users with different permissions. The backend is powered by MongoDB and Express, while the frontend leverages React and Vite for a smoother developer experience.

---

## Features

- **JWT Authentication**: Secure authentication using JSON Web Tokens stored in cookies.
- **Role-Based Access Control**: Different dashboards and functionalities for Buyers, Sellers, and Admins.
- **Book Listings**: Sellers can add books with attributes such as title, author, price, and description.
- **Form Validation**: Implemented on login, signup, and book entry forms.
- **Admin Dashboard**: Admins can view, update, and delete books or sellers.
- **Scalable Models**: MongoDB models designed with scalability in mind, utilizing references to other models.

---

## Roles

1. **Guest**: Can browse the available books but cannot purchase or interact with them beyond viewing.
2. **Buyer**: Can browse and add books to the cart, make purchases, and view order history.
3. **Seller**: Can list new books, update or remove their listings, and track sales.
4. **Admin**: Has full control over the platform, including the ability to manage users, books, and listings.

---

## Technology Stack

- **Frontend**: 
  - **React** (via Vite for faster builds)
  - **Tailwind CSS** for styling
- **Backend**: 
  - **Node.js** and **Express**
  - **MongoDB** for the database
- **Authentication**: JWT-based with token stored in cookies
- **Scalable Architecture**: Modular and reusable codebase designed for future expansion.

---

## Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/BookCon.git
cd bookcon
```
### 2. Install dependencies:

```bash
npm install
```
### 3. Set up environment variables:
```bash
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Authentication

- **JWT** is used for authentication and stored in cookies.
- Upon login or signup, a token is generated and attached to the user's session.
- **Role-based redirection**: After login, users are redirected to their respective dashboard based on their role (Buyer, Seller, Admin).
- Authentication middleware ensures that routes are protected and accessible only by the intended users.

---

## Why Vite Over CRA

Vite offers several advantages over Create React App (CRA), which is why it was chosen for this project:

1. **Faster Builds**: Vite uses esbuild for bundling, resulting in significantly faster builds compared to CRA.
2. **Hot Module Replacement (HMR)**: Vite provides instant updates during development, making the development experience more efficient.
3. **Smaller Bundle Size**: Vite produces smaller production builds, leading to better performance.
4. **Modern Features**: Vite uses modern browser standards and ES modules by default, offering better optimization.

---

## Scalability

BookCon is designed with scalability in mind:

1. **Modular Models**: The application uses MongoDB models that reference each other, ensuring that new features can be added without affecting existing functionalities.
2. **Role Management**: The application supports multiple roles (Guest, Buyer, Seller, Admin), and new roles or permissions can be added easily.
3. **Backend Architecture**: The use of Express and MongoDB allows for easy scaling, making it suitable for both small and large datasets.
4. **Frontend Optimization**: React and Vite ensure that the frontend remains fast and responsive, even as the number of components grows.

---

## Models Overview

1. **Book**: This model contains the schema of the book.
2. **Message**: This model contains the schema for user messages.
3. **Order**: This model defines the structure of order details.
4. **Seller**: This model outlines the schema for seller information.
5. **User**: This model contains the schema for user profiles.

## Roles Overview

1. **Book**: Handles all operations related to books, such as adding, updating, or retrieving book information.
2. **Cart**: Manages cart functionalities, including adding and removing items, and viewing cart details.
3. **Favourite**: Manages users' favorite items, allowing them to save and retrieve their favorite books.
4. **Message**: Handles messaging between users, including sending, receiving, and deleting messages.
5. **Order**: Manages order placement, retrieval, and order history for users.
6. **User**: Handles user-related operations like profile creation, updates, and retrieving user details.
7. **UserAuth**: Manages user authentication, including login, registration, and token management.

## Team Members
Amodini A P
Aditya Pande
Sravya Sri Mallampalli
Parth Chandel
Sathyam A

