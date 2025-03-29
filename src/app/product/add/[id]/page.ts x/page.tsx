import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const NewProductPage = () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <p>new product</p>
      </main>
      <Footer />
    </div>
  );
};
export default NewProductPage;
