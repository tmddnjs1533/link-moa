import React, { FC, useState, useCallback } from "react";
import {
  DialogAlert,
  DialogName,
  DialogSubmitActions,
  DialogSubmitButton,
} from "./style";
import { Box, DialogContent } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../fb";
import CloseIcon from "@mui/icons-material/Close";
import { DialogCloseIconButton, DialogContainer, DialogHead } from "./style";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "hooks/useRedux";
import { setToastShow } from "redux/toastSlice";
import useCustomDialog from "hooks/useCustomDialog";
import Thumbnail from "components/common/moaForm/Thumbnail";
import GeneralTextField from "components/common/moaForm/GeneralTextField";
import GeneralTextArea from "components/common/moaForm/GeneralTextArea";
import UrlTextField from "components/common/moaForm/URLTextField";
const schema = yup.object({
  name: yup.string().required("필수 입력 영역입니다."),
  url: yup.string().required("필수 입력 영역입니다."),
  thumb: yup.string(),
  title: yup.string(),
  desc: yup.string(),
});
interface AddMoAFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMoAForm: FC<AddMoAFormProps> = ({ open, setOpen }) => {
  // state
  const [isUrlTyped, setIsUrlTyped] = useState(false); // url 입력하여 정보 가져오기 완료됨.
  const [thumb, setThumb] = useState<File>(); // 링크 이미지 수정용 파일
  const [hasOpengraph, setHasOpengraph] = useState(false); // 링크 메타데이터 없음

  // form hook
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      url: "",
      thumb: "",
      title: "",
      desc: "",
    },
  });
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isValid },
  } = methods;

  // react-query hook
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { confirm } = useCustomDialog();

  // 리셋
  const dialogReset = useCallback(() => {
    reset();
    setOpen(false);
    setIsUrlTyped(false);
  }, [reset, setOpen]);

  // Dialog 닫기
  const handleClose = useCallback(async () => {
    const value = getValues();
    if (
      value.name ||
      value.url ||
      value.title ||
      value.thumb ||
      value.desc ||
      thumb
    ) {
      const isConfirmed = await confirm({
        title: "링크 등록 취소",
        message: "작성중인 내용이 초기화 됩니다.",
      });
      if (isConfirmed) {
        console.log("확인");
        return dialogReset();
      }
    } else {
      return dialogReset();
    }
  }, [confirm, dialogReset, getValues, thumb]);

  // 링크 추가
  const addLink = (data: IFormInputs) => {
    return addDoc(collection(db, "moa"), data)
      .then(() => {
        reset();
        setOpen(false);
        dispatch(
          setToastShow({
            message: "성공적으로 추가되었습니다.",
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
  const { mutateAsync } = useMutation(addLink);

  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      // 제출시 이미지 파일 존재하면 이미지 파일 올림
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
      <DialogContainer onClose={handleClose} open={open}>
        <DialogHead>
          <DialogCloseIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </DialogCloseIconButton>
        </DialogHead>
        <FormProvider {...methods}>
          <DialogContent sx={{ marginTop: "16px", p: 0 }}>
            <DialogName>링크 등록</DialogName>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/*링크 별명*/}
              <GeneralTextField
                label={"링크 별명"}
                formName={"name"}
                id={"link-name"}
              />
              {/*  링크 URL*/}
              <UrlTextField
                setIsUrlTyped={setIsUrlTyped}
                setHasOpengraph={setHasOpengraph}
              />
              {hasOpengraph && (
                <DialogAlert severity="warning">
                  메타데이터가 존재하지 않는 페이지 입니다.
                </DialogAlert>
              )}
              {isUrlTyped && (
                <>
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
                </>
              )}
            </Box>
          </DialogContent>
          <DialogSubmitActions>
            <DialogSubmitButton
              onClick={handleSubmit(onSubmit)}
              fullWidth
              disabled={!isValid}
            >
              링크 등록
            </DialogSubmitButton>
          </DialogSubmitActions>
        </FormProvider>
      </DialogContainer>
    </>
  );
};

export default AddMoAForm;
