import { TError } from "@/helpers/types";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";

import http from "@/helpers/http";

type TRegisterUserPayload = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export type TLoggedUser = TRegisterUserPayload;

export const useRegisterMutation = () => {
    const m = useMutation<TLoggedUser, TError, TRegisterUserPayload>({
        mutationFn: data => http.post("/users/register", data, 201),
        mutationKey: ["post.users-registers"],
    });
    useEffect(() => {
        if (m.isError) {
            console.log(m.error);
        }
    }, [m]);
    return m;
};

export const useProfileQuery = (enabled: boolean = true) => {
    const q = useQuery<TLoggedUser, TError>({
        queryFn: () => http.get("/users/profile", 200),
        queryKey: ["get.users-profile"],
        retry: false,
        enabled: enabled,
    });
    useEffect(() => {
        if (q.isError) {
            console.log(q.error);
        }
    }, [q]);
    return q;
};
