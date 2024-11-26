import { css } from "@emotion/react";

// ///////////////Memo css//////////////////////////////////

export const titleContainer = css`
  margin: 3rem auto;
`;

export const textfield = css`
  margin: 1rem 0;
`;

export const titleButton = css`
  width: 7rem;
  height: 3rem;
  margin-right: 0.5rem;
`;

export const appTitle = css`
  font-size: 4rem;
`;

export const formButton = css`
  width: 10rem;
  align-self: flex-end;
`;

export const formConatainer = css`
  display: flex;
  flex-direction: column;
`;

export const errorStyle = css`
  color: red;
`;

/////////////////////////ListBox css////////////////////////////////

export const listContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 5px;
  transition: all 0.2s;

  &:hover {
    border: 1px solid rgb(63, 164, 252);
    box-shadow: 0 0 5px rgb(63, 164, 252);

    cursor: pointer;
  }
`;

export const listButton = css`
  margin-right: 0;
`;

////////////////////////MemoMOdal///////////////////////////////////
export const modalBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: rgb(226, 226, 226);
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 24;
  padding: 3rem;
`;

export const modalForm = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const blurBg = css`
  filter: blur(5px);
`;

export const buttonBox = css`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;
