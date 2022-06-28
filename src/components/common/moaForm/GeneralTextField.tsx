import React, { FC, useMemo } from "react";
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
  formName: keyof IFormInputs;
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
  const formError: FieldError | undefined = useMemo(() => {
    let error: FieldError;
    if (errors && errors[formName]) {
      error = errors[formName] as FieldError;
      return error;
    }
  }, [errors, formName]);
  const isError = useMemo(() => Boolean(formError), [formError]);
  return (
    <InputContainer error={isError}>
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
      {isError && <FormHelperText>{formError?.message}</FormHelperText>}
    </InputContainer>
  );
};

export default GeneralTextField;
