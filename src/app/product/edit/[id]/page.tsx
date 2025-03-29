import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const EditProductPage = async () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <p>Edit product</p>
      </main>
      <Footer />
    </div>
  );
};
export default EditProductPage;
