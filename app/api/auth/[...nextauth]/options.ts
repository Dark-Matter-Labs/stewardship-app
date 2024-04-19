import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
          name: "shu",
          password: "nextauth",
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
};
