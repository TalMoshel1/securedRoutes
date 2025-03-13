import styled from "styled-components";

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0.5rem;
`;

export const HourContainer = styled.div`
  display: flex;
  direction: rtl;
  align-items: center;
  color: black;
  padding-top: 2rem;
  padding-bottom: 1em;
  width: 100%;
  position: relative;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.eventBackgroundColor};
  margin-bottom:1rem;

  @media (orientation: portrait) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  @media (orientation: landscape) {
    border-radius: 8px;
  }
`;

export const Hour = styled.div`
  font-size: 1.2rem;
  width: min-content;
  direction: ltr;
`;

export const HourEventContainer = styled.div``;

export const HourEvent = styled.div`
  h2,
  h3 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  @media (orientation: portrait) { 
  h3 { 
  font-size: 0.7rem;
  }
  }
`;

export const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0.5rem;
`;