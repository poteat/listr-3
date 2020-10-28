/**
 * Options to configure the operation of a line stream.
 */

export type LineStreamOptions = {
  /**
   * If a chunk does not have a newline at the end, append a newline.
   */
  forceNewline?: boolean;
};
