/// <reference types="vite/client" />

interface Ethereum {
    request(args: { method: string; params?: any[] }): Promise<any>;
    on?: (eventName: string, handler: (...args: any[]) => void) => void;
  }
  
  declare global {
    interface Window {
      ethereum?: Ethereum;
    }
  }
  
  // This is required for TypeScript to recognize the above global declarations
  export {};