/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Container } from "@mui/material";
import { appTitle, blurBg, titleContainer } from "./Css";
import Calender from "./Calender";
import MemoModal from "./MemoModal";

export type Memo = {
  id?: string;
  title: string;
  memo: string;
  date: string;
};

function Memo() {
  const memo: string = window.localStorage.getItem("memo") ?? "";

  const defaultItem: Memo = {
    title: "",
    memo: "",
    date: "",
  };

  const [memoItems, setMemoItems] = React.useState(
    memo ? (JSON.parse(memo) as Memo[]) : []
  );
  const [open, setOpen] = React.useState(false);
  const [targetItem, setTargetItem] = React.useState(defaultItem);
  const [isNewModal, setIsNewModal] = React.useState(false);
  //   Calender
  const [targetDate, setTargetDate] = React.useState();

  const handleOpen = (item: Memo) => {
    setOpen(true);
    setTargetItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editContents = (targetItem: Memo) => {
    const newlists: Memo[] = memoItems.map((item: Memo) =>
      item.id === targetItem.id
        ? { ...item, title: targetItem.title, memo: targetItem.memo }
        : item
    );
    setMemoItems([...newlists]);
    handleClose();
  };

  const handleCreatButtonClick = () => {
    setTargetItem(defaultItem);
    setIsNewModal(true);
    setOpen(true);
  };

  const deleItem = (targetItem: Memo) => {
    const newItems: Memo[] = memoItems.filter(
      (item) => item.id !== targetItem.id
    );
    setMemoItems(newItems);
    window.localStorage.setItem("memo", JSON.stringify([...newItems]));
    handleClose();
  };

  return (
    <>
      <div css={open ? blurBg : ""}>
        <Container css={titleContainer}>
          <h1 css={appTitle}>Memo App</h1>
        </Container>
        <Container>
          <Calender
            memoItems={memoItems}
            handleCreatButtonClick={handleCreatButtonClick}
            setTargetDate={setTargetDate}
            handleOpen={handleOpen}
          ></Calender>
        </Container>
        <MemoModal
          open={open}
          handleClose={handleClose}
          editContents={editContents}
          isNewModal={isNewModal}
          memoItems={memoItems}
          setMemoItems={setMemoItems}
          targetItem={targetItem}
          setTargetItem={setTargetItem}
          targetDate={targetDate}
          deleItem={deleItem}
        ></MemoModal>
      </div>
    </>
  );
}

export default Memo;
