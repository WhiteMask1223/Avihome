import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { NEXTAUTH_SECRET } from "@/config";

const bcrypt = require('bcrypt');
import { getUserByEmail_Controller } from "@/controllers/user.controller";

const authOptions = {
    secret: NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },

            authorize: async (credentials) => {
                let user = null

                console.log('crdenciales desde auth.js: ', credentials); //TODO: DELETE ME
                
                user = await getUserByEmail_Controller(credentials.email)

                console.log('user desde la db: ', user); //TODO: DELETE ME

                try {
                    if (!user) return

                    if (
                        await bcrypt.compare(credentials.password, user.password) === false
                    ) return

                } catch (error) {
                    console.log('login Error')
                }
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session
        }
    }
}


export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);