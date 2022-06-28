import React, { FC } from "react";
import {
  DialogInput,
  DialogLabel,
  InputBox,
  InputContainer,
} from "../../addMoA/style";
import { FormHelperText } from "@mui/material";
import { useFormContext, Controller, FieldError } from "react-hook-form";

interface GeneralTextFieldProps {
  label: string;
  formName: string;
  id?: string;
}

const GeneralTextField: FC<GeneralTextFieldProps> = ({
  label,
  formName,
  id,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const formError: FieldError = errors && errors[formName];
  return (
    <InputContainer error={Boolean(formError)}>
      <InputBox>
        <DialogLabel required htmlFor="link-name">
          {label} {/*링크 별명*/}
        </DialogLabel>
        <Controller
          control={control}
          name={formName}
          render={({ field: { value, onChange } }) => (
            <DialogInput
              id={id}
              aria-label={label}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </InputBox>
      {formError && <FormHelperText>{formError.message}</FormHelperText>}
    </InputContainer>
  );
};

export default GeneralTextField;
