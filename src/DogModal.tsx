import { EnhancedDog } from "./services/getDogs";

interface ModalProps {
  info: EnhancedDog;
  handleClose: () => void;
}
export const DogModal = (props: ModalProps) => {
  const { info, handleClose } = props;
  return (
    <div className="modal flex justify-center items-center">
      <div className="modal-inner">
        <div className="flex justify-between items-center modal-header">
          <h2 className="modal-title">{info.breed}</h2>
          <button onClick={() => handleClose()}>
            <span className="sr-only">Close modal</span>
            <svg
              aria-hidden
              height="40"
              viewBox="0 0 512 512"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z" />
            </svg>
          </button>
        </div>

        <img className="modal-image" src={info.img} alt={info.breed} />
      </div>
    </div>
  );
};
