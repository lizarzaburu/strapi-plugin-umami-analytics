import config from './config';
import controllers from './controllers';
import routes from './routes';
import middlewares from './middlewares';

export default {
  config,
  controllers,
  routes,
  middlewares,
  
  register({ strapi }: { strapi: any }) {
    // Get Umami URL from plugin config using the correct Strapi method
    const umamiUrl = strapi.plugin('umami-analytics').config('umamiUrl');
    
    if (!umamiUrl) {
      strapi.log.warn('Umami Analytics plugin: umamiUrl not configured. CSP headers will not be set.');
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

    // Register CSP middleware with configuration
    strapi.server.use(middlewares.csp({ umamiOrigin }, { strapi }));

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

