import "./App.css";
import Navbar from "./Components/Navbar";
import TestManager from "./Components/TestManager";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      <Navbar />
      <div className='flex-grow'>
        <TestManager />
      </div>
      <Footer />
    </div>
  );
}
export default App;
