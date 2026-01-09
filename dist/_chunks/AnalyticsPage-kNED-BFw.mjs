import { jsx, jsxs } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
const AnalyticsPage = () => {
  const umamiUrl = process.env.STRAPI_ADMIN_UMAMI_URL;
  if (!umamiUrl) {
    return /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Analytics Not Configured" }),
      /* @__PURE__ */ jsx("p", { children: "Please set the STRAPI_ADMIN_UMAMI_URL environment variable to display analytics." })
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
