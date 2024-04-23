import nextAuth, { getServerSession } from "next-auth";
import authOptions from "../libs/auth";
import NextAuth from "next-auth/next";

export default async function getSession() {
  return await getServerSession(authOptions);
}
