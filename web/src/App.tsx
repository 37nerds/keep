import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

const App = () => {
    return (
        <div className="h-screen bg-[#202124] text-white">
            <Header />
            <Sidebar />
        </div>
    );
};

export default App;
