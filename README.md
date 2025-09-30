# 🌿 Ember Trees - Cannabis Delivery Platform

> **Senior-Level Professional Cannabis Delivery Platform**
> Built with Next.js 15, TypeScript, Prisma, and comprehensive compliance features

## 🏢 **Platform Overview**

Ember Trees is an enterprise-grade cannabis delivery platform designed for regulatory compliance, scalability, and exceptional user experience. This platform handles the complete cannabis delivery ecosystem from customer ordering to driver delivery with full regulatory compliance.

## 🛠️ **Technology Stack**

### **Core Technologies**
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: tRPC + Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js + JWT
- **Styling**: TailwindCSS + Shadcn/UI
- **State Management**: Zustand + React Query

### **Business-Critical Integrations**
- **Payments**: Stripe
- **Maps & Delivery**: Mapbox GL JS
- **Real-time**: WebSockets (Socket.io)
- **File Storage**: AWS S3
- **Caching**: Redis
- **Queue System**: Bull Queue
- **Search**: Elasticsearch
- **Monitoring**: Sentry + DataDog

## 🏗️ **Architecture Highlights**

### **Multi-Role System**
- **👤 Customers**: Product browsing, ordering, tracking
- **🚗 Drivers**: Delivery management, route optimization
- **🏪 Admins**: Inventory, compliance, analytics
- **👨‍💼 Managers**: Business oversight, reporting

### **Compliance Features**
- ✅ Age verification & ID scanning
- ✅ Seed-to-sale tracking
- ✅ State reporting integration
- ✅ Lab result management
- ✅ Audit trails & logs
- ✅ Tax calculation & compliance

### **Key Business Features**
- 🛒 Advanced product catalog with lab results
- 📍 Real-time delivery tracking
- 💳 Secure payment processing
- 🎯 Loyalty program & rewards
- 📊 Advanced analytics & reporting
- 📱 Mobile-responsive design

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18.17.0 or higher
- PostgreSQL 14 or higher
- Redis server
- npm 9.0.0 or higher

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ember-trees.git
   cd ember-trees
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to access the application.

## 📁 **Project Structure**

```
📦 ember-trees/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API routes
│   ├── 📁 auth/                     # Authentication pages
│   ├── 📁 admin/                    # Admin dashboard
│   ├── 📁 customer/                 # Customer portal
│   └── 📁 driver/                   # Driver interface
├── 📁 src/                          # Source code
│   ├── 📁 components/               # Reusable components
│   ├── 📁 lib/                      # Utilities & configurations
│   ├── 📁 types/                    # TypeScript definitions
│   └── 📁 constants/                # App constants
├── 📁 database/                     # Database schema & migrations
├── 📁 docs/                         # Documentation
├── 📁 tests/                        # Test suites
└── 📁 config/                       # Configuration files
```

## 💻 **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run test suite
npm run type-check   # TypeScript checking
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### **Code Quality**
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest**: Unit testing
- **Playwright**: E2E testing

## 🔐 **Security & Compliance**

### **Data Protection**
- **HIPAA Compliance**: Medical cannabis data protection
- **PCI Compliance**: Secure payment processing
- **End-to-end Encryption**: All sensitive data encrypted
- **Audit Logging**: Complete user action tracking

### **Cannabis Compliance**
- **State Integration**: Automatic state reporting
- **Metrc Integration**: Seed-to-sale tracking
- **Lab Results**: Product testing verification
- **Age Verification**: ID scanning & validation

---

**Built with ❤️ for the cannabis industry**
