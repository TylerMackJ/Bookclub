// routes/index.tsx

import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { OAuth2Data } from "/util/oauth2.ts";
import LoginButton from "/islands/LoginButton.tsx";
import LogoutButton from "/islands/LogoutButton.tsx";

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
            Current time is {(new Date()).toString()}
            <br />
            <LoginButton />
            <LogoutButton />
            <br />
            You currently are {data.isAllowed ? "" : "not"} logged in.
            <br />
            Your access token is {accessToken}
            <br /> 
            It expires on {expiresOn}
        </div>
    );
}
