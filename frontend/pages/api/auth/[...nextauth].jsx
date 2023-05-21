import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          "https://play-pause-api.vercel.app/api/users/login/",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        const user = data;
        if (!user) {
          throw new Error("No user found !");
        }

        if (res.ok && user) {
          return user;
        }

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        return {
          token: data,
        };
      },
    }),
  ],

  secret: "YyVvXSfwdf99YQQOF0MiDL+mEAoTEEn/Qtoy+lejtn0=",

  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
});
