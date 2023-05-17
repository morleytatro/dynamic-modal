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

  function showModal(children: ReactNode) {
    if(!modalRoot) {
      modalRoot = createRoot(document.querySelector(rootSelector) as HTMLElement);
    }

    modalRoot.render(<div className="bg-slate-600 flex justify-center items-center min-h-screen w-screen opacity-75" onClick={hideModal}>
      <div role="dialog" className="w-1/2 m-auto max-h-50 rounded-md bg-white" onClick={e => e.stopPropagation()}>{children}</div>
    </div>);
  }

  function hideModal() {
    modalRoot?.unmount();
    modalRoot = undefined;
  }

  function ModalHeader({ children }: { children: ReactNode }) {
    return (
      <header className="flex justify-between p-4 border-b border-b-slate-500">
        {children}
        <button onClick={hideModal}>&times;</button>
      </header>
    );
  }

  return {
    isOpen: () => !!modalRoot,
    showModal,
    hideModal,
    ModalHeader,
  };
}

/**
 * this would happen in the consumer's app
 */
const { showModal, hideModal, isOpen, ModalHeader } = getModalMethods('#modal-root');

export {
  showModal,
  hideModal,
  isOpen,
  ModalHeader,
};
