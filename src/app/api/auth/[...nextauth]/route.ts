import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/models/User";
import dbConnect from "@/lib/db";
import { signJWT } from "@/lib/jwt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          // Check if user exists
          let dbUser = await User.findOne({ email: user.email });
          
          if (!dbUser) {
            // Create new user
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: user.id,
              emailVerified: new Date(),
            });
          }

          const token = await signJWT({
            id: dbUser._id.toString(),
            email: dbUser.email
          });

          user.token = token;
          
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };