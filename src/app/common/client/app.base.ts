import { Store } from '../../../../lib/store/store';

export interface IAppBase {
  // services
  prop: number;
}

export class AppBase extends Store implements IAppBase {
  // services
  prop: number;

  constructor() {
    super({}, undefined, 'INIT');
  }

  async init() {
    // init services
    this.setState({ status: 'READY' });
  }
}
