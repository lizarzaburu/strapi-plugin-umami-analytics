"use strict";
const index = {
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
module.exports = index;
