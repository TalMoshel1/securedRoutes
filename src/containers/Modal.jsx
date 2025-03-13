import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleSetGroupModal,
  toggleSetPrivateModal,
  toggleSetDeleteLessonModal
} from "../redux/calendarSlice.js";
import CloseIcon from '@mui/icons-material/Close';
import {ModalContainer, ModalHeader, CloseButton} from './Modal/styled-components.jsx'



const Modal = ({ children, type, closeModal}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (type === "group") {
      dispatch(toggleSetGroupModal());
    } else if (type === "private") {
      dispatch(toggleSetPrivateModal());
    } else {
      dispatch(toggleSetDeleteLessonModal());
    }
  };


  return (
    
    <ModalContainer className="modal">
      <ModalHeader>
        <CloseButton 
        onClick={closeModal || handleClose}
        ><CloseIcon style={{fill: 'black'}}/></CloseButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};

export default Modal;
