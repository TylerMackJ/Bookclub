// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/github/callback.tsx";
import * as $1 from "./routes/api/google/callback.tsx";
import * as $2 from "./routes/index.tsx";
import * as $3 from "./routes/login.tsx";
import * as $4 from "./routes/logout.tsx";
import * as $$0 from "./islands/LoginButton.tsx";
import * as $$1 from "./islands/LogoutButton.tsx";

const manifest = {
  routes: {
    "./routes/api/github/callback.tsx": $0,
    "./routes/api/google/callback.tsx": $1,
    "./routes/index.tsx": $2,
    "./routes/login.tsx": $3,
    "./routes/logout.tsx": $4,
  },
  islands: {
    "./islands/LoginButton.tsx": $$0,
    "./islands/LogoutButton.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
