import nextAuth, { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export default async function getSession() {
  return await getServerSession(handler);
}
