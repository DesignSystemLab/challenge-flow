import { fetchAddUser } from '@auth/remotes/fetchAddUser';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { friebaseAdmin } from '../../../shared/firebaseAdmin';
import type { NextAuthOptions } from 'next-auth';
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
      async authorize(_, req) {
        const { tokenId, providerType } = req.query as RequestParam;
        const decodeUserInfo = (await friebaseAdmin.auth().verifyIdToken(tokenId)) as unknown as TokenType;
        const { uid: id, name, picture: photo, email } = decodeUserInfo;
        if (decodeUserInfo) {
          if (providerType !== 'none') {
            await fetchAddUser({
              provider: providerType,
              userInfo: {
                uid: id,
                name,
                photo,
                email
              }
            });
          }
          return {
            id,
            name,
            photo,
            email
          };
        }
        return null;
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
        return {
          ...session,
          user: {
            uid: token.sub || '',
            name: token.name || null,
            email: token.email || null,
            image: token.picture || null
          }
        };
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);
