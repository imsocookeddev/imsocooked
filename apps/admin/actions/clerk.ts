'use server'
import { adminAction } from "@/lib/safe-action"
import z from "zod"
import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"


export const signUserOutAction = adminAction
.action(
  async ({ }) =>{
    const { sessionId, redirectToSignIn} = auth()
    const { sessions } = clerkClient();
    const res = await sessions.revokeSession(sessionId!);
    console.log(res.status);
    if (res.status !== 'revoked'){
      throw new Error('Failed to revoke session')
    }
    redirectToSignIn()
  }
)