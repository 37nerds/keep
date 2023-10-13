import { TStatusCode } from "./types";

export class HttpError extends Error {
    status: TStatusCode;
    constructor(message: string, status: TStatusCode) {
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

export class ValidationError extends HttpError {
    constructor(message: string) {
        super(message, 400);
        this.name = "Validation Error";
    }
}