// routes/index.tsx

import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { OAuth2Data } from "/util/oauth2.ts";

interface Data {
    isAllowed: boolean;
    auth: OAuth2Data | null;
}

export const handler: Handlers = {
    GET(req, ctx) {
        const cookies = getCookies(req.headers);
        return ctx.render!({
            isAllowed: cookies.auth && cookies.auth !== "",
            auth: OAuth2Data.fromCookie(cookies.auth)
        });
    },
};

export default function Home({ data }: PageProps<Data>) {
    let accessToken = ""
    let expiresOn = ""
    if (data.auth !== null) {
        accessToken = data.auth.getAccessToken();
        expiresOn = data.auth.getExpiresOn().toString();
    }
    return (
        <div>
            <div>
                <p>
                    Current time is {(new Date()).toString()}
                </p>
                <p>
                    You currently {data.isAllowed ? "are " : "are not "}
                    logged in.
                </p>
                <p>
                    Your access token is {accessToken} 
                </p>
                <p>
                    It expires on {expiresOn} 
                </p>
            </div>
        </div>
    );
}
