import cliProgress from "cli-progress";
import ora from "ora";
import { WriteStream } from "tty";

/**
 * Global options to configure the reusable constructed task object.
 */

export type TaskOptions = {
  /**
   * The text to display between the operation message and the finishing
   * message, if any exists.
   *
   * @default "::"
   */
  finishConnector?: string;

  /**
   * Stream to write to.
   *
   * @default `process.stderr`
   */
  stream?: WriteStream;

  /**
   * Options to configure the spinner.
   */
  spinnerOptions?: ora.Options;

  /**
   * Options to configure the progress bar.
   */
  progressBarOptions?: cliProgress.Options;

  /**
   * Optional theme to configure the progress bar with.
   */
  progressBarTheme?: cliProgress.Preset;
};
