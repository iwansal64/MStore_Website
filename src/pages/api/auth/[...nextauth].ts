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
        async signIn({ profile }) {
            console.log("====PROFILE====");
            
            console.log(profile);
            
            if(!profile?.email || !profile?.name) {
                console.log("USER NOT CONSENT TO GIVING THE EMAIL INFORMATION");
                throw new Error("User should consent to giving email address!");
            }

            googleSignUp({ email: profile.email, name: profile.name });
            
            return true;
        },
    },
};

const handler = NextAuth(nextAuthOption);
export default handler;
// export { handler as GET, handler as POST, nextAuthOption as authOptions };