import * as PIXI from 'pixi.js'

export function enablePIXIDevtools(app: PIXI.Application) {
  (window as any).app = app;
  (window as any).PIXI = PIXI
  if ((window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__) {
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI })
  }
}

declare global {
  interface Window {
    __PIXI_INSPECTOR_GLOBAL_HOOK__: any;
  }
}
