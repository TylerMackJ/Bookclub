// islands/LoginButton.tsx

import { Button } from "/components/Button.tsx";

export default function LoginButton() {
    return (
        <Button onClick={() => {
            window.location.assign("/login");
        }}>Login</Button> 
    );
}
