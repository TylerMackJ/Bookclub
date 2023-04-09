// routes/login.tsx

import { HandlerContext, Handlers } from "$fresh/server.ts";
import { getOAuth2Client, GitHubProvider } from "/util/oauth2.ts";

export const handler: Handlers = {
    GET(_req: Request, _ctx: HandlerContext) {
        return Response.redirect(
           getOAuth2Client(GitHubProvider).code.getAuthorizationUri(), 307
        );
    },
};
