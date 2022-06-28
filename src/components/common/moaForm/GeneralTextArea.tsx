import React, { FC, useMemo } from "react";
import {
  DialogLabel,
  DialogTextArea,
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

const GeneralTextArea: FC<GeneralTextFieldProps> = ({
  label,
  formName,
  id,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const formError: FieldError | undefined = useMemo(
    () => errors[formName],
    [errors, formName]
  );
  const isError = useMemo(() => Boolean(formError), [formError]);
  return (
    <InputContainer error={isError}>
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
      {isError && <FormHelperText>{formError?.message}</FormHelperText>}
    </InputContainer>
  );
};

export default GeneralTextArea;
