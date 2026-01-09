export default [
  {
    method: 'GET',
    path: '/config',
    handler: 'controller.getConfig',
    config: {
      policies: [
        {
          name: 'admin::hasPermissions',
          config: { actions: ['plugin::umami-analytics.read'] },
        },
      ],
    },
  },
];
