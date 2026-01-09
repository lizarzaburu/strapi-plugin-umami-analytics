# Umami Analytics Plugin

A Strapi plugin that displays Umami analytics in the admin panel with role-based access control.

## Features

- 🔒 Permission-based access control
- 📊 Embeds Umami share URL directly in admin panel
- 🌐 Multilingual (English/German)
- ⚡ Strapi 5 compatible

## Installation

### Install from npm (Recommended)

```bash
npm install @lizarzaburu/strapi-plugin-umami-analytics
```

### Install from GitHub

Alternatively, install directly from GitHub:

```bash
npm install git+ssh://git@github.com:lizarzaburu/strapi-plugin-umami-analytics.git
```

Or using HTTPS (requires GitHub token):

```bash
npm install git+https://github.com/lizarzaburu/strapi-plugin-umami-analytics.git
```

### Install Specific Version

**From npm:**
```bash
npm install @lizarzaburu/strapi-plugin-umami-analytics@1.0.0
```

**From GitHub:**
```bash
npm install git+ssh://git@github.com:lizarzaburu/strapi-plugin-umami-analytics.git#v1.0.0
```

## Setup

### 1. Configure Environment Variable

Add your Umami share URL to `.env`:

```env
STRAPI_ADMIN_UMAMI_URL=https://umami.yourdomain.com/share/xxxxxxxx/website-name
```

**Get your Umami share URL:**
1. Log into your Umami dashboard
2. Go to your website's analytics
3. Click "Share" button
4. Copy the share URL

### 2. Enable Plugin

Enable the plugin in `config/plugins.ts`:

```typescript
export default {
  'umami-analytics': {
    enabled: true,
  },
};
```

### 3. Set Permissions

1. Go to **Settings** → **Roles** in Strapi admin
2. Select a role (e.g., "Super Admin")
3. Under **Plugins** → **Umami Analytics**, enable "Access Analytics"
4. Save

### 4. View Analytics

The "Analytics" menu item will appear in the sidebar for users with the permission.

## Development

### Local Development

If you want to develop the plugin locally:

1. Clone the repository:
   ```bash
   git clone git@github.com:lizarzaburu/strapi-plugin-umami-analytics.git
   cd strapi-plugin-umami-analytics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Link the plugin in your Strapi project:
   ```bash
   # In the plugin directory
   npm run watch:link
   
   # In your Strapi project
   npm link @lizarzaburu/strapi-plugin-umami-analytics
   ```

### Making Changes

After modifying the plugin source code:

```bash
npm run build
```

Strapi will auto-reload with the changes when using `watch:link`.

## Publishing Workflow

### For Plugin Maintainers

#### Initial Setup (One-time)

1. **Create npm Access Token:**
   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Create a new "Automation" token (for CI/CD)
   - Copy the token

2. **Add Secret to GitHub Repository:**
   - Go to your GitHub repository: **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Paste your npm automation token
   - Click **Add secret**

#### Publishing a New Version

1. **Make Changes:**
   ```bash
   # Make code changes
   npm run build
   ```

2. **Update Version:**
   - Update version in `package.json` (following semantic versioning)
   - Commit changes:
     ```bash
     git add .
     git commit -m "feat: add new feature"
     git push origin main
     ```

3. **Tag Release (triggers automatic npm publish):**
   ```bash
   git tag v1.0.1
   git push origin main --tags
   ```
   
   The GitHub Actions workflow will automatically:
   - Build the plugin
   - Publish to npm with the tag version
   - Include provenance for supply chain security

4. **Consuming Projects Update:**

   **From npm (recommended):**
   ```bash
   cd your-strapi-project
   npm install @lizarzaburu/strapi-plugin-umami-analytics@1.0.1
   ```

   **From GitHub:**
   ```bash
   cd your-strapi-project
   npm install git+ssh://git@github.com:lizarzaburu/strapi-plugin-umami-analytics.git#v1.0.1
   ```

### Version Management

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Tag releases with `v` prefix (e.g., `v1.0.0`)
- Publish to npm after tagging
- Projects can install from npm or GitHub

## Troubleshooting

### Permission not showing in admin
- Rebuild the plugin: `npm run build`
- Restart Strapi
- Clear browser cache

### Menu link not appearing
- Check user role has "Access Analytics" permission
- Refresh browser after enabling permission
- Verify plugin is enabled in `config/plugins.ts`

### Analytics page shows "Not Configured"
- Verify `STRAPI_ADMIN_UMAMI_URL` is set in `.env`
- Restart Strapi after adding the variable

### Iframe doesn't load
- Ensure URL is a Umami **share URL** (not admin URL)
- Check that Umami instance allows iframe embedding

### Installation Issues

**SSH Authentication:**
- Ensure your SSH key is added to GitHub
- Test with: `ssh -T git@github.com`

**HTTPS Alternative:**
- Use HTTPS URL with personal access token
- Or use SSH URL format: `git+ssh://git@github.com:user/repo.git`

## License

MIT License - see [LICENSE](LICENSE) file for details.
