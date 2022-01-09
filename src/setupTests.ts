import "@testing-library/jest-dom";

// Makes the Radix UI components work with JSDOM environments. For more info:
// https://github.com/radix-ui/primitives/issues/420#issuecomment-771615182

// @ts-ignore
global.ResizeObserver = class ResizeObserver {
  // @ts-ignore
  constructor(cb) {
    // @ts-ignore
    this.cb = cb;
  }
  observe() {
    // @ts-ignore
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
};

global.DOMRect = {
  // @ts-ignore
  fromRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }),
};
