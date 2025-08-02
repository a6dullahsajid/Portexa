import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { db } from "@/lib/firebaseAdmin"; // 👈 Import your Firebase Admin config

export const authOptions = { // It's better to define options as an object
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    // 👇 Add the callbacks block here
    callbacks: {
        async signIn({ user, account }) {

            console.log("signIn callback - user:", user);
            if (account.provider === "github" && user.email) {
                try {
                    const userRef = db.collection("users").doc(user.email);
                    const doc = await userRef.get(); 
                    const slug = user.name.replace(/\s+/g, "");

                    console.log(slug);

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
                        console.log("New user created in Firestore:", user.email);
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
            // Ensure email is included in session
            session.user.email = token.email;
            if (token?.email) {
                session.user.email = token.email;
            }
            return session;
        },

        async jwt({ token, user }) {
            // Add email to JWT token

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