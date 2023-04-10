// islands/LogoutButton.tsx

import { Button } from "/components/Button.tsx"

export default function LogoutButton() {
    return (
        <Button onClick={() => {
            window.location.assign("/logout");
        }}>Logout</Button>
    );
}
