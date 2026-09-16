# Elixirr Essence Backend

Express.js backend for the Elixirr Essence e-commerce platform with admin functionality and image upload capabilities.

## Features

- **Product Management** - Full CRUD operations for products
- **Admin Authentication** - JWT-based authentication with role-based access control
- **Image Upload** - Optimized image upload with automatic resizing (Sharp)
- **Order Management** - Order tracking and status updates
- **PostgreSQL** - pg-promise database access with automatic schema initialization

## Installation

1. Copy the `.env.example` file to `.env` and update the values:
   ```powershell
   Copy-Item .env.example .env
   ```

   In Command Prompt, use `copy .env.example .env` instead.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server in development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string, or use `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`
- `DATABASE_SSL` - Set to `false` only for local PostgreSQL without SSL
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - JWT expiration time
- `CORS_ORIGIN` - Comma-separated list of allowed origins
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password

## Vercel deployment

The backend includes [vercel.json](./vercel.json) and can be deployed as a Vercel Node function:

1. Create a separate Vercel project with the repository root set to `backend`.
2. Add the environment variables above, including a managed PostgreSQL connection.
3. Set `CORS_ORIGIN` to the deployed customer and admin frontend URLs.
4. Set both frontend `VITE_API_URL` values to this deployment URL followed by `/api`.

The root health endpoint does not require a database connection. Database-backed `/api/*` requests initialize a cached PostgreSQL connection on demand, so a database configuration issue no longer makes the entire deployment unavailable.

Uploaded files are stored locally for development. Use object storage for persistent production uploads because Vercel's filesystem is ephemeral.

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, filter, sort)
- `GET /api/products/categories` - Get all product categories
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Admin
- `POST /api/admin/login` - Login as admin
- `GET /api/admin/me` - Get current admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/change-password` - Change admin password
- `POST /api/admin/seed` - Seed initial admin account

### Upload
- `POST /api/upload/image` - Upload single image (admin/editor)
- `POST /api/upload/images` - Upload multiple images (admin/editor)
- `DELETE /api/upload/image` - Delete uploaded image (admin/editor)

### Orders
- `POST /api/orders` - Create new order (public)
- `GET /api/orders` - Get all orders (admin/editor)
- `GET /api/orders/stats` - Get order statistics (admin/editor)
- `GET /api/orders/:id` - Get order by ID (admin/editor)
- `PUT /api/orders/:id` - Update order status (admin/editor)
- `DELETE /api/orders/:id` - Delete order (admin only)

## Default Admin Credentials

After seeding, the default admin account is:
- Email: `admin@elixirr-essence.com`
- Password: `admin123`