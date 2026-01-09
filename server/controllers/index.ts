export default {
  getConfig: async (ctx: any) => {
    const pluginConfig = ctx.state.strapi.config.get('plugin::umami-analytics');
    
    ctx.body = {
      umamiUrl: pluginConfig?.umamiUrl || null,
    };
  },
};
