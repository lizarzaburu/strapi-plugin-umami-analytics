const controller = ({ strapi }: { strapi: any }) => ({
  getConfig: async (ctx: any) => {
    const umamiUrl = strapi.plugin('umami-analytics').config('umamiUrl');

    ctx.body = {
      umamiUrl: umamiUrl || null,
    };
  },
});

export default { controller };
