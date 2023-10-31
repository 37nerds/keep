import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
    return <div className="w-full px-[100px]">{children}</div>;
};

export default PageContainer;
