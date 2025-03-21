"use client"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

const LogoutButton = () => {
  return (
    <Button className="bg-mangue hover:bg-mangue-hover text-marine"  onClick={() => {signOut()}}>Déconnexion</Button>
  )
}
export default LogoutButton