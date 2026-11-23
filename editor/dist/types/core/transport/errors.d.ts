import { EditorError } from '../errors';
/** Maps an HTTP error to an EditorError. Only codes and field errors travel; never the response body as a whole. */
export declare const errorFromResponse: (status: number, body: unknown) => EditorError;
export declare const networkError: (cause: unknown) => EditorError;
