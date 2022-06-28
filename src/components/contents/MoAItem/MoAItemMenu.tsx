import React, { FC, useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Box,
  DialogContent,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import useCustomDialog from "hooks/useCustomDialog";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "fb";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import {
  DialogAlert,
  DialogCloseIconButton,
  DialogContainer,
  DialogHead,
  DialogName,
  DialogSubmitActions,
  DialogSubmitButton,
} from "../../addMoA/style";
import { useForm, FormProvider } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToastShow } from "redux/toastSlice";
import { useAppDispatch } from "hooks/useRedux";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import Thumbnail from "components/common/moaForm/Thumbnail";
import GeneralTextField from "components/common/moaForm/GeneralTextField";
import GeneralTextArea from "components/common/moaForm/GeneralTextArea";
import UrlTextField from "components/common/moaForm/URLTextField";
interface MoAItemMenuProps {
  moa: MoA;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  menuOpen: boolean;
  anchorEl: null | HTMLElement;
}
const schema = yup.object({
  name: yup.string().required("필수 입력 영역입니다."),
  url: yup.string().required("필수 입력 영역입니다."),
  thumb: yup.string(),
  title: yup.string(),
  desc: yup.string(),
});

const MoAItemMenu: FC<MoAItemMenuProps> = ({
  moa,
  menuOpen,
  anchorEl,
  setAnchorEl,
}) => {
  // state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [thumb, setThumb] = useState<File>(); // 링크 이미지 수정용 파일
  const [hasOpengraph, setHasOpengraph] = useState(false); // 링크 메타데이터 없음

  // hook
  const queryClient = useQueryClient();
  const { confirm } = useCustomDialog();
  const dispatch = useAppDispatch();

  const handleDialogOpen = useCallback(() => {
    setAnchorEl(null);
    setDialogOpen(true);
  }, [setAnchorEl]);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    // setDialogOpen(false);
  }, [setAnchorEl]);

  const moaRef = doc(db, "moa", moa.id);

  const itemRemove = useCallback(async () => {
    await deleteDoc(doc(db, "moa", moa.id)).then(() => {
      setAnchorEl(null);
      return queryClient.invalidateQueries("moa");
    });
  }, [moa.id, queryClient, setAnchorEl]);

  const handleItemRemove = useCallback(async () => {
    const isConfirmed = await confirm({
      title: "링크 아이템 삭제",
      message: "이 링크를 삭제하시겠습니까?",
    });
    if (isConfirmed) {
      console.log("확인");
      return itemRemove();
    }
  }, [confirm, itemRemove]);
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: moa.name || "",
      url: moa.url || "",
      thumb: moa.thumb || "",
      title: moa.title || "",
      desc: moa.desc || "",
    },
  });
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isValid },
  } = methods;

  // dialog reset
  const dialogReset = useCallback(() => {
    setDialogOpen(false);
    reset();
  }, [reset]);

  // Dialog 닫기 = 리셋
  const handleDialogClose = useCallback(async () => {
    const values = getValues();
    if (
      moa.name === values.name &&
      moa.url === values.url &&
      moa.thumb === values.thumb &&
      moa.title === values.title &&
      moa.desc === values.desc &&
      !thumb
    ) {
      // 변화 없음.
      return dialogReset();
    } else {
      const isConfirmed = await confirm({
        title: "입력 취소",
        message: "작성중인 내용이 있습니다. 취소하시겠습니까?",
      });
      if (isConfirmed) {
        console.log("확인");
        return dialogReset();
      }
    }
  }, [
    confirm,
    dialogReset,
    getValues,
    moa.desc,
    moa.name,
    moa.thumb,
    moa.title,
    moa.url,
    thumb,
  ]);

  // 링크 업데이트
  const updateLink = (data: IFormInputs) => {
    return updateDoc(moaRef, { ...data })
      .then(() => {
        reset();
        setDialogOpen(false);
        dispatch(
          setToastShow({
            message: "성공적으로 수정되었습니다.",
            status: "success",
          })
        );
        return queryClient.invalidateQueries("moa");
      })
      .catch((err) => {
        console.dir(err);
        dispatch(setToastShow({ message: "실패하였습니다.", status: "error" }));
      });
  };
  // 제출
  const { mutateAsync } = useMutation(updateLink);
  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      if (thumb) {
        let newData = { ...data };
        const storageRef = ref(storage, "/link-thumb/" + data.name);

        await uploadBytes(storageRef, thumb).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          return getDownloadURL(snapshot.ref).then((url) => {
            setValue("thumb", url);
            newData.thumb = url;
          });
        });

        return mutateAsync(newData);
      }
      return mutateAsync(data);
    },
    [mutateAsync, setValue, thumb]
  );

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleDialogOpen}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>링크 수정</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleItemRemove}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>링크 삭제</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <DialogContainer onClose={handleDialogClose} open={dialogOpen}>
        <DialogHead>
          <DialogCloseIconButton aria-label="close" onClick={handleDialogClose}>
            <CloseIcon />
          </DialogCloseIconButton>
        </DialogHead>
        <FormProvider {...methods}>
          <DialogContent sx={{ marginTop: "16px", p: 0 }}>
            <DialogName>링크 수정</DialogName>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/*링크 별명*/}
              <GeneralTextField
                label={"링크 별명"}
                formName={"name"}
                id={"link-name"}
              />
              {/*  링크 URL*/}
              <UrlTextField
                setHasOpengraph={setHasOpengraph}
                defaultUrl={moa.url}
              />
              {hasOpengraph && (
                <DialogAlert severity="warning">
                  메타데이터가 존재하지 않는 페이지 입니다.
                </DialogAlert>
              )}
              <Thumbnail setThumb={setThumb} />
              {/*  링크 이미지*/}
              <GeneralTextField
                label={"링크 이미지"}
                formName={"thumb"}
                id={"link-thumb"}
              />
              {/*  링크 제목*/}
              <GeneralTextField
                label={"링크 제목"}
                formName={"title"}
                id={"link-title"}
              />
              {/*  링크 설명*/}
              <GeneralTextArea
                label={"링크 설명"}
                formName={"desc"}
                id={"link-desc"}
              />
            </Box>
          </DialogContent>
          <DialogSubmitActions>
            <DialogSubmitButton onClick={handleDialogClose}>
              수정 취소
            </DialogSubmitButton>
            <DialogSubmitButton
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              링크 수정
            </DialogSubmitButton>
          </DialogSubmitActions>
        </FormProvider>
      </DialogContainer>
    </>
  );
};

export default MoAItemMenu;
