import styled, { keyframes, css } from "styled-components";

const StyledSelectContainer = styled.div`

  &.no-border-on-focus:focus {
    border: none; 
    outliner: none;
  }
  visibility: visible !important;
  // color: black !important;
  position: relative;

  .custom-select {
    font-size: 1rem;

    @supports (-webkit-touch-callout: none) {
      label {
        font-size: 1.1rem;
        font-weight: 400;
      }
    }

    @supports not (-webkit-touch-callout: none) {
      label {
        font-size: 1rem;
      }
    }
  }

  .options-container {
    color: grey;
    background-color: #e6e5eb;
    position: absolute;
    top: 2.85rem;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 20px;
    z-index: 1000;
    display: none;
  }

    .options-container.show {
    position: fixed !important;
    width:46%;
    top: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    display: block;
    overflow: scroll;
    scrollbar-width: none; 
    overflow: auto;

  }


  .options-container::-webkit-scrollbar {
    overflow: hidden;
  }

  .options-container {
    scrollbar-width: none; 

  }

  .options-container::-ms-scrollbar {
  display: none; 
}



  .option {
    background-color: #e6e5eb;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    color: black !important;
    border-radius:20px;

       &:hover {
    background-color: #A0A0A0;
    }

      &:focus { 
    // border: 2px solid black;
    // outline: none;
    outline: solid;
  }
  }


}

`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;
  overflow: hidden;
  .scroll {
    overflow-y: hidden;
  }

  &:focus{
    border: 2px solid black;
    outline: none;
  }

  .date-picker-container {
    direction: rtl;
    width: 100%;
    font-size: 1rem;
    flex-grow: 1;
    height: 2.35rem;
    border-radius: 20px;
    cursor: pointer;
    text-align: right;
    vertical-align: baseline;
    overflow:hidden;
    
  }

  .date-picker-container:focus {
    border: 2px solid black;
    outline: none;

  }
  .MuiInputBase-root,
  .MuiButtonBase-root {
    border: none !important;
  }


  .date-picker-container > * {
    height: 100%;
    color: black;
    width: 100%;
  }

  .MuiFormControl-root {
    -webkit-flex-direction: none;
    width: 100%;
  }

  .MuiInputAdornment-root {
  position: relative;
  margin-left: 0rem;
  padding-left: 0rem
  }

  .MuiInputBase-input {
    position:'absolute',
    left: '0%',
    top: '50%',
    transform: 'translate(0, -50%)',
    width: '100%'
  }



  input:focus, label:focus {
    border: 2px solid black;
    outline: none;
  }
`;

const RequestForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
  gap: 0.5rem;
  direction: rtl;
  left: 50%;
  width: max-content;
  transform: translate(-50%);
  font-size: 1rem;
  text-align: center;
  position: relative;
  color: black;
  font-family: "Roboto", sans-serif;

  textarea {
    resize: none;
    -webkit-resize: none; /* For Safari and older Chrome */
    -moz-resize: none; /* For older Firefox */
    -ms-resize: none; /* For older IE */
  }

  textarea,
  input,
  select {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    box-sizing: border-box;
    border: none;
    color: black !important;
    cursor: pointer;
    border-radius: 20px;
    font-size: 1rem;
    height: 2.35rem;

    &::placeholder {
      color: grey;
      opacity: 1;
    }
  }

  textarea,
  input:not([type="checkbox"]),
  select:not([name="repeatMonth"]) {
    background-color: #e6e5eb;
    width: 100%;
    font-size: 1rem !important;
  }

  select([name="repeatMonth"]) {
    background-color: ${(props) => (props.checked ? "#e6e5eb !important" : "")};
  }

  .custom-select {
    cursor: pointer;
    background-color: #e6e5eb !important;
    border-radius: 20px;
    // min-width: 2.35rem;
    &:focus {
      border: 2px solid black;
      outline:none;
      }
  }

  label:not([name="months"]) {
    display: none;
  }

  button {
    padding: 1rem;
    font-size: 1rem !important;
    // border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    background-color: #f0f0f0 !important;
    color: black !important;
  }

  .line3 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 90%;
  }

  .line3 div {
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  position: relative;
  appearance: none;
  width: 11rem;
  text-align: center;
  height: 2.35rem;
  align-content: baseline;
  margin: 0;
  border-radius: 4px;
  background-color: ${(props) =>
    props.checked ? "#ccc" : props.repeatsWeekly ? "#ccc" : "#fff"};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border: 1px solid black;
  }

  &:checked {
    background-color: #e6e5eb;
  }

  &::before {
    content: "אימון חוזר";
    color: grey;
    display: block;
    width: max-content;
    text-align: center;
    align-content: baseline;
    font-zide: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export {
  StyledCheckbox,
  Main,
  RequestForm,
  FormItemContainer,
  StyledSelectContainer,
};
