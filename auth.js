import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { NEXTAUTH_SECRET } from "@/config";

const bcrypt = require('bcrypt');
import { getUserWithPasswordByEmail_Controller } from "@/controllers/user.controller";

const authOptions = {
    secret: NEXTAUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                email: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null;

                try {
                    user = await getUserWithPasswordByEmail_Controller(credentials.email);

                    if (!user) return;

                    if (!await bcrypt.compare(credentials.password, user.password)) return;
                } catch (error) {
                    console.log("Auht error: ", error);
                    return;
                };
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            };
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);