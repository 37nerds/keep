import { TError } from "@/helpers/types";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";

import http from "@/helpers/http";
import { useMutationEH, useQueryEH } from "@/hooks/error_handlers";

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
        mutationKey: ["post.users-register"],
    });
    useMutationEH(m);
    return m;
};

export const useProfileQuery = (enabled: boolean = true) => {
    const q = useQuery<TLoggedUser, TError>({
        queryFn: () => http.get("/users/profile", 200),
        queryKey: ["get.users-profile"],
        retry: false,
        enabled: enabled,
    });
    useQueryEH(q);
    return q;
};

type TLoginUserPayload = {
    email: string;
    password: string;
};

export const useLoginMutation = () => {
    const m = useMutation<TLoggedUser, TError, TLoginUserPayload>({
        mutationFn: data => http.post("/users/login", data, 200),
        mutationKey: ["post.users-login"],
    });
    useMutationEH(m);
    return m;
};

export const useLogoutMutation = () => {
    const m = useMutation<null, TError, null>({
        mutationFn: () => http.delete("/users/logout", 204),
        mutationKey: ["delete.users-logout"],
    });
    useMutationEH(m);
    return m;
};
