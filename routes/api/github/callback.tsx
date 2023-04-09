// routes/api/github/callback.tsx

import { HandlerContext, Handlers } from "$fresh/server.ts";
import { getOAuth2Client, GitHubProvider, OAuth2Data } from "/util/oauth2.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
    GET: async (req: Request, _ctx: HandlerContext) => {
        const url = new URL(req.url);

        // Exchange the auth code for access token
        const oAuth2Client = getOAuth2Client(GitHubProvider)
        const token = await oAuth2Client.code.getToken(url);

        const oAuth2Data = OAuth2Data.fromToken(GitHubProvider, token);
        const headers = new Headers();
        setCookie(headers, {
            name: "auth",
            value: oAuth2Data.toString(),
            maxAge: oAuth2Data.getMaxAge(),
            sameSite: "Lax",
            domain: url.hostname,
            path: "/",
            secure: true,
        });

        headers.set("location", "/");

        return new Response(null, {
            status: 303, // "See Other"
            headers,
        });
    },
};
