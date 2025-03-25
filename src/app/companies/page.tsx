import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Companies from './Companies';

const CompaniesPage = () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine my-8">
          <CardHeader>
            <CardTitle className="text-marine text-2xl text-center">
              Liste des entreprises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Companies />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
export default CompaniesPage;
