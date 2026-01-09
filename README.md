# Umami Analytics Plugin

A Strapi plugin that displays Umami analytics in the admin panel with role-based access control.

## Features

- 🔒 Permission-based access control
- 📊 Embeds Umami share URL directly in admin panel
- 🌐 Multilingual (English/German)
- ⚡ Strapi 5 compatible
- 🛡️ Automatic Content Security Policy (CSP) configuration

## Installation

```bash
npm install @lizarzaburu/strapi-plugin-umami-analytics
```

## Setup

### 1. Get your Umami Share URL

1. Log into your Umami dashboard
2. Go to your website's analytics
3. Click "Share" button
4. Copy the share URL

### 2. Configure Plugin

Configure the plugin in `config/plugins.ts`:

```typescript
export default ({ env }) => ({
  // ... other plugins
  
  'umami-analytics': {
    enabled: true,
    config: {
      umamiUrl: env('UMAMI_URL'),
    },
  },
});
```

### 3. Add Environment Variable

Add your Umami share URL to `.env`:

```env
UMAMI_URL=https://umami.yourdomain.com/share/xxxxxxxx/website-name
```

**Note:** The plugin automatically configures Content Security Policy (CSP) headers to allow the Umami iframe. No manual middleware configuration needed!

### 4. Set Permissions

1. Go to **Settings** → **Roles** in Strapi admin
2. Select a role (e.g., "Super Admin")
3. Under **Plugins** → **Umami Analytics**, enable "Access Analytics"
4. Save

### 5. View Analytics

The "Analytics" menu item will appear in the sidebar for users with the permission.

## Configuration Options

You can also set the URL directly in the config without using an environment variable:

```typescript
'umami-analytics': {
  enabled: true,
  config: {
    umamiUrl: 'https://umami.yourdomain.com/share/xxxxxxxx/website-name',
  },
},
```

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/lizarzaburu/strapi-plugin-umami-analytics).

## License

MIT License - see [LICENSE](LICENSE) file for details.
