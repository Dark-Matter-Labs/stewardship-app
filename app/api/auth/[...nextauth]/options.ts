import type { NextAuthOptions } from "next-auth";
import { cookies } from 'next/headers';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

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
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "example-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "example-password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "1",
          name: "user",
          email: "user@darkmatterlabs.org",
          password: "1234",
          image:
            "https://cdn.sanity.io/images/zodsj17c/production/94714dca88165089697fc43ef4ef437bec6e7016-512x512.png",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const cookieStore = cookies();
      const originPath = cookieStore.get('loginOriginPath')?.value || '/';
      const originSegment = cookieStore.get('loginOriginSegment')?.value || 'home';

      const spaceDetails = await getSpace(originSegment);
      

      const { email, name, image } = user;
      const agentName = name + " - Agent";
      // @ts-ignore
      const imgLink = image.replace("=s96-c", "");

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
            _ref: spaceDetails[0].id, // Reference the space ID here
          },
          imgLink,
        });

        await client.create({
          _type: "actant",
          _id: uuidv4(),
          name,
          space: {
            _type: "reference",
            _ref: spaceDetails[0].id, // Reference the space ID here
          },
          imgLink,
          slug: {
            _type: "slug",
            // @ts-ignore
            current: name.replace(/ /g, "-"),
          },
          agents: [
            {
              _type: "reference",
              _ref: agent._id, // Reference the agent's ID here,
              _key: genRanHex(12),
            },
          ],
        });
      }

      return true; // Continue with the sign-in process
    },

    async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },

    // async session({ session, token }) {
    //   // Attach the Sanity user data to the session if needed
    //   session.user.id = token.sub; // Example of setting a session value
    //   return session;
    // },

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
  },
};
