import LogoutButton from "@/components/Button/Logout";
import Footer from "@/components/Footer";
import LoginForm from "@/components/Form/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Navbar from "../../components/Navbar";


const Login = async () => {
  const session = await auth()

  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          { session ? (
          <CardContent className="flex flex-col text-marine">
            <p>Vous êtes déjà connecté </p>
            <div className="flex gap-4 justify-end mt-8">
              <Button variant={"outline"} asChild >
                <Link href={"/dashboard"}>
                  Dashboard
                </Link>
              </Button> 
              <LogoutButton />
            </div>
          </CardContent>):
          (<>
            <CardHeader>
              <CardTitle className="text-marine text-2xl text-center">
                Connexion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
          </>)}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;