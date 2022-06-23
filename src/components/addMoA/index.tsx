import React, { FC, useState, useCallback } from "react";
import {
  Box,
  Button,
  DialogContent,
  FormHelperText,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
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
} from "./style";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../fb";
import axios from "axios";

const schema = yup
  .object({
    name: yup.string().required("필수 입력 영역입니다."),
    url: yup.string().required("필수 입력 영역입니다."),
    thumb: yup.string(),
    title: yup.string(),
    desc: yup.string(),
  })
  .required();
const AddMoA: FC = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      url: "",
      thumb: "",
      title: "",
      desc: "",
    },
  });
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    reset();
    setOpen(false);
  }, [reset]);
  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      if (!data.thumb || !data.title || !data.desc) {
        return axios
          .get("http://localhost:8080/og?u=" + encodeURIComponent(data.url))
          .then((res) => {
            if (res.status === 200) return res.data;
          })
          .then((data) => {
            setValue("thumb", data.hybridGraph.image);
            setValue("title", data.hybridGraph.title);
            setValue("desc", data.hybridGraph.description);
          })
          .catch((err) => console.dir(err));
      } else {
        await addDoc(collection(db, "moa"), data);
        reset();
        setOpen(false);
      }
    },
    [reset, setValue]
  );
  return (
    <>
      <Button
        endIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="button">링크추가</Typography>
      </Button>
      <IconButton
        onClick={handleOpen}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <AddIcon />
      </IconButton>
      <DialogContainer onClose={handleClose} open={open}>
        <DialogHead>
          <DialogCloseIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </DialogCloseIconButton>
        </DialogHead>
        <DialogContent sx={{ marginTop: "16px" }}>
          <DialogName>링크 등록</DialogName>
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
                    />
                  )}
                />
              </InputBox>
              {errors.url && (
                <FormHelperText>{errors.url.message}</FormHelperText>
              )}
            </InputContainer>
            {/*  링크 대표이미지*/}
            <DialogThumbContainer>
              <DialogThumb>
                <img
                  src={watch("thumb")}
                  alt={watch("title")}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://via.placeholder.com/175x120";
                  }}
                />
              </DialogThumb>
              <DialogShadowIconButton>
                <EditIcon />
              </DialogShadowIconButton>
              <DialogShadowIconButton>
                <DeleteForeverIcon />
              </DialogShadowIconButton>
            </DialogThumbContainer>
            <InputContainer>
              <InputBox>
                <DialogLabel htmlFor="link-thumb">링크 대표이미지</DialogLabel>
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
          <DialogSubmitButton onClick={handleSubmit(onSubmit)} fullWidth>
            링크 등록
          </DialogSubmitButton>
        </DialogSubmitActions>
      </DialogContainer>
    </>
  );
};

export default AddMoA;
