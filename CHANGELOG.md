# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-09

### Added
- Automatic Content Security Policy (CSP) configuration for Umami iframe
- Plugin now automatically extracts and configures CSP headers based on plugin configuration
- No manual middleware configuration needed anymore
- Server API endpoint to fetch configuration in admin panel
- Support for configuring Umami URL via plugin config or environment variable

### Changed
- **BREAKING:** Configuration moved from `STRAPI_ADMIN_UMAMI_URL` environment variable to plugin config
- Server plugin now includes `register` hook to configure CSP middleware
- Admin panel now fetches configuration via API endpoint
- Improved error handling and logging for invalid Umami URLs
- Better user feedback when configuration is missing

### Migration from 1.0.0

**Important:** Configuration has changed. Follow these steps:

#### 1. Update Plugin Configuration

**Before (1.0.0):**
```env
# .env
STRAPI_ADMIN_UMAMI_URL=https://umami.yourdomain.com/share/xxx/website
```

```typescript
// config/plugins.ts
'umami-analytics': {
  enabled: true,
},
```

**After (1.1.0):**
```env
# .env
UMAMI_URL=https://umami.yourdomain.com/share/xxx/website
```

```typescript
// config/plugins.ts
export default ({ env }) => ({
  'umami-analytics': {
    enabled: true,
    config: {
      umamiUrl: env('UMAMI_URL'),
    },
  },
});
```

#### 2. Remove Manual CSP Configuration

If you're upgrading from 1.0.0, you can now remove the manual CSP configuration from your `config/middlewares.ts`:

**Before (manual configuration):**
```typescript
const frameSources = [
  "'self'",
  'https://umami.lizarzaburu.dev',
];

const frameAncestors = ["'self'", 'http://localhost:1337'];

export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-src': frameSources,
          'frame-ancestors': frameAncestors,
          'connect-src': ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
        },
      },
    },
  },
  // ... rest of middlewares
];
```

**After (automatic configuration):**
```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security', // Plugin handles Umami CSP automatically
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

The plugin will automatically add the Umami origin to `frame-src` based on your `STRAPI_ADMIN_UMAMI_URL` environment variable.

## [1.0.0] - 2026-01-09

### Added
- Initial release
- Display Umami analytics in Strapi admin panel
- Permission-based access control
- Multilingual support (English/German)
- Strapi 5 compatibility
- GitHub Actions workflow for automatic npm publishing
