var _a, _b;
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createClient } from "@supabase/supabase-js";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "h-full", children: [
    " ",
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "h-full bg-brand-purple text-brand-text font-sans p-4 md:p-8 flex items-center justify-center", children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const KeyIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 sm:w-8 sm:h-8 text-brand-orange", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.79-.273 1.057l-1.74 2.437a3 3 0 0 0-.22 1.767V18.75a3 3 0 0 0 3 3h.094c.37.026.74.04 1.11.041h2.105c1.184-.028 2.31-.21 3.388-.555a.75.75 0 0 0 .44-.699V18a.75.75 0 0 0-.44-.7a11.95 11.95 0 0 1-3.388-.555c-.428-.128-.86-.24-1.297-.331a.75.75 0 0 0-.56.086 4.48 4.48 0 0 1-1.97.441 4.5 4.5 0 0 1-1.97-.441.75.75 0 0 0-.559-.086c-.437.09-.87.203-1.297.331-.401.12-.786.255-1.155.399a.75.75 0 0 0-.44.699v.013a5.94 5.94 0 0 1 1.11-.041h2.105c.37-.001.74-.015 1.11-.041a.75.75 0 0 0 .56-.086 4.48 4.48 0 0 1 1.97-.441c.713 0 1.394.204 1.97.441a.75.75 0 0 0 .559.086c.428.09.86.203 1.297.331a11.95 11.95 0 0 1 3.388.555.75.75 0 0 0 .44.7v.737c.004.008.007.016.01.024a6.75 6.75 0 0 0 6.64-7.821 6.75 6.75 0 0 0-6.75-6.75Zm-8.25 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z", clipRule: "evenodd" }) });
function Key({ keyData }) {
  const baseStyle = "key-slot bg-brand-purple rounded-lg shadow-neumorphic-outset hover:shadow-neumorphic-inset active:shadow-neumorphic-inset cursor-pointer";
  let statusStyle = "";
  switch (keyData.status) {
    case "Out":
      statusStyle = "opacity-50";
      break;
    case "Restricted":
      statusStyle = "border-2 border-red-500";
      break;
    case "In":
    default:
      statusStyle = "";
      break;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${baseStyle} ${statusStyle}`,
      title: `ID: ${keyData.id} - ${keyData.label} (${keyData.status})`,
      children: /* @__PURE__ */ jsx(KeyIcon, {})
    }
  );
}
const supabaseUrl = ((_a = process.env.SUPABASE_URL) == null ? void 0 : _a.trim()) || "https://onefnxopknlpwwrgdwgv.supabase.co";
const supabaseAnonKey = ((_b = process.env.SUPABASE_ANON_KEY) == null ? void 0 : _b.trim()) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZWZueG9wa25scHd3cmdkd2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTA3ODYsImV4cCI6MjA1ODIyNjc4Nn0.0CDKGpSORX3g0klbJ--JDdDaQQaIAhMCuk43AkOiAg0";
if (!supabaseUrl.startsWith("https://") && !supabaseUrl.startsWith("http://")) {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const meta = () => {
  return [
    { title: "Key Safe Management" },
    { name: "description", content: "Manage keys in the key safe." }
  ];
};
async function loader() {
  const { data, error } = await supabase.from("keys").select("*").order("id", { ascending: true });
  if (error) {
    console.error("Supabase error:", error);
    throw new Response("Error fetching keys from Supabase", { status: 500 });
  }
  const keys = data || [];
  return json({ keys });
}
function Index() {
  const { keys } = useLoaderData();
  return (
    // Main container with neumorphic styling
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl bg-brand-purple rounded-2xl shadow-neumorphic-outset p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-brand-text-light flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "🔑" }),
          " Key Safe"
        ] }),
        /* @__PURE__ */ jsx("button", { className: "bg-brand-red text-white px-4 py-2 rounded-lg shadow-neumorphic-outset-sm hover:shadow-neumorphic-inset active:shadow-neumorphic-inset", children: "CHECK OUT" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row gap-6", children: /* @__PURE__ */ jsx("div", { className: "flex-grow bg-brand-purple-dark rounded-xl shadow-neumorphic-inset p-4 md:p-6", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-4", children: keys.length > 0 ? keys.map((keyData) => /* @__PURE__ */ jsx(Key, { keyData }, keyData.id)) : /* @__PURE__ */ jsx("p", { className: "text-brand-text-light col-span-full text-center", children: "No keys found." }) }) }) })
    ] })
  );
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CzVr9l26.js", "imports": ["/assets/components-CZq2W7LF.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D6OvUJIl.js", "imports": ["/assets/components-CZq2W7LF.js"], "css": ["/assets/root-1OUELVg_.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-q-NiWzja.js", "imports": ["/assets/components-CZq2W7LF.js"], "css": [] } }, "url": "/assets/manifest-d6e53927.js", "version": "d6e53927" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
