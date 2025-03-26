import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// create zoho lead function
const createZohoLead = async (userData: { name: string; email: string }) => {
  try {
    console.log("Calling Zoho API with:", userData);
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/zoho`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log("Zoho API response status:", response.status);
    const data = await response.json();
    console.log("Zoho API response data:", data);
    return data.success;
  } catch (error) {
    console.error('Error adding user to Zoho:', error);
    return false;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {  
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (user && await bcrypt.compare(credentials?.password || "", user.password || "")) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: account.providerAccountId,
              emailVerified: new Date(),
              role: "user",
            });

            // Create Zoho lead if user is created
            try {
              await createZohoLead({
                name: user.name,
                email: user.email
              });
            } catch (zohoError) {
              console.error("Error creating Zoho lead:", zohoError);
            }
          }

            

          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      await dbConnect();
      const currentUser = await User.findOne({ 
        $or: [
          { email: session.user.email },
          { googleId: token.sub }
        ]
      });
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.name = currentUser?.name;
      session.user.email = currentUser?.email;
      session.user.phone = currentUser?.phone;
      session.user.preferences = currentUser?.preferences;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'none',
  //       domain: '.premierproperties.ae',
  //       path: '/',
  //     },
  //   },
  // }, 
  pages: {
    signIn: '/login',
  },
};
