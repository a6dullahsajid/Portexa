import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from "@/lib/firebaseAdmin";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }), GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {

            console.log("signIn callback - user:", user);
            if (account.provider === "github" && user.email) {
                try {
                    const userRef = db.collection("users").doc(user.email);
                    const doc = await userRef.get();
                    const slug = user.name.replace(/\s+/g, "");

                    if (!doc.exists) {
                        await userRef.set({
                            email: user.email,
                            userName: slug,
                            template: "",
                            createdAt: new Date(),
                            details: {
                                name: "",
                                title: "",
                                profileImage: "",
                                bio: "",
                                resume: "",
                                skills: [],
                                projects: [],
                                connectDesc: "",
                                email: "",
                                linkedin: "",
                                github: "",
                                x: "",
                            },
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }
            return true;
        },

        async session({ session, token }) {
            session.user.email = token.email;
            if (token?.email) {
                session.user.email = token.email;
            }
            return session;
        },

        async jwt({ token, user }) {

            console.log("✅ jwt callback - token IN:", token, "user:", user);
            if (user?.email) {
                token.email = user.email;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };