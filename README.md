# Elixirr Essence - Complete E-Commerce Platform

A modern e-commerce platform with a React frontend, Express.js backend, PostgreSQL database, and an admin panel for product management and image uploads.

## Project Structure

```
elixirr-essence/
├── client/                    # Customer and admin React apps
│   ├── admin/                 # Admin panel (separate React app)
│   │   ├── src/
│   │   │   ├── components/    # Admin UI components
│   │   │   ├── pages/         # Admin pages (Dashboard, Products, Orders)
│   │   │   ├── context/       # Auth context
│   │   │   ├── utils/         # API client
│   │   │   └── types/         # Type definitions
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── src/                   # Main app source
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main app pages (Home, Shop, Cart, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # React context providers
│   │   ├── data/              # Static fallback data
│   │   └── types/             # TypeScript type definitions
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # Express.js API server
│   ├── config/                # Database configuration
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth, error handling, upload
│   ├── routes/                # API route definitions
│   ├── uploads/               # Uploaded images
│   ├── server.js              # Main server file
│   ├── seed.js                # Database seeding script
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

### Frontend (Customer App)
- Modern React 19 + TypeScript + Tailwind CSS
- Product catalog with search, filters, and sorting
- Shopping cart with persistent storage
- Checkout flow with order confirmation
- Product detail pages with image galleries
- Responsive design with mobile menu
- WhatsApp integration
- Newsletter subscriptions

### Backend (API Server)
- Express.js with PostgreSQL database
- JWT-based authentication for admin users
- Role-based access control (admin, editor, customer)
- Product CRUD operations
- Image upload with automatic optimization (Sharp)
- Order management with status tracking
- CORS and Helmet security
- Rate limiting

### Admin Panel
- Separate React application for product/order management
- Dashboard with statistics
- Product list with search, pagination, and delete
- Product creation/editing with image upload
- Order management with status updates
- Secure authentication with token persistence

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (local or cloud - Supabase, Heroku Postgres, etc.)

### 1. Setup Database

Create a PostgreSQL database and update the `.env` file in the backend folder:

```powershell
cd backend
Copy-Item .env.example .env
# Edit .env with your PostgreSQL connection details
```

In Command Prompt, use `copy .env.example .env` instead.

### 2. Install Dependencies

```powershell
cd backend; npm install
cd ..\client; npm install
cd admin; npm install
```

### 3. Initialize Database

```powershell
cd ..\..\backend; npm run seed
```

This creates all necessary tables and seeds the default admin account.

### 4. Run the Applications

**Terminal 1 - Backend:**
```powershell
cd backend; npm run dev
```

**Terminal 2 - Admin Panel:**
```powershell
cd client\admin; npm run dev
```

**Terminal 3 - Frontend:**
```powershell
cd client; npm run dev
```

## Vercel deployment

Deploy the customer storefront and admin panel as separate Vercel projects:

1. Set the customer project's **Root Directory** to `client`.
2. Set the admin project's **Root Directory** to `client/admin`.
3. In each Vercel project's **Settings → Environment Variables**, add `VITE_API_URL` with the value `https://elixirr-backend.vercel.app/api` for Production, Preview, and Development, then redeploy.
4. Set the backend `CORS_ORIGIN` to both Vercel URLs, separated by commas.

Each app includes a `vercel.json` SPA rewrite so direct links such as `/product/...` and `/admin/login` continue to work after refresh. The Express/PostgreSQL backend must be deployed separately and must use a managed PostgreSQL database.

### Seed the production admin

The production database needs an admin account before `/admin/login` can work. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a private `ADMIN_SEED_KEY` in the backend Vercel project's environment variables, redeploy, then run the provisioning endpoint once:

```powershell
$body = '{"email":"admin@your-domain.com","password":"use-a-strong-password","name":"Elixirr Admin"}'
$headers = @{ "x-admin-seed-key" = "your-private-seed-key" }
Invoke-RestMethod -Uri "https://elixirr-backend.vercel.app/api/admin/seed" -Method Post -Headers $headers -ContentType "application/json" -Body $body
```

Use the same email and password at the admin login page. If the account already exists, this authorized endpoint updates its password.

## API Documentation

### Products
- `GET /api/products` - Get products with pagination, search, filter
- `GET /api/products/categories` - Get all categories
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current user profile
- `PUT /api/admin/profile` - Update profile
- `PUT /api/admin/change-password` - Change password

The admin application is available at `http://localhost:3001/admin/login`.

### Image Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `DELETE /api/upload/image` - Delete image

### Orders
- `POST /api/orders` - Create order (public)
- `GET /api/orders` - Get orders (admin/editor)
- `GET /api/orders/stats` - Get order statistics
- `PUT /api/orders/:id` - Update order status

## Default Admin Credentials

After seeding:
- Email: `admin@elixirr-essence.com`
- Password: `admin123`

## Technologies Used

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, React Router
- **Backend:** Express.js, PostgreSQL, JWT, Sharp (image processing)
- **Admin:** React 19, TypeScript, Tailwind CSS, Vite, React Router
- **Styling:** Tailwind CSS, Framer Motion, Lucide React

## Security Notes

- Change the default JWT secret in production
- Use HTTPS in production
- Set proper CORS origins
- Regularly update dependencies
- Use environment variables for all secrets