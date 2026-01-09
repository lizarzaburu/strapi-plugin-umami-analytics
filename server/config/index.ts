export default {
  default: {
    umamiUrl: '',
  },
  validator: (config: any) => {
    if (config.umamiUrl && typeof config.umamiUrl !== 'string') {
      throw new Error('umamiUrl must be a string');
    }
    
    // Validate URL format if provided
    if (config.umamiUrl) {
      try {
        new URL(config.umamiUrl);
      } catch (error) {
        throw new Error('umamiUrl must be a valid URL');
      }
    }
  },
};
