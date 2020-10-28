import ora from "ora";
import stream from "stream";

/**
 * Create a status spinner compatible with non-TTY modes of operation, in that
 * graphical composition is performed in a deferred manner.
 *
 * @param operation Operation to represent.
 * @param stream Stream to send output to.
 */
export function createStatusSpinner(
  operation: string,
  stream: stream.Writable,
  additionalOraOptions?: ora.Options
) {
  return ora({
    text: operation,
    stream,
    isEnabled: true,
    discardStdin: false,
    ...additionalOraOptions,
  }).start();
}
