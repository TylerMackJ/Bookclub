// util/oauth2Client.ts

import {
    OAuth2Client,
    type Tokens
} from "https://deno.land/x/oauth2@v0.2.6/mod.ts";

const SEC_IN_YEAR = 31536000;

const providers: { [uid: string]: Provider } = {};

class Provider {
    readonly uid: string;

    readonly clientId: string;
    readonly clientSecret: string;
    readonly authorizationEndpointUri: string;
    readonly tokenUri: string;
    readonly resourceEndpointHost: string;
    readonly redirectUri: string;
    readonly scope: string;

    readonly maxAge: number;

    constructor(uid: string,
                clientId: string,
                clientSecret: string | undefined,
                authorizationEndpointUri: string,
                tokenUri: string,
                resourceEndpointHost: string,
                redirectUri: string,
                scope: string,
                maxAge: number)
    {
        if (clientSecret === undefined) {
            throw new Error("Provider " + uid + " has an " +
                            "undefined clientSecret.");
        }

        this.uid = uid;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authorizationEndpointUri = authorizationEndpointUri;
        this.tokenUri = tokenUri;
        this.resourceEndpointHost = resourceEndpointHost;
        this.redirectUri = redirectUri;
        this.scope = scope;
        this.maxAge = maxAge;

        providers[this.uid] = this;
    }
}

export const GitHubProvider = new Provider(
    "GitHub",
    "4bff13e0d309387938a5",
    Deno.env.get("GITHUB_SECRET"),
    "https://github.com/login/oauth/authorize",
    "https://github.com/login/oauth/access_token",
    "https://api.github.com",
    "http://bookclub.tylermackj.com/api/github/callback",
    "read:user",
    SEC_IN_YEAR * 10,
);

export function getOAuth2Client(provider: Provider): OAuth2Client {
    return new OAuth2Client({
        clientId: provider.clientId,
        clientSecret: provider.clientSecret,
        authorizationEndpointUri: provider.authorizationEndpointUri,
        tokenUri: provider.tokenUri,
        resourceEndpointHost: provider.resourceEndpointHost,
        redirectUri: provider.redirectUri,
        defaults: {
            scope: provider.scope,
        },
    });
}

export class OAuth2Data {
    private static SPLIT_CHAR = ':';
    private static SEC_IN_YEAR = 31536000;

    public static fromToken(provider: Provider, token: Tokens): OAuth2Data {
        const expiresIn = token.expiresIn || OAuth2Data.SEC_IN_YEAR;
        const expiresInMs = expiresIn * 1000;
        return new OAuth2Data(
            provider, 
            token.accessToken,
            token.refreshToken || "",
            new Date(new Date().valueOf() + expiresInMs)
        );
    }

    public static fromCookie(cookie: string): OAuth2Data | null {
        cookie = cookie || "";
        const splitCookie = cookie.split(OAuth2Data.SPLIT_CHAR);
        if (splitCookie.length == 4) {
            return new OAuth2Data(providers[splitCookie[0]],
                                  splitCookie[1],
                                  splitCookie[2],
                                  new Date(+splitCookie[2]));
        } else {
            return null;
        }
    }

    private provider: Provider;
    private accessToken: string;
    private refreshToken: string;
    private expiresOn: Date;

    public getAccessToken(): string { return this.accessToken; }
    public getRefreshToken(): string { return this.refreshToken; }
    public getExpiresOn(): Date { return this.expiresOn; }
    public getMaxAge(): number {
        return this.provider.maxAge;
    }

    public constructor(provider: Provider,
                       accessToken: string,
                       refreshToken: string,
                       expiresOn: Date) {
        this.provider = provider;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresOn = expiresOn;
    }

    public toString(): string {
        return (
            this.provider.uid + OAuth2Data.SPLIT_CHAR +
            this.accessToken + OAuth2Data.SPLIT_CHAR +
            this.refreshToken + OAuth2Data.SPLIT_CHAR +
            this.expiresOn.valueOf()
        );
    }
}

