import React, { FC, useMemo } from "react";
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
  formName: keyof IFormInputs;
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
  } = useFormContext<IFormInputs>();

  // const formError: FieldError | undefined = useMemo(() => {
  //   let error: FieldError;
  //   if (errors && errors[formName]) {
  //     error = errors[formName] as FieldError;
  //     return error;
  //   }
  // }, [errors, formName]);
  const formError = useMemo(
    () => errors && errors[formName],
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
