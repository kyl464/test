import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:3000/api/auth/login", {
            identifier: credentials.identifier,
            password: credentials.password,
          });
          console.log("Authorize user:", res.data.user);
          if (res.data && res.data.user) {
            return res.data.user;
          }
          return null;
        } catch (error) {
          console.error(
            "Authorize error:",
            error.response?.data || error.message
          );
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback user:", user);
        token.user = user;
      } else {
        console.log("JWT callback token.user:", token.user);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION callback token.user:", token.user);
      if (token?.user) {
        session.user = token.user;
        if (!session.user.image) session.user.image = "/default-profile.png";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
