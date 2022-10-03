export class EventEmitter<T> {
  private cb: Record<string, Array<(data: T) => void>> = {};

  on(name: string, cb: (data: T) => void) {
    this.cb[name] ? this.cb[name].push(cb) : (this.cb[name] = [cb]);
  }

  emit(name: string, data: T) {
    (this.cb[name] || []).map((cb) => cb(data));
  }
}