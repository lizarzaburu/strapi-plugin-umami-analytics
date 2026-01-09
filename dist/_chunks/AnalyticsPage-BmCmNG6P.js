"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const AnalyticsPage = () => {
  const umamiUrl = process.env.STRAPI_ADMIN_UMAMI_URL;
  if (!umamiUrl) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Main, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { children: "Analytics Not Configured" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { children: "Please set the STRAPI_ADMIN_UMAMI_URL environment variable to display analytics." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Main, { children: /* @__PURE__ */ jsxRuntime.jsx(
    "iframe",
    {
      src: umamiUrl,
      style: {
        width: "100%",
        height: "calc(100vh)",
        border: "none",
        display: "block"
      },
      title: "Umami Analytics"
    }
  ) });
};
exports.AnalyticsPage = AnalyticsPage;
