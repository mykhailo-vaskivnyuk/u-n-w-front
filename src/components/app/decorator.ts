/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */

function Log(target: Object, proprtyName: string, discriptor: PropertyDescriptor) {
  console.log('RUN DECORATOR');
  console.log(Test.prototype === target);
  const { value: curValue } = discriptor;

  function value(this: typeof target, ...args: any[]) {
    console.log(...args);
    curValue.apply(this, args);
  }

  return { ...discriptor, value };
}

export class Test {
  counter: number;

  @Log
  setCounter(value: number) {
    this.counter = value;
  }
}
