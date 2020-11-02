import { TaskOptions } from "../options/TaskOptions";
import { TaskElement } from "./components/TaskElement";
import { TaskConstructor } from "./types/TaskConstructor";

/**
 * The Task instance type, which can be finished and set to operation modes.
 */
export type Task = ((operation: string) => void) & {
  (operation: string, totalSteps?: number | undefined): (
    value?: number | undefined
  ) => void;
  finish: (message?: string | undefined) => void;
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

  const taskFcn: Task = (operation: string, totalSteps?: number) => {
    finish();

    _task = new TaskElement(operation, totalSteps, options);
    taskFinished = false;

    return _task.updateProgressBar.bind(_task);
  };

  taskFcn["finish"] = finish;

  return taskFcn;
} as unknown) as TaskConstructor;
