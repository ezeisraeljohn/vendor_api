# Vendor API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21+-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13+-blue.svg)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-v6.37+-orange.svg)](https://sequelize.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A robust RESTful API for vendor and payment management built with Node.js, Express.js, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Authentication & Authorization**: JWT-based authentication system
- **Vendor Management**: CRUD operations for vendor profiles
- **Payment Processing**: Comprehensive payment tracking and management
- **Database Integration**: PostgreSQL with Sequelize ORM
- **Input Validation**: Request validation using Yup schemas
- **Error Handling**: Centralized error handling middleware
- **Logging**: Winston-based logging system
- **Process Management**: PM2 integration for production deployment
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Support for multiple environments

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Yup
- **Password Hashing**: bcryptjs
- **Logging**: Winston
- **Process Manager**: PM2
- **Development**: Nodemon, Babel

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ezeisraeljohn/vendor_api.git
   cd vendor_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. **Create environment file**

   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=8080
   HOST=localhost

   # Database Configuration
   DB_DEV_HOST=localhost
   DB_DEV_USERNAME=your_db_username
   DB_DEV_PASSWORD=your_db_password
   DB_DEV_DATABASE=vendor_api_dev
   DB_DEV_TYPE=postgres
   DB_DEV_PORT=5432

   # Production Database (for deployment)
   DATABASE_URL=postgresql://username:password@host:port/database

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

## 🗄️ Database Setup

1. **Create database**

   ```bash
   npm run db:create
   ```

2. **Run migrations**

   ```bash
   npm run db:migrate
   ```

3. **Seed database (optional)**
   ```bash
   npm run db:seed
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` with auto-reload enabled.

### Production Mode

```bash
npm run prod
```

### Using PM2 (Production)

```bash
npm run start:prod
```

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Vendor Endpoints

#### Get All Vendors

```http
GET /vendors
Authorization: Bearer <token>
```

#### Get Vendor by ID

```http
GET /vendors/:id
Authorization: Bearer <token>
```

#### Update Vendor

```http
PUT /vendors/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  "lastName": "Updated Last Name",
  "phone": "+1234567890",
  "address": "Updated Address"
}
```

#### Delete Vendor

```http
DELETE /vendors/:id
Authorization: Bearer <token>
```

### Payment Endpoints

#### Create Payment

```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "amount": 100.50,
  "description": "Payment for services",
  "currency": "USD",
  "paidAt": "2024-01-15T10:00:00Z"
}
```

#### Get All Payments

```http
GET /payments
Authorization: Bearer <token>
```

#### Get Payments by Vendor ID

```http
GET /payments/vendor/:vendorId
Authorization: Bearer <token>
```

#### Get Payment by ID

```http
GET /payments/:id
Authorization: Bearer <token>
```

#### Delete Payment

```http
DELETE /payments/:id
Authorization: Bearer <token>
```

## 📁 Project Structure

```
vendor_api/
├── app/
│   ├── application.js          # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── config.js          # Database configuration
│   ├── middlewares/
│   │   ├── authenticate.js    # JWT authentication middleware
│   │   ├── errorHandler.js    # Error handling middleware
│   │   └── validation.js      # Request validation middleware
│   ├── models/
│   │   ├── index.js          # Sequelize models index
│   │   ├── users.js          # User model
│   │   └── payments.js       # Payment model
│   ├── resources/
│   │   ├── Authentication/
│   │   │   ├── Controllers/  # Auth controllers
│   │   │   ├── Routes/       # Auth routes
│   │   │   └── Validations/  # Auth validation schemas
│   │   ├── Vendor/
│   │   │   ├── Controllers/  # Vendor controllers
│   │   │   ├── Routes/       # Vendor routes
│   │   │   └── Validations/  # Vendor validation schemas
│   │   └── Payments/
│   │       ├── Controllers/  # Payment controllers
│   │       ├── Routes/       # Payment routes
│   │       └── Validations/  # Payment validation schemas
│   ├── routers/
│   │   └── index.js          # Route aggregation
│   └── utils/
│       └── logger.js         # Winston logger configuration
├── ecosystem.config.js        # PM2 configuration
├── package.json
└── README.md
```

## 🔧 Development

### Available Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build the application using Babel        |
| `npm run prod`       | Start production server                  |
| `npm start`          | Start using PM2 (production)             |
| `npm run start:prod` | Start production with PM2                |
| `npm run stop:prod`  | Stop production PM2 process              |

### Database Scripts

| Script                       | Description            |
| ---------------------------- | ---------------------- |
| `npm run db:create`          | Create database        |
| `npm run db:drop`            | Drop database          |
| `npm run db:migrate`         | Run migrations         |
| `npm run db:seed`            | Run seeders            |
| `npm run migration:generate` | Generate new migration |
| `npm run seed:generate`      | Generate new seeder    |

### Code Style and Standards

- Follow ES6+ standards
- Use meaningful variable and function names
- Implement proper error handling
- Write comprehensive comments
- Maintain consistent indentation (2 spaces)

### Adding New Features

1. Create feature branch from `main`
2. Implement feature following existing patterns
3. Add proper validation schemas
4. Include error handling
5. Update API documentation
6. Submit pull request

## 🚀 Deployment

### Using PM2

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start with PM2**

   ```bash
   npm run start:prod
   ```

3. **Save PM2 configuration**
   ```bash
   npm run sync:server
   ```

### Environment Variables for Production

Ensure all required environment variables are set in your production environment:

- `NODE_ENV=production`
- `DATABASE_URL` (PostgreSQL connection string)
- `JWT_SECRET`
- `PORT` (optional, defaults to 8080)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ezra Israel John**

- GitHub: [@ezeisraeljohn](https://github.com/ezeisraeljohn)
- Project Link: [https://github.com/ezeisraeljohn/vendor_api](https://github.com/ezeisraeljohn/vendor_api)

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/ezeisraeljohn/vendor_api/issues).

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

Made with ❤️ by [Ezra Israel John](https://github.com/ezeisraeljohn)
