import nextAuth, { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";

// import { authOptions } from "../api/auth/[...nextauth]/route";
// import authOptions from "../api/auth/[...nextauth]/route"

export default async function getSession() {
  return await getServerSession(authOptions);
}
