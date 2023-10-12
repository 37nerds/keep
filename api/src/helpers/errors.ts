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
