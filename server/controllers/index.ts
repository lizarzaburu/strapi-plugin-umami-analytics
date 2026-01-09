export default {
  getConfig: async (ctx: any) => {
    // Get config using the correct Strapi plugin method
    const umamiUrl = ctx.state.strapi.plugin('umami-analytics').config('umamiUrl');
    
    ctx.body = {
      umamiUrl: umamiUrl || null,
    };
  },
};
