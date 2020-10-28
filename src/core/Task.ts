import { TaskOptions } from "./options/TaskOptions";
import { TaskElement } from "./task/TaskElement";

/**
 * We pretend that `Task` is a class constructor that returns both a function
 * which sets the current operation, and a record which possesses a function
 * called `finish`.
 */
export type Task = {
  new (options?: TaskOptions | undefined): ((operation: string) => void) & {
    (operation: string, totalSteps?: number | undefined): (
      value?: number | undefined
    ) => void;
    finish: (message?: string | undefined) => void;
  };
};

/**
 * A constructor which constructs a reusable `task` element given some global
 * options.
 *
 * @param options Options to configure the underlying reusable task.
 */
export const Task = (function (options?: TaskOptions) {
  let taskFinished = false;
  let _task: TaskElement;

  const finish = (message?: string) => {
    if (!taskFinished) {
      taskFinished = true;
      _task?.finish(message);
    }
  };

  const taskFcn = (operation: string, totalSteps?: number) => {
    finish();

    _task = new TaskElement(operation, totalSteps, options);
    taskFinished = false;

    return _task.updateProgressBar.bind(_task);
  };

  taskFcn["finish"] = finish;

  return taskFcn as ((operation: string) => void) & typeof taskFcn;
} as unknown) as Task;
