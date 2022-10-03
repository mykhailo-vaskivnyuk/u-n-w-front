class First {
  property_1_1 = 100;
  method_1_1() {
    return true;
  }
}

export class Second extends First {
  property_2_1 = 100;
  method_2_1() {
    return true;
  }
}

// const method = 'addEventListener'; // 'dispatchEvent';
// const originMethod = EventTarget.prototype[method];

// EventTarget.prototype[method] = function (...args) {
//   console.log(args);
//   return originMethod.apply(this, args);
// };
