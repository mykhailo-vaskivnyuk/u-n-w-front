const delay = (t: number) =>
  new Promise((r) => {
    setTimeout(r, t);
  });

export class Attempts {
  constructor (
    readonly attemptCount: number = 10,
    readonly attemptDelay: number = 200,
  ) {}

  [Symbol.asyncIterator]() {
    const attemptCount = this.attemptCount > 0 ? this.attemptCount : 0;
    const attemptDelay = this.attemptDelay > 0 ? this.attemptDelay : 0;
    const done = false;
    let attempt = 1;

    return {
      async next() {
        if (attempt > attemptCount) {
          return { done: true, value: undefined };
        }
        attempt > 1 && await delay(attemptDelay);
        const value = attempt;
        attempt += 1;
        return { done, value };
      },
    };
  }
}
