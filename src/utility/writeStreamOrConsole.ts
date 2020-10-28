import logUpdate from "log-update";
import { WriteStream } from "tty";

/**
 * Either write to a stream if one exists, or write the text to the console via
 * `logUpdate`.
 *
 * @param text Text to write
 * @param stream Stream to write to.
 */
export function writeStreamOrConsole(text: string, stream?: WriteStream) {
  if (stream) {
    stream.write(`${text}\n`);
  } else {
    logUpdate(text);
  }
}
