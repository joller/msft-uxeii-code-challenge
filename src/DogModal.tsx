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
          <button className="button" onClick={() => handleClose()}>
            Close
          </button>
        </div>

        <img className="modal-image" src={info.img} alt={info.breed} />
      </div>
    </div>
  );
};
