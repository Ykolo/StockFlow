"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";

const RegisterFormSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})
type RegisterFormType = z.infer<typeof RegisterFormSchema>

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  
  const onSubmit = async (formData: RegisterFormType) => {
    setIsLoading(true)
    try{
      console.log("Form submitted:", formData);
    }catch(e){
      console.error("Register error:", e)
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col text-marine gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="name" render={({field}) => (
          <FormItem>
            <FormLabel className="ml-2">Nom</FormLabel>
            <FormControl>
              <Input {...field} id="name" placeholder="Entrez votre nom " className="placeholder:text-marine/50 border-marine/20" />
            </FormControl>
          </FormItem>
        )}/>
        <FormField control={form.control} name="email" render={({field}) =>(
          <FormItem>
            <FormLabel className="ml-2">Email</FormLabel>
            <FormControl>
              <Input {...field} id="email" placeholder="exemple@gmail.com" className="placeholder:text-marine/50 border-marine/20" />
            </FormControl>
          </FormItem>
        )}/>
        <FormField control={form.control} name="password" render={({field}) => (
          <FormItem>
            <FormLabel className="ml-2">Mot de passe</FormLabel>
            <FormControl>
              <Input {...field} id="password" placeholder="Mot de passe..." className="placeholder:text-marine/50 border-marine/20" />
            </FormControl>
          </FormItem>
        )}/>
        <Button className="bg-feu hover:bg-feu-hover" type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  )
}
export default RegisterForm