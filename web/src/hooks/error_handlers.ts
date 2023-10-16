import { TError } from "@/helpers/types";
import { useEffect } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

export const useMutationEH = <T, T2>(mutation: UseMutationResult<T, TError, T2>) => {
    useEffect(() => {
        if (mutation.isError) {
            console.log(mutation.error?.message);
        }
    }, [mutation.isError]);
};

export const useQueryEH = <T>(query: UseQueryResult<T, TError>) => {
    useEffect(() => {
        if (query.isError) {
            console.log(query.error?.message);
        }
    }, [query.isError]);
};
