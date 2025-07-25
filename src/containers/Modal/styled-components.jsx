import styled from "styled-components";
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: auto; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  padding: 20px;
  // width: max-content;
  max-height: 80%;
    background-color: #00D180;

    label {
    font-weight: 100 !important;
    font-size: 1.2rem !important;
    color: #fff !important;
    }
`;

export const ModalHeader = styled.div`

`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding:0.5rem;
  
`;