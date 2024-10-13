import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { users } from "@/utils/provisionalDB";

const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {label:"username", type:"text"},
                password: {label:"password", type:"password"},
            },

            authorize: async (credentials) => {
                let user = null

                console.log(credentials)

                user = users.find(user => user.email === credentials.email)
                console.log(user)
                
                try {
                    if (!user) {
                        throw new Error("User Not Found.")
                    }

                    if (user.password !== credentials.password) {
                        throw new Error("Passoword Wrong")
                    }
                } catch (error) {
                    console.log(error)
                }
                console.log('login')
                return user
            }
        })
    ],
    pages: {
        signIn: '/login',

    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user}) {
            if(user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token}) {
            session.user.id = token.id;
            return session
        }
    }
}


export const { handlers } = NextAuth(authOptions);