export interface ScalesStyleConfig {
  app: {
    width: number;
    height: number;
    headerHeight: number;
    screenHeaderHeight: number;
    scalesStatusBarHeight: number;
  };
  scalesPanel: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  keyboard: {
    height: number;
    gap: number;
    regBtnWidth: number;
  };
  operatorModal: {
    headerHeight: number;
    keyboardHeight: number;
  };
  controlPanelWidth: number;
}

export interface ScalesStylesConfig {
  l1366: ScalesStyleConfig;
  m1024: ScalesStyleConfig;
  s800: ScalesStyleConfig;
}

const scalesStylesConfig: ScalesStylesConfig = {
  l1366: {
    app: {
      width: 1366,
      height: 768,
      headerHeight: 80,
      screenHeaderHeight: 80,
      scalesStatusBarHeight: 45,
    },
    scalesPanel: {
      width: 280,
      height: 430,
      top: 80, // min-max 80-293
      left: 0,
    },
    keyboard: {
      height: 314,
      gap: 10,
      regBtnWidth: 79,
    },
    operatorModal: {
      headerHeight: 74,
      keyboardHeight: 250,
    },
    controlPanelWidth: 170,
  },

  m1024: {
    app: {
      width: 1024,
      height: 600,
      headerHeight: 60,
      screenHeaderHeight: 70,
      scalesStatusBarHeight: 45,
    },
    scalesPanel: {
      width: 230,
      height: 450,
      top: 60, // min-max 60-105
      left: 0,
    },
    keyboard: {
      height: 240,
      gap: 8,
      regBtnWidth: 56.5,
    },
    operatorModal: {
      headerHeight: 74,
      keyboardHeight: 180,
    },
    controlPanelWidth: 115,
  },

  s800: {
    app: {
      width: 800,
      height: 600,
      headerHeight: 60,
      screenHeaderHeight: 50,
      scalesStatusBarHeight: 45,
    },
    scalesPanel: {
      width: 720,
      height: 115,
      top: 0,
      left: 80, // min-max 0-80
    },
    keyboard: {
      height: 185,
      gap: 6,
      regBtnWidth: 50,
    },
    operatorModal: {
      headerHeight: 50,
      keyboardHeight: 155,
    },
    controlPanelWidth: 97,
  },
};

export { scalesStylesConfig };
