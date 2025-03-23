import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          {/* <CardContent className="flex flex-col text-marine">
            <p>Vous êtes déjà connecté </p>
            <div className="flex gap-4 justify-end mt-8">
              <Button variant={"outline"} asChild >
                <Link href={"/dashboard"}>
                  Dashboard
                </Link>
              </Button> 
              <LogoutButton />
            </div>
          </CardContent> */}
          <CardHeader>
            <CardTitle className="text-marine text-2xl text-center">
              Créer un compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;