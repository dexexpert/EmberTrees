# 🚀 Ember Trees - Deployment Guide

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] Production environment variables configured
- [ ] Database production instance ready (PostgreSQL)
- [ ] Redis instance configured for caching/queues
- [ ] AWS S3 bucket created for file storage
- [ ] CDN configured for static assets

### Compliance Requirements
- [ ] Cannabis delivery license obtained
- [ ] State reporting API credentials configured
- [ ] METRC integration credentials ready
- [ ] Age verification service API keys obtained
- [ ] Payment processing (Stripe) account verified

### Security Configuration
- [ ] SSL certificate configured
- [ ] HTTPS redirect enabled
- [ ] Security headers implemented
- [ ] Rate limiting configured
- [ ] Firewall rules set up

## 🌐 Deployment Platforms

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Configure environment variables in Vercel dashboard
# Required variables:
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - STRIPE_SECRET_KEY
# - AWS_ACCESS_KEY_ID
# - REDIS_URL
# - METRC_API_KEY
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Database Migration

```bash
# Run database migrations
npx prisma migrate deploy

# Seed initial data
npm run db:seed

# Generate Prisma client for production
npx prisma generate
```

## 🔧 Production Configuration

### Environment Variables (Production)

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com

# Database
DATABASE_URL="postgresql://user:password@host:5432/ember_trees_prod"

# Security
NEXTAUTH_SECRET="your-production-secret-32-chars-long"
JWT_SECRET="your-jwt-secret-here"
ENCRYPTION_KEY="your-encryption-key-here"

# Cannabis Compliance
CANNABIS_LICENSE_NUMBER="your-license-number"
METRC_API_KEY="your-metrc-api-key"
METRC_USER_KEY="your-metrc-user-key"
STATE_REPORTING_API_KEY="your-state-api-key"

# Payment Processing
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloud Services
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_S3_BUCKET_NAME="ember-trees-prod-assets"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
```

### Performance Optimization

```bash
# Enable compression
# Configure in next.config.js
compress: true

# Enable static optimization
# Configure ISR for product pages
revalidate: 3600 # 1 hour

# Database optimization
# Configure connection pooling
# Set up read replicas for analytics
```

## 📊 Monitoring & Logging

### Application Monitoring
- **Sentry**: Error tracking and performance monitoring
- **DataDog**: Infrastructure and application metrics
- **Vercel Analytics**: Web vitals and performance

### Compliance Monitoring
- **Audit Logs**: All user actions logged for compliance
- **METRC Integration**: Real-time inventory tracking
- **Age Verification**: All verification attempts logged

### Alerts Configuration
```yaml
# Alert conditions
- Order processing failures
- Payment processing issues
- Age verification system down
- METRC API connection failures
- High error rates (>1%)
- Slow response times (>2s)
```

## 🔐 Security Hardening

### Network Security
```nginx
# Nginx configuration (if using)
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
    }
}
```

### Application Security
- HTTPS only (HSTS enabled)
- CSP headers configured
- Rate limiting on all APIs
- Input validation and sanitization
- SQL injection protection (Prisma ORM)
- XSS protection

## 📋 Compliance Deployment

### Legal Requirements
1. **Cannabis License Verification**
   - Ensure all licenses are valid and current
   - Configure license numbers in environment

2. **Age Verification System**
   - Test ID verification service integration
   - Verify compliance with state requirements

3. **Seed-to-Sale Tracking**
   - METRC integration functional
   - All inventory movements tracked

4. **Tax Compliance**
   - Tax rates configured correctly
   - Reporting system functional

### Compliance Testing
```bash
# Run compliance test suite
npm run test:compliance

# Verify age verification flow
npm run test:age-verification

# Test METRC integration
npm run test:metrc

# Validate tax calculations
npm run test:taxes
```

## 🚦 Go-Live Process

### Pre-Launch (1 week before)
- [ ] Full application testing in staging
- [ ] Load testing completed
- [ ] Security penetration testing
- [ ] Compliance audit completed
- [ ] Payment processing tested
- [ ] Backup systems verified

### Launch Day
1. **Database Migration**
   ```bash
   npx prisma migrate deploy
   npm run db:seed:prod
   ```

2. **Application Deployment**
   ```bash
   vercel --prod
   # or docker deployment
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Verification Steps**
   - [ ] Application loads correctly
   - [ ] Authentication works
   - [ ] Payment processing functional
   - [ ] Age verification system operational
   - [ ] METRC integration connected
   - [ ] Monitoring alerts active

### Post-Launch (First 24 hours)
- Monitor error rates
- Check compliance systems
- Verify payment processing
- Monitor performance metrics
- Review audit logs

## 📱 Mobile App Deployment (Future)

### React Native Setup
```bash
# Build iOS app
cd mobile
npx react-native run-ios --configuration Release

# Build Android app
npx react-native run-android --variant=release
```

### App Store Requirements
- Cannabis app approval (where legal)
- Age verification in app
- Compliance with platform policies

---

**🏛️ Legal Notice**: Ensure compliance with all local, state, and federal cannabis regulations before deployment. This platform is designed for use in jurisdictions where cannabis delivery is legal.