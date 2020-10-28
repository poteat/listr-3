import { LineBuffer } from "line-buffer";
import { last } from "lodash";
import stream from "stream";

import { LineStreamOptions } from "./options/LineStreamOptions";

/**
 * Construct a line stream from a callback function. Every time the returned
 * Writable stream has a complete line available, we call the callback with
 * that line.
 *
 * If a given chunk has more than one line available, we only call the last
 * line in the chunk.
 *
 * @param cb Callback to pass processed lines into.
 */
export function LineStream(
  cb: (s: string) => void,
  options?: LineStreamOptions
) {
  const buffer = new LineBuffer();

  let wroteOnce = false;

  return new stream.Writable({
    write: (chunk: Buffer, _encoding, done) => {
      let maybeError: Error | undefined;

      try {
        let chunkText = chunk.toString();

        if (options?.forceNewline && last(chunkText) !== "\n") {
          chunkText = `${chunkText}\n`;
        }

        const line = last(buffer.feed(chunkText));

        if (line) {
          wroteOnce = true;
          cb(line);
        }
      } catch (error) {
        maybeError = error;
      }

      done(maybeError);
    },
  });
}
