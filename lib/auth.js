import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions = {
  // Remove PrismaAdapter to prevent automatic account linking
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Check if user exists in database
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // If user doesn't exist, create a new one
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: "USER", // Default role
            },
          });
        }

        // Skip account creation for now to focus on the core issue
        console.log("JWT: Skipping account creation for debugging");

        console.log(
          `JWT: Initial sign in for ${dbUser.email} with role ${dbUser.role}`
        );
        return {
          ...token,
          id: dbUser.id,
          email: dbUser.email,
          role: dbUser.role,
        };
      }

      // For subsequent requests, always fetch the latest role from database
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          console.log(
            `JWT: Updating role for ${token.email} to ${dbUser.role}`
          );
          token.role = dbUser.role;
        } else {
          console.log(`JWT: No user found for email ${token.email}`);
        }
      } else {
        console.log("JWT: No email in token", token);
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        console.log(
          `Session: User ${session.user.email} has role ${session.user.role}`
        );
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (user?.email) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/admin/signin",
    error: "/admin/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
