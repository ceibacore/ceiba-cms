import type { EditorErrorCode } from '../errors';
import { EditorError } from '../errors';

/** Error body of the module API: { error: { code, message, fieldErrors, requestId } }. */
interface ApiErrorBody {
  error?: { code?: unknown; message?: unknown; fieldErrors?: unknown; requestId?: unknown };
}

const strings = (value: unknown): Record<string, string> => {
  const out: Record<string, string> = {};
  if (typeof value === 'object' && value !== null) {
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === 'string' || typeof item === 'number') out[key] = String(item);
    }
  }
  return out;
};

const codeFor = (status: number, apiCode: string): EditorErrorCode => {
  if (apiCode === 'PUBLIC_CONTENT_DRIFT') return 'PUBLIC_CONTENT_DRIFT';
  if (status === 409 && apiCode === 'MEDIA_IN_USE') return 'MEDIA_IN_USE';
  if (status === 412 || apiCode === 'REVISION_CONFLICT') return 'REVISION_CONFLICT';
  if (status === 403 || status === 401) return 'AUTHORIZATION_DENIED';
  if (status === 422 || status === 400) return 'VALIDATION_FAILED';
  if (status === 404) return 'NODE_NOT_FOUND';
  return 'SERVER';
};

/** Maps an HTTP error to an EditorError. Only codes and field errors travel; never the response body as a whole. */
export const errorFromResponse = (status: number, body: unknown): EditorError => {
  const error = (body as ApiErrorBody | null)?.error ?? {};
  const apiCode = typeof error.code === 'string' ? error.code : '';
  const details = strings(error.fieldErrors);
  if (typeof error.requestId === 'string') details.requestId = error.requestId;
  if (apiCode !== '') details.apiCode = apiCode;
  details.status = String(status);
  const message = typeof error.message === 'string' ? error.message : `HTTP ${status}`;
  return new EditorError(codeFor(status, apiCode), message, details);
};

export const networkError = (cause: unknown): EditorError =>
  new EditorError('NETWORK', cause instanceof Error ? cause.message : 'Network error');
