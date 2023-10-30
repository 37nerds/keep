import type { ReactNode } from "react";
import type { UseQueryResult } from "react-query";

import { TError } from "@/helpers/types";
import Loading from "../misc/Loading";

const QueryWrapper = <T,>({
    query,
    children,
}: {
    query: UseQueryResult<T, TError>;
    children: ReactNode;
}) => {
    return (
        <>
            {query.isLoading ? (
                <Loading />
            ) : query.isError ? (
                <p className="text-red-500">{query.error?.message || ""}</p>
            ) : !query.data ? (
                <p className="text-red-500">{"data is null"}</p>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default QueryWrapper;
