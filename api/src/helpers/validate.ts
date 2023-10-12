import { Schema, z } from "zod";
import { UnknownError, ValidationError } from "./errors";

const validate = <T>(schema: Schema, payload: T): T => {
    try {
        const validated = schema.parse(payload);
        return validated;
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            throw new ValidationError(e.message);
        } else {
            throw new UnknownError(e?.message || "");
        }
    }
};

export default validate;
