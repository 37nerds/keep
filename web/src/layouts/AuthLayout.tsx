import { ReactNode } from "react";

const AuthLayout = ({ children, firstText }: { children: ReactNode; firstText: string }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#202124]">
            <div className="flex flex-col items-center">
                <p className="text-xl text-white">{firstText}</p>
                <h1 className="text-5xl text-white">37nerds/keep</h1>
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
