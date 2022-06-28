import React, { FC } from "react";
import {
  DialogLabel,
  DialogTextArea,
  InputBox,
  InputContainer,
} from "../../addMoA/style";
import { FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface GeneralTextFieldProps {
  label: string;
  formName: string;
  id?: string;
}

const GeneralTextArea: FC<GeneralTextFieldProps> = ({
  label,
  formName,
  id,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <InputContainer error={Boolean(errors[formName])}>
      <InputBox className="textarea">
        <DialogLabel required htmlFor="link-name">
          {label} {/*링크 별명*/}
        </DialogLabel>
        <Controller
          control={control}
          name={formName}
          render={({ field: { value, onChange } }) => (
            <DialogTextArea
              id={id}
              aria-label={label}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </InputBox>
      {errors[formName] && (
        <FormHelperText>{errors[formName]?.message}</FormHelperText>
      )}
    </InputContainer>
  );
};

export default GeneralTextArea;
