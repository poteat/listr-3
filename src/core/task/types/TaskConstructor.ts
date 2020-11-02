import { TaskOptions } from "../../options/TaskOptions";
import { Task } from "../Task";

/**
 * We pretend that `Task` is a class that returns both a self-function which
 * sets the current operation, and a record which possesses a function
 * called `finish`.
 */
export type TaskConstructor = {
  new (options?: TaskOptions | undefined): Task;
};
