"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useSessionStore } from "../store/sessionStore"

const SessionSync = () => {
  const {data: session} = useSession()
  const setUser = useSessionStore((state) => state.setUser)
  useEffect(() => {
    if (session) {
      setUser(session.user)
    }
  }, [session, setUser])
  return null
} 
export default SessionSync