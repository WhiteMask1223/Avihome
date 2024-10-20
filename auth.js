import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { NEXTAUTH_SECRET } from "@/config";

import { users } from "@/utils/provisionalDB";

const authOptions = {
    secret: NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {label:"username", type:"text"},
                password: {label:"password", type:"password"},
            },

            authorize: async (credentials) => {
                let user = null

                console.log(credentials) //TODO: DELETE ME

                user = users.find(user => user.email === credentials.email)
                console.log(user) //TODO: DELETE ME
                
                try {
                    if (!user) {
                        return
                    }

                    if (user.password !== credentials.password) {
                        return
                    }
                } catch (error) {
                    console.log('login Error')
                }
                console.log('login') //TODO: DELETE ME
                return user
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/'
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


export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);