import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  // Configure the JWT (JSON Web Token) encoding and decoding functions
  jwt: {
    // Encoding function: Signs the token with specified data, secret, and expiration
    encode: ({ secret, token }) => {
      // console.log('jsonwebtoken', token);
      // console.log('jsonwebtoken secret', secret);

      return jsonwebtoken.sign(
        {
          ...token,
          iss: 'devspace',
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, // Expiration time (1 hour from now)
        },
        secret
      );
    },

    // Decoding function: Verifies the token's integrity and returns the decoded data
    decode: async ({ secret, token }) => {
      // console.log('decode secret', secret);
      // console.log('decode', token);
      return jsonwebtoken.verify(token!, secret) as JWT;
    },
  },

  // Configure the authentication callbacks
  callbacks: {
    // JWT callback: Executed whenever a JSON Web Token is created or updated
    async jwt({ profile, token }) {
      // console.log('token: ', token);
      // console.log('profile: ', profile);

      if (profile && 'login' in profile) {
        token.username = profile.login;
      }

      return token;
    },

    // // Session callback: Executed whenever a new session is created or updated
    async session({ session, token }) {
      return session;
    },
  },
};
