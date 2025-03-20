import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { manualLogin } from "../student";
import { redirect } from "next/navigation";

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
                    const user_data = await manualLogin({ email: credentials?.username_or_email, fullname: credentials?.username_or_email, password: credentials?.password });

                    //? If there's an error while fetching
                    if(!user_data.success && user_data.user_error) {
                        throw new Error("Password or Email/Username is wrong!");
                    }
                    else if(!user_data.success && !user_data.user_error) {
                        throw new Error("There's an internal server error!");
                    }
                    
                    //? If the fetching success return the user data
                    console.log(`user_data: ${JSON.stringify(user_data)}`);
                    
                    const user = user_data.result;
                    return { id: user.id, email: user.email, name: user.fullname };
                },
            })
        ],
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: "jwt"
        },
        pages: {
            signIn: "/"
        },
        callbacks: {
            async jwt({token, user}){
                return {...token, ...user}
            },
            async session({ session, token }) {
                session.user = token;
                if(session.user) {
                    session.access_token = jwt.sign({ email: session.user.email, fullname: session.user.name }, process.env.NEXTAUTH_SECRET!);
                }
                return session;
            },
            async signIn({ credentials, profile, account, user }) {
                // If using credentials, the credentials will be used to authorized
                if(credentials) {
                    return true;
                }

                // Check if the user consent giving the username and email. And also check if the session doesn't give access_token
                if(!profile?.email || !profile?.name) {
                    console.log("USER NOT CONSENT TO GIVING THE EMAIL INFORMATION");
                    throw new Error("User should consent to giving email address!");
                }
                if(!account?.access_token) {
                    throw new Error("Access token doesn't generated when doing session!");
                }
                return true;
            }
        }
    })
}