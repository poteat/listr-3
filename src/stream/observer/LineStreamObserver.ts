/**
 * A observer type which caches the results of a LineStream's callback function.
 */
export type LineStreamObserver = {
  line: string;
  cb(line: string): void;
};
