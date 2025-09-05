import type { NextAuthOptions } from "next-auth";
import { cookies } from 'next/headers';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

// Extend NextAuth session user type to include 'id'
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
  }
}

import { client, genRanHex, getSpace } from "@/sanity/sanity-utils";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/signout',
    error: '/api/auth/error',
  },
  events: {
    async signOut(message) {
      console.log("User signed out:", message);
    },
    async signIn(message) {
      console.log("User signed in:", message);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const cookieStore = cookies();
        const originPath = cookieStore.get('loginOriginPath')?.value || '/';
        const originSegment = cookieStore.get('loginOriginSegment')?.value || 'home';

        const spaceDetails = await getSpace(originSegment);
        
        if (!spaceDetails || spaceDetails.length === 0) {
          console.error("Space not found:", originSegment);
          // For OAuth, continue with sign in but don't create Sanity records
          return true;
        }

        const { email, name, image } = user;
        const agentName = name + " - Agent";
        const imgLink = image ? image.replace("=s96-c", "") : "";

        // Check if user already exists in Sanity in the given space
        const query = `*[_type == "agent" && email == $email][0]`;
        const existingUser = await client.fetch(query, { email });

        if (!existingUser) {
          const agent = await client.create({
            _type: "agent",
            _id: uuidv4(),
            email,
            name: agentName,
            space: {
              _type: "reference",
              _ref: spaceDetails[0].id,
            },
            imgLink,
          });

          await client.create({
            _type: "actant",
            _id: uuidv4(),
            name,
            space: {
              _type: "reference",
              _ref: spaceDetails[0].id,
            },
            imgLink,
            slug: {
              _type: "slug",
              current: name?.replace(/ /g, "-") || "unknown",
            },
            agents: [
              {
                _type: "reference",
                _ref: agent._id,
                _key: genRanHex(12),
              },
            ],
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        // For OAuth, allow sign in to continue even if Sanity operations fail
        return true;
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirect callback - url:", url, "baseUrl:", baseUrl);
      
      // Prevent redirect loops by checking if we're already at the target
      if (url === baseUrl) {
        return baseUrl;
      }
      
      // If it's a signin redirect, go to our custom login page
      if (url.includes('/api/auth/signin')) {
        return `${baseUrl}/login`;
      }
      
      // For any other URL, allow it if it's on the same origin
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    },

    async session({ session, token }) {
      // Attach the Sanity user data to the session if needed
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      // Optionally add user information to the JWT token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
