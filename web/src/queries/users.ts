import { TError } from "@/helpers/types";
import { useMutation } from "react-query";

import http from "@/helpers/http";
import { useEffect } from "react";

type TRegisterUserPayload = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export type TLoggedUser = TRegisterUserPayload;

export const useRegisterMutation = () => {
    const mutation = useMutation<TLoggedUser, TError, TRegisterUserPayload>({
        mutationFn: data => http.post("/users/register", data, 201),
        mutationKey: ["post.users-registers"],
    });
    useEffect(() => {
        if (mutation.isError) {
            console.log(mutation.error);
        }
    }, [mutation]);

    return mutation;
};
