import { createRequestHandler } from "@remix-run/node";
import { createRequestHandler as createNetlifyRequestHandler } from "@netlify/remix-adapter";

export const handler = process.env.NETLIFY
  ? createNetlifyRequestHandler({ build: require("./build") })
  : createRequestHandler({ build: require("./build") });
