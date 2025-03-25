import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CompanyInfo from './CompanyInfo';

const CompanyPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CompanyInfo id={id} />
      </main>
      <Footer />
    </div>
  );
};
export default CompanyPage;
