/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { Container } from "@mui/material";
import { Title } from "@mui/icons-material";
import { appTitle, blurBg, titleContainer } from "./Css";
import Calender from "./Calender";

type ItemType = {
  title: string;
  memo: string;
  date: string;
};

function Memo(): any {
  const memo: string = window.localStorage.getItem("memo");

  const defaultItem: ItemType = {
    title: "",
    memo: "",
    date: "",
  };

  const [memoItems, setMemoItems] = React.useState(
    memo ? JSON.parse(memo) : []
  );
  const [open, setOpen] = React.useState(false);
  const [targetItem, setTargetItem] = React.useState(defaultIte);
  const [isNewModal, setIsNewModal] = React.useState(false);
  //   Calender
  const [targetdate, setTargetDate] = React.useState();

  const handleOpen = (item: any) => {
    setOpen(true);
    setTargetItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editContents = (targetItem: any) => {
    const newlists: any = memoItems.map((item: any) =>
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

  const deleItem = (targetItem: any) => {
    const newItems: any = memoItems.filter((item) => item.id !== targetItem.id);
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
      </div>
    </>
  );
}

export default Memo;
