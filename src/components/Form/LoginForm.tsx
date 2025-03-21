"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"

const LoginFormSchema = z.object({
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères"),
  password: z.string().min(3, "Le mot de passe doit contenir au moins 3 caractères"),
})
type LoginFormType = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true)
    try {
      console.log("Form submitted:", data)
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: true,
      })
      toast.success("Vous êtes connecté avec succès")
    } catch (error) {
      console.error("Google sign in error:", error)
      toast.error("Une erreur s'est produite lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 text-marine" onSubmit={form.handleSubmit(onSubmit)}>

        <FormField control={form.control} name="login" render={({field}) => (
          <FormItem> 
            <FormLabel className="ml-2">Login</FormLabel>
            <FormControl>
              <Input id="login" placeholder="exemple@gmail.com" {...field} className="placeholder:text-marine/50 border-marine/20" />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({field}) => (
          <FormItem> 
            <FormLabel className="ml-2">Mot de passe</FormLabel>
            <FormControl>
              <Input id="password" placeholder="Mot de passe..." {...field} className="placeholder:text-marine/50 border-marine/20" />
            </FormControl>
          </FormItem>
        )} />

        <Button 
          type="submit" 
          className="bg-feu hover:bg-feu-hover"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Connexion'}
        </Button>
        <span className="text-center">OR </span>
        <Button 
          type="button"
          variant={"outline"} 
          className="border-2 border-marine text-marine" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          Google <FaGoogle className="ml-2" />
        </Button>
      </form>
    </Form>
  )
}
export default LoginForm