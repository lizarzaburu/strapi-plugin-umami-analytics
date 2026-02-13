import { jsx, jsxs } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { useState, useEffect } from "react";
const AnalyticsPage = () => {
  const { get } = useFetchClient();
  const [umamiUrl, setUmamiUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsx("div", { children: "Loading analytics..." }) }) });
  }
  if (error || !umamiUrl) {
    return /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Analytics Not Configured" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Please configure the Umami Analytics plugin in ",
        /* @__PURE__ */ jsx("code", { children: "config/plugins.ts" }),
        ":"
      ] }),
      /* @__PURE__ */ jsx("pre", { style: {
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
  return /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsx(
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
export {
  AnalyticsPage
};
