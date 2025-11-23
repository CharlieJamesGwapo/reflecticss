#!/bin/bash

# Setup Environment Variables - Bash Script
# Run this script to automatically create .env files

echo "Setting up environment variables..."

# Backend .env
cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_r5ZaRum4Adyv@ep-dawn-tree-ad22t6vc-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
PORT=5000
NODE_ENV=development
EOF

echo "✅ backend/.env created"

# Frontend .env
cat > frontend/.env << 'EOF'
REACT_APP_API_URL=http://localhost:5000
EOF

echo "✅ frontend/.env created"

echo ""
echo "Environment variables setup complete!"
echo "Files created:"
echo "  • backend/.env"
echo "  • frontend/.env"
