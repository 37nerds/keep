import PageContainer from "./components/PageContainer";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

const App = () => {
    return (
        <div className="flex h-screen w-screen flex-col bg-[#202124] text-white">
            <Header />
            <div className="flex h-full overflow-hidden">
                <Sidebar />
                <PageContainer>Hello</PageContainer>
            </div>
        </div>
    );
};

export default App;
