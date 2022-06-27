import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Box,
  CircularProgress,
  DialogContent,
  FormHelperText,
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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  DialogAlert,
  DialogCloseIconButton,
  DialogContainer,
  DialogHead,
  DialogInput,
  DialogLabel,
  DialogName,
  DialogShadowIconButton,
  DialogSubmitActions,
  DialogSubmitButton,
  DialogTextArea,
  DialogThumb,
  DialogThumbContainer,
  InputBox,
  InputContainer,
  ShadowIconLabelButton,
} from "../../addMoA/style";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToastShow } from "redux/toastSlice";
import { useAppDispatch } from "hooks/useRedux";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false); // 정보 가져오기 로딩중
  const [prevUrl, setPrevUrl] = useState(moa.url); // 정보가져오기를 이미 진행한 url 문자열
  const [thumb, setThumb] = useState<File>(); // 링크 이미지 수정용 파일
  const [thumbSrc, setThumbSrc] = useState(""); // 링크 이미지 수정 시 파일 미리보기
  const [shouldCustom, setShouldCustom] = useState(false); // 링크 메타데이터 부족으로 커스텀 필요

  // react-query hook
  const queryClient = useQueryClient();
  const { confirm } = useCustomDialog();

  const handleDialogOpen = useCallback(() => {
    setAnchorEl(null);
    setDialogOpen(true);
  }, [setAnchorEl]);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    // setDialogOpen(false);
  }, [setAnchorEl]);

  const moaRef = doc(db, "moa", moa.id);

  let itemRemove: () => Promise<void>;
  itemRemove = useCallback(async () => {
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
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = methods;

  // url 값 감시
  const inputUrl = watch("url");

  const dispatch = useAppDispatch();

  // dialog reset
  const dialogReset = useCallback(() => {
    setDialogOpen(false);
    reset();
    setDialogOpen(false);
    setPrevUrl(moa.url);
    setThumbSrc("");
    setShouldCustom(false);
  }, [moa.url, reset]);

  // Dialog 닫기 = 리셋
  const handleDialogClose = useCallback(async () => {
    const values = getValues();
    if (
      moa.name === values.name &&
      moa.url === values.url &&
      moa.thumb === values.thumb &&
      moa.title === values.title &&
      moa.desc === values.desc &&
      thumbSrc === ""
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
    thumbSrc,
  ]);

  // 이미지 onChange
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.currentTarget.files;

      console.log("df");
      if (!!fileList && fileList.length > 0) {
        setThumb(fileList[0]);
        const reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = () => {
          if (!!reader?.result && typeof reader?.result === "string") {
            // console.log("Dd");
            setThumbSrc(reader.result);
          }
        };
      }
    },
    [setThumb, setThumbSrc]
  );

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

  // url 값 감시하여 값 변경 될 때마다 api 호출
  useEffect(() => {
    if (
      inputUrl &&
      inputUrl.length > 8 &&
      prevUrl !== inputUrl &&
      !isApiLoading
    ) {
      setIsApiLoading(true);
      setPrevUrl(inputUrl);
      axios
        .get(
          "https://link-moa-api.herokuapp.com/og?u=" +
            encodeURIComponent(inputUrl)
        )
        .then((res) => {
          if (res.status === 200) return res.data;
        })
        .then((data) => {
          if (data.image) setValue("thumb", data.image);
          if (data.title) setValue("title", data.title);
          if (data.description) setValue("desc", data.description);
          if (data.image || data.title || data.description) {
            setShouldCustom(true);
          } else {
            if (typeof data === "object") {
              setError("url", {
                type: "invalid-url",
                message: "유효하지 않은 URL입니다.",
              });
              setShouldCustom(false);
            } else {
              // console.log("오류 url");
              setShouldCustom(true);
              if (errors.url) clearErrors();
            }
          }
        })
        .catch((err) => {
          console.dir(err);
        })
        .finally(() => {
          setIsApiLoading(false);
        });
    }
  }, [
    isApiLoading,
    setValue,
    inputUrl,
    prevUrl,
    setError,
    errors.url,
    clearErrors,
  ]);
  // console.log("errors", errors);
  // console.log("isValid", isValid);
  // 제출
  const { mutateAsync } = useMutation(updateLink);
  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      if (thumbSrc && thumb) {
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
    [mutateAsync, setValue, thumb, thumbSrc]
  );

  // 이미지 삭제
  const handleImageRemove = useCallback(() => {
    setThumb(undefined);
    setThumbSrc("");
    if (watch("thumb")) setValue("thumb", "");
  }, [setValue, watch]);

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
              <InputContainer error={Boolean(errors?.name)}>
                <InputBox>
                  <DialogLabel required htmlFor="link-name">
                    링크 별명
                  </DialogLabel>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { value, onChange } }) => (
                      <DialogInput
                        id="link-name"
                        aria-label="링크 별명"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </InputBox>
                {errors.name && (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                )}
              </InputContainer>
              {/*  링크 URL*/}
              <InputContainer error={Boolean(errors?.url)}>
                <InputBox>
                  <DialogLabel required htmlFor="link-url">
                    링크 URL
                  </DialogLabel>
                  <Controller
                    control={control}
                    name="url"
                    render={({ field: { value, onChange } }) => (
                      <DialogInput
                        id="link-url"
                        aria-label="링크 URL"
                        value={value}
                        onChange={onChange}
                        endAdornment={
                          isApiLoading && <CircularProgress size={20} />
                        }
                      />
                    )}
                  />
                </InputBox>
                {errors.url && (
                  <FormHelperText>{errors.url.message}</FormHelperText>
                )}
              </InputContainer>
              {shouldCustom && (
                <DialogAlert severity="warning">
                  메타데이터가 존재하지 않는 페이지 입니다.
                </DialogAlert>
              )}

              <DialogThumbContainer>
                {/*  링크 대표이미지*/}
                <DialogThumb>
                  <img
                    src={thumbSrc || watch("thumb")}
                    alt={watch("title")}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "https://via.placeholder.com/175x120";
                    }}
                  />
                </DialogThumb>
                <input
                  type="file"
                  id="file-thumb"
                  onChange={handleFileChange}
                  hidden
                />
                {watch("thumb") || thumb ? (
                  <>
                    <ShadowIconLabelButton htmlFor="file-thumb">
                      <EditIcon />
                    </ShadowIconLabelButton>
                    <DialogShadowIconButton onClick={handleImageRemove}>
                      <DeleteForeverIcon />
                    </DialogShadowIconButton>
                  </>
                ) : (
                  <>
                    <ShadowIconLabelButton htmlFor="file-thumb">
                      <FileUploadIcon />
                    </ShadowIconLabelButton>
                  </>
                )}
              </DialogThumbContainer>
              <InputContainer>
                <InputBox>
                  <DialogLabel htmlFor="link-thumb">
                    링크 대표이미지
                  </DialogLabel>
                  <Controller
                    control={control}
                    name="thumb"
                    render={({ field: { value, onChange } }) => (
                      <DialogInput
                        id="link-thumb"
                        aria-label="링크 대표이미지"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </InputBox>
              </InputContainer>
              {/*  링크 제목*/}
              <InputContainer>
                <InputBox>
                  <DialogLabel htmlFor="link-title">링크 제목</DialogLabel>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { value, onChange } }) => (
                      <DialogInput
                        id="link-title"
                        aria-label="링크 제목"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </InputBox>
              </InputContainer>
              {/*  링크 설명*/}
              <InputContainer>
                <InputBox className="textarea">
                  <DialogLabel htmlFor="link-desc">링크 설명</DialogLabel>
                  <Controller
                    control={control}
                    name="desc"
                    render={({ field: { value, onChange } }) => (
                      <DialogTextArea
                        id="link-desc"
                        aria-label="링크 설명"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </InputBox>
              </InputContainer>
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
