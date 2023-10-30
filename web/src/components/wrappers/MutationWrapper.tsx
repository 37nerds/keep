import type { ReactNode } from "react";
import type { UseMutationResult } from "react-query";

import { TError } from "@/helpers/types";

import Loading from "../misc/Loading";

const QueryWrapper = <T, T2>({
    mutation,
    children,
    errorAllowed = false,
}: {
    mutation: UseMutationResult<T, TError, T2>;
    children: ReactNode;
    errorAllowed?: boolean;
}) => {
    return (
        <>
            {mutation.isLoading ? (
                <Loading />
            ) : !errorAllowed && mutation.isError ? (
                <p className="text-red-500">{mutation.error?.message || ""}</p>
            ) : !errorAllowed && !mutation.data ? (
                <p className="text-red-500">{"data is null"}</p>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default QueryWrapper;
