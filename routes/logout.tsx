// routes/logout.tsx

import { HandlerContext, Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
    GET(req: Request, _ctx: HandlerContext) {
        const headers = new Headers();

        const url = new URL(req.url);
        deleteCookie(headers, "auth", {
            domain: url.hostname,
            path: "/",
        });

        headers.set("location", "/");

        return new Response(null, {
            status: 303,
            headers,
        });
    },
};
