![listr-3](./logo/listr3.png)

A dead-simple terminal task list.

## Installation

```sh
npm i listr3
```

## Example

![listr-3-anim](./logo/cast/demo.gif)

Listr3 is designed to be super-simple to use. No need to write a schema before-hand, just say what you're doing and we'll handle it.

```ts
import Task from "listr3"

const task = new Task()

task("Doing stuff...")
sleep(1000)

task("Doing next stuff...")
sleep(1000)

const progress = task("Doing some complicated stuff", 400)

for (let i = 0; i < 400; i++) {
  sleep(100)
  progress()
}

task("Finally finishing up...")
sleep(1000)

task.finish()
```

## Customization

We use the `ora` and `cli-progress` projects and make those option sets fully available - check out the types.

## Contribution

Contribution is encouraged! If I missed anything, or there's a use-case I didn't consider, definitely feel free to file an issue and/or PR. This project is licensed under the MIT license as most npm packages are. (see [license.md](./license.md)).
