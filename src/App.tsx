import { ModalContent, ModalHeader, open } from './components/Modal'

export function App() {
  function handleClick() {
    open(
      <>
        <ModalHeader>Dynamic Modal</ModalHeader>
        <ModalContent>
          <p>Created on the fly!</p>
        </ModalContent>
      </>
    );
  }

  return (
    <div>
      <button className="bg-purple-500 p-4 rounded-md text-white" onClick={handleClick}>Launch Modal</button>
    </div>
  );
}
