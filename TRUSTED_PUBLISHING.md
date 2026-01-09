# Migrating to Trusted Publishing

## Current Status

The workflow is configured for [Trusted Publishing (OIDC)](https://docs.npmjs.com/trusted-publishers), but we still need the token for the initial publish.

## Why?

**Trusted Publishing only works for packages that already exist on npm.** You cannot configure a trusted publisher for a package that hasn't been published yet.

## Migration Steps

### Step 1: First Publish with Token (Current)

1. Keep `NPM_TOKEN` secret in GitHub
2. Publish v1.2.0 using the token
3. This creates the package on npm

### Step 2: Configure Trusted Publisher on npm

After the first successful publish:

1. Go to https://www.npmjs.com/package/@lizarzaburu/strapi-plugin-umami-analytics/access
2. Click **"Publishing Access"**
3. Click **"Add a trusted publisher"**
4. Select **"GitHub Actions"**
5. Configure:
   - **Repository owner:** `lizarzaburu`
   - **Repository name:** `strapi-plugin-umami-analytics`
   - **Workflow filename:** `publish-npm.yml`
   - **Environment name:** (leave empty)

### Step 3: Remove Token from Workflow

Once trusted publisher is configured, update `.github/workflows/publish-npm.yml`:

```yaml
- name: Publish to npm
  run: npm publish
  # Remove: env: NODE_AUTH_TOKEN
```

### Step 4: Restrict Token Access (Optional but Recommended)

1. Go to package settings on npmjs.com
2. Navigate to **"Publishing access"**
3. Select **"Require two-factor authentication and disallow tokens"**
4. Save changes

This ensures only OIDC publishing works, not tokens.

### Step 5: Revoke Old Tokens

Delete the `NPM_TOKEN` from:
- GitHub Secrets
- npm.com tokens page

## Benefits of Trusted Publishing

- ✅ No long-lived tokens to manage
- ✅ Automatic provenance generation
- ✅ Short-lived, workflow-specific credentials
- ✅ Better security (no token exposure risk)
- ✅ Recommended by npm

## Workflow Comparison

### With Token (Current)
```yaml
- name: Publish to npm
  run: npm publish --provenance --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### With Trusted Publishing (After migration)
```yaml
permissions:
  id-token: write  # Required for OIDC
  contents: read

- name: Publish to npm
  run: npm publish
  # No token needed!
```

Note: Provenance is automatically generated with Trusted Publishing, so the `--provenance` flag is not needed.
