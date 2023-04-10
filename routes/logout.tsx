// routes/logout.tsx

import { HandlerContext, Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
    GET(_req: Request, _ctx: HandlerContext) {
        const headers = new Headers();

        deleteCookie(headers, "auth");

        headers.set("location", "/");

        return new Response(null, {
            status: 303,
            headers,
        });
    },
};
