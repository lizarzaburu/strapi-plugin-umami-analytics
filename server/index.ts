import { extendMiddlewareConfiguration } from '@strapi/utils';

import config from './config';
import controllers from './controllers';
import routes from './routes';

export default {
  config,
  controllers,
  routes,

  register({ strapi }: { strapi: any }) {
    const umamiUrl = strapi.plugin('umami-analytics').config('umamiUrl');

    if (!umamiUrl) {
      strapi.log.warn('Umami Analytics plugin: umamiUrl not configured.');
      return;
    }

    let umamiOrigin: string;
    try {
      umamiOrigin = new URL(umamiUrl).origin;
    } catch {
      strapi.log.error('Umami Analytics plugin: Invalid umamiUrl format.');
      return;
    }

    // Extend security middleware CSP config at registration time
    const middlewares = strapi.config.get('middlewares');
    const updatedMiddlewares = extendMiddlewareConfiguration(middlewares, {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          directives: {
            'frame-src': ["'self'", umamiOrigin],
          },
        },
      },
    });
    strapi.config.set('middlewares', updatedMiddlewares);

    strapi.log.info(`Umami Analytics plugin: CSP frame-src configured for ${umamiOrigin}`);
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
