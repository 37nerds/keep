import PageContainer from "./components/PageContainer";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

const App = () => {
    return (
        <div className="h-screen bg-[#202124] text-white">
            <Header />
            <div className="flex ">
                <Sidebar />
                <PageContainer>Hello</PageContainer>
            </div>
        </div>
    );
};

export default App;
