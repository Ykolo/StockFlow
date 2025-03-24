import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";

const Home = async () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1>Hello world!</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;