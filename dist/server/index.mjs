import { extendMiddlewareConfiguration } from "@strapi/utils";
const config = {
  default: {
    umamiUrl: ""
  },
  validator: (config2) => {
    if (config2.umamiUrl && typeof config2.umamiUrl !== "string") {
      throw new Error("umamiUrl must be a string");
    }
    if (config2.umamiUrl) {
      try {
        new URL(config2.umamiUrl);
      } catch (error) {
        throw new Error("umamiUrl must be a valid URL");
      }
    }
  }
};
const controller = ({ strapi }) => ({
  getConfig: async (ctx) => {
    const umamiUrl = strapi.plugin("umami-analytics").config("umamiUrl");
    ctx.body = {
      umamiUrl: umamiUrl || null
    };
  }
});
const controllers = { controller };
const routes = [
  {
    method: "GET",
    path: "/config",
    handler: "controller.getConfig",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: { actions: ["plugin::umami-analytics.read"] }
        }
      ]
    }
  }
];
const index = {
  config,
  controllers,
  routes,
  register({ strapi }) {
    const umamiUrl = strapi.plugin("umami-analytics").config("umamiUrl");
    if (!umamiUrl) {
      strapi.log.warn("Umami Analytics plugin: umamiUrl not configured.");
      return;
    }
    let umamiOrigin;
    try {
      umamiOrigin = new URL(umamiUrl).origin;
    } catch {
      strapi.log.error("Umami Analytics plugin: Invalid umamiUrl format.");
      return;
    }
    const middlewares = strapi.config.get("middlewares");
    const updatedMiddlewares = extendMiddlewareConfiguration(middlewares, {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          directives: {
            "frame-src": ["'self'", umamiOrigin]
          }
        }
      }
    });
    strapi.config.set("middlewares", updatedMiddlewares);
    strapi.log.info(`Umami Analytics plugin: CSP frame-src configured for ${umamiOrigin}`);
  },
  bootstrap({ strapi }) {
    const actions = [
      {
        section: "plugins",
        displayName: "Access Analytics",
        uid: "read",
        pluginName: "umami-analytics"
      }
    ];
    strapi.admin.services.permission.actionProvider.registerMany(actions);
  }
};
export {
  index as default
};
