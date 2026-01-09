export default {
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

