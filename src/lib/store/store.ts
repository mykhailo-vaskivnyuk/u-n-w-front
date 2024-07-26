/* eslint-disable no-await-in-loop */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { EventEmitter } from '../event-emitter/event.emitter';
import { ErrorClass, ErrorInstance } from '../error/error';
import { ServiceErrorClass, ServiceErrorInstance } from '../error/service.error';
import { isChanged, toConsole } from '../utils';
import { IStatusProps, IFullState, StoreStatusKey } from './store.types';

export class Store<
  State extends object = object,
  StatusKey extends string = string,
  ErrorKey extends string = string,
  FullState extends IFullState<State, StatusKey, ErrorKey> = IFullState<State, StatusKey, ErrorKey>,
> extends EventEmitter {
  protected $state: State;

  protected loading = false;

  protected status: StoreStatusKey<StatusKey>;

  protected error: ErrorInstance<ErrorKey> | ServiceErrorInstance<ErrorKey> | null = null;

  protected ac: AbortController | null = null;

  protected timer?: NodeJS.Timeout;

  constructor(
    protected initialState: State,
    public Error: ErrorClass<ErrorKey> | ServiceErrorClass<ErrorKey>,
    protected initialStatus: StoreStatusKey<StatusKey> = 'READY',
  ) {
    super();
    this.$state = { ...this.initialState };
    this.status = initialStatus;
  }

  async init() {
    this.debug('Init method is not implemented');
  }

  get state(): FullState {
    return { ...this.$state, ...this.statusProps } as FullState;
  }

  private get statusProps() {
    const { loading, status, error } = this;
    return { loading, status, error };
  }

  protected setState(newState: Partial<FullState>) {
    const { loading, status, error, ...otherProps } = newState;
    let statusChanged = false;
    if (typeof loading !== 'undefined') {
      this.loading = loading;
      statusChanged = true;
    }
    if (typeof status !== 'undefined') {
      this.status = status;
      statusChanged = true;
    }
    if (typeof error !== 'undefined') {
      this.error = error;
      statusChanged = true;
    }
    if (Object.keys(otherProps)) {
      this.$state = Object.assign(this.$state, otherProps);
      this.emit('state', this.$state);
    }
    if (statusChanged) {
      this.emit('status', this.statusProps);
    }
  }

  protected setError(
    e: unknown,
    key?: ErrorInstance<ErrorKey>['key'],
    partialState?: Partial<FullState>,
  ) {
    const error = this.Error.from(e, key);
    this.error = error;
    this.abort();
    this.setState({ error, ...partialState } as FullState);
    return error;
  }

  subscribe(
    cb: (state: FullState) => void,
    keys: (keyof FullState)[] = [],
    as: AbortSignal | null = null,
    emitStateOnInit = false,
  ) {
    let curState = this.state;

    const handler = (state: State) => {
      const newState = { ...state, ...this.statusProps } as FullState;
      const changed = isChanged(keys, curState, newState);
      curState = newState;
      changed && cb(curState);
    };

    const off = this.on('state', handler);
    as?.addEventListener('abort', off);
    emitStateOnInit && cb(curState);

    return off;
  }

  useState(keys: (keyof FullState)[] = [], ...args: any[]) {
    const [state, setState] = useState(() => this.state);

    this.debug(...args);

    useEffect(() => {
      return this.subscribe(setState, keys, null, false);
    }, [...keys]);

    return state;
  }

  useStatus(keys: (keyof IStatusProps<StatusKey, ErrorKey>)[] = [], ...args: any[]) {
    const [state, setState] = useState(() => this.statusProps);

    this.debug(...args);

    useEffect(() => {
      let curStatusProps = this.statusProps;

      const handler = (newStatusProps: IStatusProps<StatusKey, ErrorKey>) => {
        const changed = isChanged(keys, curStatusProps, newStatusProps);
        curStatusProps = newStatusProps;
        changed && setState(curStatusProps);
      };

      return this.on('status', handler);
    }, [...keys]);

    return state as IStatusProps<StatusKey, ErrorKey>;
  }

  async *getIterator(
    keys: (keyof FullState)[] = [],
    as?: AbortSignal,
    emitStateOnInit = false,
  ): AsyncGenerator<FullState> {
    const eventQueue: FullState[] = [];
    let resolve: ((state?: FullState) => void) | undefined;

    const onState = (newState: FullState) => {
      if (resolve) {
        resolve(newState);
      } else {
        eventQueue.push(newState);
      }
    };

    const off = this.subscribe(onState, keys, as, emitStateOnInit);
    const onAbort = () => {
      off();
      resolve?.();
    };
    this.ac?.signal.addEventListener('abort', onAbort);
    as?.addEventListener('abort', onAbort);
    const aborted = () => as?.aborted || this.ac?.signal.aborted;

    const setResolve = (rv: (state?: FullState) => void) => {
      resolve = (state?: FullState) => {
        resolve = undefined;
        rv(state);
      };
    };

    do {
      let newState = eventQueue.shift();
      if (newState) {
        yield newState;
      } else {
        newState = await new Promise(setResolve);
        if (!newState) {
          return;
        }
        if (aborted()) {
          return;
        }
        yield newState;
      }
    } while (!aborted());
  }

  useLoading(startDelay?: number, stopDelay?: number) {
    const [value, setValue] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout | undefined;
      const start = () => {
        setValue(true);
        timer = undefined;
      };
      const stop = () => {
        setValue(false);
        timer = undefined;
      };
      let handleStart = start;
      let handleStop = stop;
      if (startDelay) {
        handleStart = () => {
          timer = setTimeout(start, startDelay, true) as any;
        };
      }
      if (stopDelay) {
        handleStop = () => {
          timer = setTimeout(stop, stopDelay, false) as any;
        };
      }
      let prevLoading = false;
      const handler = () => {
        if (this.loading === prevLoading) {
          return;
        }
        prevLoading = this.loading;
        clearTimeout(timer);
        if (timer) {
          timer = undefined;
        } else {
          this.loading ? handleStart() : handleStop();
        }
      };
      return this.on('status', handler);
    }, [startDelay, stopDelay]);

    return value;
  }

  protected getFromStorage(): FullState {
    const key = this.constructor.name;
    try {
      const stateSerialized = localStorage.getItem(key);
      return JSON.parse(stateSerialized || '{}');
    } catch (e) {
      return {} as FullState;
    }
  }

  protected saveToStorage() {
    const key = this.constructor.name;
    try {
      const stateSerialized = JSON.stringify(this.state);
      localStorage.setItem(key, stateSerialized);
    } catch (e) {
      throw this.Error.from(e);
    }
  }

  debug(...args: any[]) {
    toConsole(this, ...args);
  }

  abort() {
    if (!this.ac) {
      return;
    }
    this.ac.abort();
    this.ac = null;
    if (this.error) {
      return;
    }
    this.setError(null, 'ABORT');
  }

  clear(withStatus?: StoreStatusKey<StatusKey>) {
    clearTimeout(this.timer);
    this.abort();
    const loading = false;
    const status = withStatus || this.initialStatus;
    const error = null;
    this.setState({ ...this.initialState, loading, error, status });
  }

  dispose() {
    this.setState({ status: 'DISPOSE' } as Partial<FullState>);
    this.emit('dispose', {});
    clearTimeout(this.timer);
    this.ac?.abort();
    this.offAll();
    this.saveToStorage();
  }
}
