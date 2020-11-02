import cliProgress from "cli-progress";
import logUpdate from "log-update";
import ora from "ora";

import { createProgressBar } from "../../../components/progress/createProgressBar";
import { createStatusSpinner } from "../../../components/spinner/createStatusSpinner";
import { LineStreamComposer } from "../../../stream/composer/LineStreamComposer";
import { TaskOptions } from "../../options/TaskOptions";

/**
 * A TaskElement is a task whose progress is rendered to the terminal, as both
 * a boolean status
 */
export class TaskElement {
  /**
   * The composer, which combines one or more streams, each of which renders
   * successive lines, into one stream which renders multiple lines in sync.
   */
  private composer: LineStreamComposer;

  /**
   * A progress bar, if this task was configured to possess one.
   */
  private singleBar: cliProgress.SingleBar | undefined;

  /**
   * The underlying spinner associated with this task.
   */
  private spinner: ora.Ora;

  /**
   * A stored variable to prevent from "finishing" the task twice, which would
   * cause graphical errors.
   */
  private finished = false;

  /**
   * Construct a new TaskElement.
   *
   * @param operation Operation to display when running the task.
   * @param totalSteps Total number of steps (if applicable)
   * @param options Options to configure components with.
   */
  constructor(
    operation: string,
    private readonly totalSteps?: number,
    private readonly options?: TaskOptions
  ) {
    this.composer = new LineStreamComposer((lines) => {
      if (this.options?.stream) {
        this.options.stream.write(lines.join(""));
      } else {
        logUpdate(lines.join(""));
      }
    });

    this.spinner = createStatusSpinner(
      operation,
      this.composer.stream({ forceNewline: true }),
      this.options?.spinnerOptions
    );

    if (totalSteps) {
      this.singleBar = createProgressBar(
        this.composer,
        this.options?.progressBarOptions,
        this.options?.progressBarTheme
      );

      this.singleBar.start(totalSteps, 0);
    }
  }

  /**
   * Update the progress of the underlying progress bar, if any exists. If the
   * total number of steps wasn't configured for this task, this function
   * cannot be called.
   *
   * @param value Value to set progress bar to
   */
  public updateProgressBar(value?: number) {
    if (!this.totalSteps || !this.singleBar) {
      throw new Error(
        `Cannot update task process as \`totalSteps\` is undefined.`
      );
    }

    if (value) {
      this.singleBar.update(value);
    } else {
      this.singleBar.increment();
    }
  }

  /**
   * Finish this task - among other things, we print the final state of the
   * spinner and make a new line.
   *
   * This function can only be called once; it is idempotent.
   *
   * Optionally, the final state of the spinner can be annotated with a message.
   *
   * @param message Message to print.
   */
  public finish(message?: string) {
    if (!this.finished) {
      this.composer.disable();
      this.spinner.succeed();
      this.singleBar?.stop();

      const finishConnector = this.options?.finishConnector ?? "::";

      this.composer.render(
        0,
        message ? [` ${finishConnector} ${message}`] : []
      );

      if (this.options?.stream) {
        this.options?.stream.write("\n");
      } else {
        console.log();
      }

      this.finished = true;
    }
  }
}
