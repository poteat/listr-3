import { LineStream } from "../LineStream";
import { LineStreamObserver } from "../observer/LineStreamObserver";
import { LineStreamOptions } from "../options/LineStreamOptions";

/**
 * A composer class which can generate new component line streams, that all
 * contribute to calling the central callback if any one of them has changed
 * state.
 *
 * In practice, this is useful to detect a stream change given multiple streams
 * that are each attempting to write a line of output.
 */

export class LineStreamComposer {
  private lineStreamObservers: LineStreamObserver[] = [];

  private enabled = true;

  constructor(private readonly cb: (s: string[]) => void) {}

  /**
   * Construct a new LineStream that is registered to this stream composer.
   */
  public stream(options?: LineStreamOptions) {
    const lineStreamObserver = {
      line: "",
      cb: (line: string) => {
        lineStreamObserver.line = line;

        if (this.enabled) {
          this.cb(this.lineStreamObservers.map((x) => x.line));
        }
      },
    };

    this.lineStreamObservers.push(lineStreamObserver);

    return LineStream(lineStreamObserver.cb, options);
  }

  /**
   * Send an array of empty lines to the underlying callback function.
   */
  public clear() {
    this.cb(this.lineStreamObservers.map((x) => ""));
  }

  /**
   * Render a particular internal line stream state, appended with a message.
   */
  public render(i: number, append: string[] = []) {
    this.cb([this.lineStreamObservers[i].line, ...append]);
  }

  /**
   * Disable all streams from writing to the composer.
   */
  public disable() {
    this.enabled = false;
  }

  /**
   * Enable downstream line streams to write to the callback.
   */
  public enable() {
    this.enabled = true;
  }
}
