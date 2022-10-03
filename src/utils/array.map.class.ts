export class ArrayMap<T = any> extends Array<T> {
  insert(value: T) {
    return new ArrayMap(...this, value);
  }

  remove(value: T) {
    const array = this.filter((item) => item !== value);
    return new ArrayMap(...array);
  }
}
