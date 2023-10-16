/**
 * JSON Serializable Type
 *
 * we can convert this type into json string with JSON.stringify() method
 *
 * we can pass this type of data in the request payload body
 */
export type TJson =
    | string
    | number
    | boolean
    | null
    | TJson[]
    | {
          [key: string]: TJson;
      };

export type TQueries = Record<string, TJson>;

export type TResponse = {
    status: number;
    payload: TJson;
};

export type TError = {
    name: string;
    message: string;
    errors?: object[];
};
