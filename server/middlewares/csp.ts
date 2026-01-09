/**
 * CSP Middleware to allow Umami iframe in admin panel
 * Adds the Umami origin to the frame-src CSP directive
 */
export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: any) => {
    // Store original setHeader
    const originalSetHeader = ctx.set.bind(ctx);
    
    // Override setHeader to modify CSP
    ctx.set = function(field: string, val: string) {
      if (field.toLowerCase() === 'content-security-policy' && config.umamiOrigin) {
        // Add Umami origin to frame-src if not already present
        if (!val.includes(config.umamiOrigin)) {
          val = val.replace(
            /frame-src([^;]*);/,
            `frame-src$1 ${config.umamiOrigin};`
          );
        }
      }
      return originalSetHeader(field, val);
    };

    await next();
  };
};
