import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  DialogShadowIconButton,
  DialogThumb,
  DialogThumbContainer,
  ShadowIconLabelButton,
} from "../../addMoA/style";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface ThumbnailProps {
  setThumb: React.Dispatch<React.SetStateAction<File | undefined>>;
}
const Thumbnail: FC<ThumbnailProps> = ({ setThumb }) => {
  const [imgSrc, setImgSrc] = useState("");

  const { watch, resetField } = useFormContext();
  // 이미지 onChange

  // 이미지 삭제
  const handleImageRemove = useCallback(() => {
    setThumb(undefined);
    setImgSrc("");
    if (watch("thumb")) resetField("thumb");
  }, [setThumb, resetField, watch]);
  return (
    <>
      <DialogThumbContainer>
        {/*  링크 대표이미지*/}
        <DialogThumb>
          <img
            src={imgSrc || watch("thumb")}
            alt={watch("title")}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://via.placeholder.com/175x120";
            }}
          />
        </DialogThumb>
        <ImageInput imgSrc={imgSrc} setThumb={setThumb} setImgSrc={setImgSrc} />
        {(watch("thumb") || imgSrc) && (
          <DialogShadowIconButton onClick={handleImageRemove}>
            <DeleteForeverIcon />
          </DialogShadowIconButton>
        )}
      </DialogThumbContainer>
    </>
  );
};

interface ImageInputProps {
  imgSrc: string;
  setThumb: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

const ImageInput: FC<ImageInputProps> = ({ imgSrc, setThumb, setImgSrc }) => {
  const { watch } = useFormContext();
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.currentTarget.files;

      if (!!fileList && fileList.length > 0) {
        setThumb(fileList[0]);
        const reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = () => {
          if (!!reader?.result && typeof reader?.result === "string") {
            // console.log("Dd");
            setImgSrc(reader.result);
          }
        };
      }
    },
    [setImgSrc, setThumb]
  );
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="file-thumb"
        onChange={handleFileChange}
        hidden
      />
      <ShadowIconLabelButton htmlFor="file-thumb">
        {watch("thumb") || imgSrc ? <EditIcon /> : <FileUploadIcon />}
      </ShadowIconLabelButton>
    </>
  );
};

export default Thumbnail;
/**
 * 이미지 등록,삭제,수정,미리보기를 컨테이너로 빼고 싶다
 *
 * 1. 필요한 기능
 *   ㄱ. useFormContext() 훅으로 제공된 watch("thumb") 값을 감시하여 이미지를 url 을 이용하여 로드하고 미리보기를 출력
 *   ㄴ. <input type="file" /> 로 제공된 File 객체를 DataURL 로 읽어들여서 미리보기 이미지 출력
 *   ㄷ. useFormContext() 훅으로 제공된 watch("thumb") 값을 지우(거나 다른 변수에 담)고 ㄴ.기능 실행
 *   ㄹ. ㄴ.기능 실행된 후 다른 파일로 같은 기능 실행
 *   ㅁ. ㄴ.기능 실행 후 파일 삭제
 * 2. 관심사
 *   ㄱ. URL 혹은 파일이 있을 때 이 파일을 변수에 담고, submit 에 데이터를 전달할 수 있음.
 *   ㄴ. 외부에는 File 객체를 주고 내부에서 src 쓰면됨.
 */
