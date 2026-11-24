/** Stable error codes of the editor core; the UI translates them (plan 03, "código estable y mensaje traducible"). */
export type EditorErrorCode =
  | 'NODE_NOT_FOUND'
  | 'INVALID_TARGET'
  | 'CYCLE'
  | 'PLACEMENT_NOT_ALLOWED'
  | 'UNKNOWN_COMPONENT'
  | 'LOCKED_COMPONENT'
  | 'DUPLICATE_ID'
  | 'MAX_NODES'
  | 'MAX_DEPTH'
  | 'DOCUMENT_TOO_LARGE'
  | 'INVALID_DOCUMENT'
  | 'NOTHING_TO_SAVE'
  | 'SAVE_IN_PROGRESS'
  | 'REVISION_CONFLICT'
  | 'PUBLIC_CONTENT_DRIFT'
  | 'NOTHING_TO_PUBLISH'
  | 'VALIDATION_FAILED'
  | 'AUTHORIZATION_DENIED'
  | 'MEDIA_IN_USE'
  | 'SITE_PART_CONFLICT'
  | 'NETWORK'
  | 'SERVER';

export class EditorError extends Error {
  constructor(
    readonly code: EditorErrorCode,
    message: string,
    readonly details: Readonly<Record<string, string>> = {},
  ) {
    super(message);
    this.name = 'EditorError';
  }
}

export const fail = (code: EditorErrorCode, message: string, details: Record<string, string> = {}): never => {
  throw new EditorError(code, message, details);
};
