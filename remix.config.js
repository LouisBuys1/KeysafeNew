/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverPlatform: "node",
  serverBuildPath: "build/server/index.js",
  server: "./server.ts",
  serverDependenciesToBundle: [
    /^@supabase\/supabase-js/,
    /^@netlify\/remix-adapter/
  ],
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  }
};
