

import "./SubmittedModal.css"
import { useModal } from "../../../context/Modal"


function SubmittedModal(){
  const { closeModal } = useModal();
    return (
        <>
            <h1>hello</h1>
            <button onClick={closeModal}> Thank You </button>
        </>
    )
}

export default SubmittedModal;
