import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleSignUp } from "../student";


const nextAuthOption: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token; // Store access token in JWT
            }
            return token;
        },
        async signIn({ profile, account }) {
            if(!profile?.email || !profile?.name || !account?.access_token) {
                console.log("USER NOT CONSENT TO GIVING THE EMAIL INFORMATION");
                throw new Error("User should consent to giving email address!");
            }

            const result = await googleSignUp({ next_auth_token: account?.access_token, email: profile.email, fullname: profile.name });

            if(result.success) {
                console.log("SUCCESS");
                return true;
            }
            else {
                console.log(`ERROR: ${result.error}`);
                return false;
            }
        },
    },
};

const handler = NextAuth(nextAuthOption);
export default handler;
// export { handler as GET, handler as POST, nextAuthOption as authOptions };