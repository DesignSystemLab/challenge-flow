import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { friebaseAdmin } from '../../../shared/firebase';
import type { AuthProvider } from '../../../auth/types';
type RequestParam = {
  providerType: AuthProvider | 'none';
  tokenId: string;
};

type TokenType = {
  name: string;
  uid: string;
  email?: string;
  picture?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'challengeflow',
      credentials: {},
      async authorize(_, req): Promise<any> {
        const { providerType, tokenId } = req.query as RequestParam;
        const decodeUserInfo = (await friebaseAdmin.auth().verifyIdToken(tokenId)) as unknown as TokenType;
        const { uid: id, name, picture: image, email } = decodeUserInfo;
        if (decodeUserInfo) {
          return {
            id,
            name,
            image,
            email
          };
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.user.uid = token.sub || '';
        session.user.name = token.name || null;
        session.user.email = token.email || null;
        session.user.image = token.picture || null;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
