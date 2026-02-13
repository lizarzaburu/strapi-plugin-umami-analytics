"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const react = require("react");
const AnalyticsPage = () => {
  const { get } = admin.useFetchClient();
  const [umamiUrl, setUmamiUrl] = react.useState(null);
  const [loading, setLoading] = react.useState(true);
  const [error, setError] = react.useState(null);
  react.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await get("/umami-analytics/config");
        setUmamiUrl(data.umamiUrl);
      } catch (err) {
        setError("Failed to load analytics configuration");
        console.error("Error loading Umami config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [get]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Main, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxRuntime.jsx("div", { children: "Loading analytics..." }) }) });
  }
  if (error || !umamiUrl) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Main, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { children: "Analytics Not Configured" }),
      /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
        "Please configure the Umami Analytics plugin in ",
        /* @__PURE__ */ jsxRuntime.jsx("code", { children: "config/plugins.ts" }),
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("pre", { style: {
        background: "#f5f5f5",
        padding: "1rem",
        borderRadius: "4px",
        textAlign: "left",
        marginTop: "1rem"
      }, children: `'umami-analytics': {
  enabled: true,
  config: {
    umamiUrl: env('UMAMI_URL'),
  },
}` })
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
