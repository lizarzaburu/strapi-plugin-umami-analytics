import controllers from './controllers';
import routes from './routes';

export default {
  controllers,
  routes,
  
  register({ strapi }: { strapi: any }) {
    // Get Umami URL from plugin config
    const pluginConfig = strapi.config.get('plugin::umami-analytics');
    const umamiUrl = pluginConfig?.umamiUrl;
    
    if (!umamiUrl) {
      strapi.log.warn('Umami Analytics plugin: umamiUrl not configured. CSP headers not configured.');
      strapi.log.warn('Add "umamiUrl" to your plugin config in config/plugins.ts');
      return;
    }

    // Extract origin from Umami URL
    let umamiOrigin: string;
    try {
      const url = new URL(umamiUrl);
      umamiOrigin = url.origin;
    } catch (error) {
      strapi.log.error('Umami Analytics plugin: Invalid umamiUrl format. Must be a valid URL.');
      return;
    }

    // Extend CSP middleware configuration
    strapi.server.use(async (ctx: any, next: any) => {
      // Store original setHeader
      const originalSetHeader = ctx.set.bind(ctx);
      
      // Override setHeader to modify CSP
      ctx.set = function(field: string, val: string) {
        if (field.toLowerCase() === 'content-security-policy') {
          // Add Umami origin to frame-src if not already present
          if (!val.includes(umamiOrigin)) {
            val = val.replace(
              /frame-src([^;]*);/,
              `frame-src$1 ${umamiOrigin};`
            );
          }
        }
        return originalSetHeader(field, val);
      };

      await next();
    });

    strapi.log.info(`Umami Analytics plugin: CSP configured for ${umamiOrigin}`);
  },

  bootstrap({ strapi }: { strapi: any }) {
    // Register analytics permission action
    const actions = [
      {
        section: 'plugins',
        displayName: 'Access Analytics',
        uid: 'read',
        pluginName: 'umami-analytics',
      },
    ];

    strapi.admin.services.permission.actionProvider.registerMany(actions);
  },
};

