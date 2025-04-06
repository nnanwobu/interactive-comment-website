import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import Twitter from "next-auth/providers/twitter";
import { createUser, getUserByEmail } from "./data-service";
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, profile, account }) {
      try {
        const existinguser = await getUserByEmail(user.email);
        console.log(existinguser);

        if (!existinguser.data.user)
          await createUser({
            name: user.name,
            email: user.email,
            photo: user.image,
          });
        return true;
      } catch (er) {
        console.log(err);
      }
    },
    async session({ session, user }) {
      const loggedInUser = await getUserByEmail(session.user.email);

      session.user.id = loggedInUser.data.user._id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
