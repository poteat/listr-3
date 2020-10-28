import cliProgress from "cli-progress";

import { LineStreamComposer } from "../../stream/composer/LineStreamComposer";

/**
 * Create a progress bar compliant with non-TTY applications.
 *
 * @param composer A copy of the CLI compositor.
 * @param options Additional options to include.
 * @param theme Optional theme to style the progress bar with.
 */
export function createProgressBar(
  composer: LineStreamComposer,
  options?: cliProgress.Options,
  theme: cliProgress.Preset = cliProgress.Presets.shades_classic
) {
  return new cliProgress.SingleBar(
    {
      noTTYOutput: true,
      notTTYSchedule: 1000 / 30,
      etaBuffer: 100,
      stream: composer.stream(),
      ...options,
    },
    theme
  );
}
