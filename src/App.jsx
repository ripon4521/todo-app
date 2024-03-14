import AppContent from "./components/AppContent";
import AppHeade from "./components/AppHeader";

function App() {
  return (
    <div className=" ">
      <h1 className="text-center text-white text-2xl font-semibold">
        TODO LIST
      </h1>
      <AppHeade></AppHeade>
      <div className="flex justify-center  mt-10 ">
        <AppContent />
      </div>
    </div>
  );
}

export default App;
