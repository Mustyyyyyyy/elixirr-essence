#!/usr/bin/env bash
# Setup script for Elixirr Essence

echo "Setting up Elixirr Essence..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Copy env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Backend .env created. Please update with your database credentials."
fi

# Install client dependencies
echo "Installing client dependencies..."
cd ../client
npm install

# Copy env files
if [ ! -f .env ]; then
    cp .env.example .env
fi
if [ ! -f admin/.env ]; then
    cp admin/.env.example admin/.env
fi

echo "Installing admin dependencies..."
cd admin
npm install
cd ..

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Run: cd backend && npm run seed"
echo "3. Start the services: ./start.sh"
echo "4. Open admin login: http://localhost:3001/admin/login"