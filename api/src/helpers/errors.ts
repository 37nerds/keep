import type { TStatus } from "@/base/types";

export class HttpError extends Error {
    status: TStatus;
    constructor(message: string, status: TStatus) {
        super(message);
        this.name = "Http Error";
        this.status = status;
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
        this.name = "Not Found Error";
    }
}

export class ServerSideError extends HttpError {
    constructor(message: string) {
        super(message, 500);
        this.name = "Server Side Error";
    }
}

export class ProcessingError extends HttpError {
    constructor(message: string) {
        super(message, 500);
        this.name = "Processing Error";
    }
}

export class DatabaseError extends HttpError {
    constructor(message: string) {
        super(message, 500);
        this.name = "Database Error";
    }
}

export class UnknownError extends HttpError {
    constructor(message: string) {
        super(message, 500);
        this.name = "Unknown Error";
    }
}

export class BadRequestError extends HttpError {
    errors?: string;
    constructor(message: string, errors?: string) {
        super(message, 400);
        this.name = "Bad Request Error";
        this.errors = errors || "";
    }
}

export class ValidationError extends HttpError {
    errors?: string;
    constructor(message: string, errors?: string) {
        super(message, 400);
        this.name = "Validation Error";
        this.errors = errors || "";
    }
}
