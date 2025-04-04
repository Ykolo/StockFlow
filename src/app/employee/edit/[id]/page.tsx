import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpdateEmployeeForm from './updateForm';

const EditEmployeePAge = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center py-20 bg-amande">
        <Card className="w-full max-w-md border-2 border-marine/50 my-8 bg-amande">
          <CardHeader>
            <CardTitle className="text-marine text-2xl text-center">
              Modifier un employé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateEmployeeForm params={{ id }} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
export default EditEmployeePAge;
