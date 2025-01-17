import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import { eventHandler, toWebRequest } from "h3";

// what is happening
export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    basePath: "/",
    logger: {
      error(code, ...message) {
        console.log(
          "CODE: " + code.message + " MESSAGE " + JSON.stringify(message),
        );
      },
      warn(code, ...message) {
        console.log("CODE: " + code + " MESSAGE " + JSON.stringify(message));
      },
      debug(code, ...message) {
        console.log("CODE: " + code + " MESSAGE " + JSON.stringify(message));
      },
    },
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET,
      }),
    ],
  }),
);
