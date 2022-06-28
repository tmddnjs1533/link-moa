import React, { FC, useCallback, useState } from "react";
import {
  DialogInput,
  DialogLabel,
  InputBox,
  InputContainer,
} from "../../addMoA/style";
import { CircularProgress, FormHelperText, IconButton } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import axios from "axios";
import { useAppDispatch } from "hooks/useRedux";
import { setToastShow } from "redux/toastSlice";
import AutorenewIcon from "@mui/icons-material/Autorenew";
interface UrlTextFieldProps {
  setIsUrlTyped?: React.Dispatch<React.SetStateAction<boolean>>;
  setHasOpengraph: React.Dispatch<React.SetStateAction<boolean>>;
  defaultUrl?: string;
}
const URL = `https://link-moa-api.herokuapp.com`;
const UrlTextField: FC<UrlTextFieldProps> = ({
  setIsUrlTyped,
  setHasOpengraph,
  defaultUrl,
}) => {
  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [isApiLoading, setIsApiLoading] = useState(false); // 정보 가져오기 로딩중
  const [prevUrl, setPrevUrl] = useState(defaultUrl || ""); // 정보가져오기를 이미 진행한 url 문자열

  // hook
  const dispatch = useAppDispatch();

  // url 값 감시
  const inputUrl = watch("url");

  const getOpenGraph = useCallback(async () => {
    console.log("getOpenGraph 내부");
    setIsApiLoading(true);
    setPrevUrl(inputUrl);
    await axios
      .get(`${URL}/og?u=${encodeURIComponent(inputUrl)}`)
      .then((res) => {
        if (res.status === 200) return res.data;
      })
      .then((data) => {
        if (data.image) setValue("thumb", data.image);
        if (data.title) setValue("title", data.title);
        if (data.description) setValue("desc", data.description);
        if (data.image && data.title && data.description) {
          if (setIsUrlTyped) setIsUrlTyped(true);
        } else if (data.image || data.title || data.description) {
          if (setIsUrlTyped) setIsUrlTyped(true);
          // setHasOpengraph(true);
        } else {
          if (typeof data === "object") {
            setError("url", {
              type: "invalid-url",
              message: "유효하지 않은 URL입니다.",
            });
            if (setIsUrlTyped) setIsUrlTyped(false);
            setHasOpengraph(false);
          } else {
            // console.log("오류 url");
            setHasOpengraph(true);
            if (errors?.url) clearErrors();
          }
        }
      })
      .catch((err) => {
        console.dir(err);
        setError("url", {
          type: "pre-validate-url",
          message: "URL 검증을 진행해주세요.",
        });
        dispatch(
          setToastShow({
            message: "실패하였습니다.",
            status: "error",
          })
        );
      })
      .finally(() => {
        setIsApiLoading(false);
      });
  }, [
    setValue,
    inputUrl,
    setError,
    errors?.url,
    clearErrors,
    setIsUrlTyped,
    setHasOpengraph,
    dispatch,
  ]);

  const refetch = useCallback(() => {
    console.log("refetch");
    getOpenGraph();
  }, [getOpenGraph]);

  return (
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
              onChange={(e) => {
                onChange(e);
                if (
                  e.target.value.length > 8 &&
                  prevUrl !== e.target.value &&
                  !isApiLoading
                ) {
                  getOpenGraph();
                }
              }}
              startAdornment={
                errors?.url?.type === "pre-validate-url" && (
                  <IconButton onClick={refetch}>
                    <AutorenewIcon />
                  </IconButton>
                )
              }
              endAdornment={isApiLoading && <CircularProgress size={20} />}
            />
          )}
        />
      </InputBox>
      {errors?.url && <FormHelperText>{errors?.url?.message}</FormHelperText>}
    </InputContainer>
  );
};

export default UrlTextField;

/**
 * URL TextField 의 관심사
 * ㄱ. watch("url")
 * ㄴ. watch("url") 값이 변하면 api 요청
 * ㄷ. api 요청 결과에 따라 분기
 *   1) 모든 메타데이터가 다 날아옴 -> setValue()
 *   2) 메타데이터 일부만 날아옴 -> setValue()
 *   3) 읽어올 메타데이터가 없음 -> metadata 없음 알림
 *   4) 유효하지 않은 url -> 유효하지 않은 URL 알림
 *   5) 접속할 수 없는 url -> 유효하지 않은 URL 알림
 *   6) 통신 실패
 */
