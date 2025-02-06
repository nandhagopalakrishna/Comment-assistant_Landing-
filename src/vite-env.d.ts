/// <reference types="vite/client" />
/// <reference types="chrome"/>

interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: any) => void;
        }) => void;
        renderButton: (
          element: HTMLElement,
          options: {
            theme: string;
            size: string;
            type: string;
            shape: string;
            text: string;
            logo_alignment: string;
          }
        ) => void;
      };
    };
  };
  chrome?: {
    runtime?: {
      sendMessage: (extensionId: string, message: any) => Promise<any>;
    };
  };
}
