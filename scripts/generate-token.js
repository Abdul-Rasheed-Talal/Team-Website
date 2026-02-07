const { SignJWT } = require('jose');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to get the secret
function getSecret() {
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/ADMIN_SESSION_SECRET=["']?([^"'\n]+)["']?/);
        if (match) return match[1];
    }
    return "default-secret-key-change-me";
}

async function generateToken() {
    const secretValue = getSecret();
    const SECRET = new TextEncoder().encode(secretValue);
    const email = "aliraza.dev.crusader@gmail.com";

    const session = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET);

    console.log(session);
}

generateToken();
