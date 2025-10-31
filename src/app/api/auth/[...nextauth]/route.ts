import NextAuth from "next-auth";
import {authOptions} from './options'
const handler= NextAuth(authOptions) //creates a request handler function for authentication.
export {handler as GET, handler as POST} //In Next.js App Router, every file under /app/api/... can export HTTP method handlers (GET, POST, etc.).

// Example:

// export async function GET(req) { ... }
// export async function POST(req) { ... }


// But since i don’t want to rewrite that manually for NextAuth, i just reuse handler.