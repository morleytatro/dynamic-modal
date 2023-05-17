import { createRoot, type Root } from 'react-dom/client';
import type { ReactNode } from 'react';

export function ModalContent({ children }: { children: ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

export function getModalMethods(rootSelector: string) {
  let modalRoot: Root | undefined;

  function open(children: ReactNode) {
    if(!modalRoot) {
      modalRoot = createRoot(document.querySelector(rootSelector) as HTMLElement);
    }

    modalRoot.render(<div className="bg-slate-600 flex justify-center items-center min-h-screen w-screen opacity-75" onClick={close}>
      <div role="dialog" className="w-1/2 m-auto max-h-50 rounded-md bg-white" onClick={e => e.stopPropagation()}>{children}</div>
    </div>);
  }

  function close() {
    modalRoot?.unmount();
    modalRoot = undefined;
  }

  function ModalHeader({ children }: { children: ReactNode }) {
    return (
      <header className="flex justify-between p-4 border-b border-b-slate-500">
        {children}
        <button onClick={close}>&times;</button>
      </header>
    );
  }

  return {
    getState: () => modalRoot ? 'open' : 'closed',
    open,
    close,
    ModalHeader,
  };
}

/**
 * this would happen in the consumer's app
 */
const { open, close, getState, ModalHeader } = getModalMethods('#modal-root');

export {
  open,
  close,
  getState,
  ModalHeader,
};
