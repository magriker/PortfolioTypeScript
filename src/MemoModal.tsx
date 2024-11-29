/** @jsxImportSource @emotion/react */

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  buttonBox,
  errorStyle,
  formButton,
  formConatainer,
  modalBox,
  modalForm,
  textfield,
} from "./Css";
import { v4 as uuid } from "uuid";
import { Box, Button, Modal, TextField } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Memo } from "./Memo";

type Prop = {
  open: boolean;
  handleClose: () => void;
  editContents: (targetItem: object) => void;
  isNewModal: boolean;
  memoItems: Memo[];
  setMemoItems: (memoItems: Memo[]) => void;
  targetItem: Memo;
  setTargetItem: (targetItem: Memo) => void;
  targetDate: string;
  deleItem: (targetItem: Memo) => void;
};

type CreatNewItemProp = Omit<Prop, "open">;

const MemoModal = ({
  open,
  handleClose,
  editContents,
  isNewModal,
  memoItems,
  setMemoItems,
  targetItem,
  setTargetItem,
  targetDate,
  deleItem,
}: Prop) => {
  const schema = yup.object().shape({
    title: yup.string().required("タイトルが必要です"),
    memo: yup.string(),
  });

  const useFormmethod = useForm({
    defaultValuse: {
      ...targetItem,
    },
    resolver: yupResolver(schema),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box css={modalBox}>
        <FormProvider {...useFormmethod}>
          <form action="" css={modalForm}>
            <CreatNewitem
              targetDate={targetDate}
              handleClose={handleClose}
              setMemoItems={setMemoItems}
              memoItems={memoItems}
              editContents={editContents}
              targetItem={targetItem}
              setTargetItem={setTargetItem}
              isNewModal={isNewModal}
              deleItem={deleItem}
            ></CreatNewitem>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

const CreatNewitem = ({
  handleClose,
  setMemoItems,
  memoItems,
  editContents,
  targetItem,
  setTargetItem,
  isNewModal,
  targetDate,
  deleItem,
}: CreatNewItemProp) => {
  const {
    register,
    handleSubmit,
    reset,
    // control,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data: Memo) => {
    const result: Memo = { ...data, date: targetDate, id: uuid() };
    setMemoItems([...memoItems, result]);
    window.localStorage.setItem("memo", JSON.stringify([...memoItems, result]));
    console.log("out", data);
    handleClose();
    reset();
  };

  return (
    <div css={formConatainer}>
      {isNewModal ? (
        <>
          <p>日付：{targetDate}</p>
          <p css={errorStyle}>{errors.title?.message}</p>
          <TextField
            id="outlined-basic"
            fullWidth
            name="title"
            label="タイトル"
            variant="outlined"
            css={textfield}
            {...register("title")}
          />
          <TextField
            id="outlined-multiline-static"
            label="メモ"
            name="memo"
            multiline
            fullWidth
            rows={8}
            css={textfield}
            {...register("memo")}
          />
          <Button
            variant="outlined"
            type="submit"
            css={formButton}
            onClick={handleSubmit((data) => onSubmit(data as Memo))}
          >
            保存
          </Button>
        </>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            fullWidth
            label="タイトル"
            variant="outlined"
            value={targetItem.title}
            onChange={(e) =>
              setTargetItem({ ...targetItem, title: e.target.value })
            }
            css={textfield}
          />

          <TextField
            id="outlined-multiline-static"
            label="メモ"
            multiline
            fullWidth
            rows={8}
            value={targetItem.memo}
            onChange={(e) =>
              setTargetItem({ ...targetItem, memo: e.target.value })
            }
            css={textfield}
          />
          <div css={buttonBox}>
            <Button
              variant="outlined"
              css={formButton}
              onClick={() => deleItem(targetItem)}
            >
              <DeleteIcon />
              削除
            </Button>
            <Button
              variant="contained"
              onClick={() => editContents(targetItem)}
              css={formButton}
            >
              変更
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MemoModal;
