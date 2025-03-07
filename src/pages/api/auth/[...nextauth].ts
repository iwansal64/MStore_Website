import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { manualLogin } from "../student";

declare module "next-auth" {
    interface Session {
        access_token?: string;
    }
}


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
            }),
            CredentialsProvider({
                name: "Credential",
                credentials: {
                    username_or_email: { label: "Username or Email", placeholder: "your username or email", type: "text" },
                    password: { label: "Password", placeholder: "your account password", type: "password" }
                },
                async authorize(credentials, req) {
                    //? If the user doesn't give credentials
                    if(!credentials) {
                        return null;
                    }

                    //? Try to get the user data from the server
                    const user_data = await manualLogin({ email: credentials?.username_or_email, password: credentials?.password });

                    //? If there's an error while fetching
                    if(!user_data.success || !user_data.response) {
                        return null;
                    }
                    
                    //? If the fetching success return the user data
                    const user = user_data.response.data;
                    return { id: user.id, email: user.email, fullname: user.fullname };
                },
            })
        ],
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: "jwt"
        },
        callbacks: {
            async jwt({token, user}){
                return {...token, ...user}
            },
            async session({ session, token,  }) {
                session.user = token;
                if(session.user) {
                    session.access_token = jwt.sign({ email: session.user.email, fullname: session.user.name }, process.env.NEXTAUTH_SECRET!);
                }
                return session;
            },
            signIn: async ({ credentials, profile, account }) =>  {
                if(credentials) {
                    return true;
                }

                if(!profile?.email || !profile?.name || !account?.access_token) {
                    console.log("USER NOT CONSENT TO GIVING THE EMAIL INFORMATION");
                    throw new Error("User should consent to giving email address!");
                }
                return true;
            }
        }
    })
}