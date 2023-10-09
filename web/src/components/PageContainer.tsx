import { ReactNode } from "react";

const PageContainer = ({children} : {children: ReactNode}) => {
    return <div className="p-[100px]">{children}</div>
}

export default PageContainer;
