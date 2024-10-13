/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import dbConnect from "./dbconnect";
import UserModel from "./model/usermodel";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // If credentials are missing, return null
          return null;
        }

        // Cast credentials.email and credentials.password to string
        const email = credentials.email as string;
        const password = credentials.password as string;

        await dbConnect();

        const user = await UserModel.findOne({ email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return user;
          }
        }

        // If no user is found or password doesn't match, return null
        return null;
      },
    }),
  ],

  pages:{
    signIn:'/signin',
    newUser:'/register',
    error: '/signin',
  },
  callbacks:{
    authorized({request,auth}:{ request: { nextUrl: { pathname: string } }, auth: any }){
        const protectedPaths = [
            /\/shipping/,
            /\/payment/,
            /\/place-order/,
            /\/profile/,
            /\/order\/(.*)/,
            /\/admin/,
        ]
        const {pathname} = request.nextUrl
        if(protectedPaths.some((p)=>p.test(pathname))) return !!auth
        return true
    },
    async jwt({ user, trigger, session, token }:any) {
        if (user) {
          token.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          }
        }
        if (trigger === 'update' && session) {
          token.user = {
            ...token.user,
            email: session.user.email,
            name: session.user.name,
          }
        }
        return token
      },
      session: async ({ session, token }: any) => {
        if (token) {
          session.user = token.user
        }
        return session
      },
  }
};
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth(config)
