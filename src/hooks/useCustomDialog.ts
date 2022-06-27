import { useAppDispatch } from "hooks/useRedux";
import { DialogTextContext, setHide, setMessage } from "redux/dialogSlice";
let resolveCallback: (x: unknown | boolean) => unknown | boolean;
const useCustomDialog = () => {
  const dispatch = useAppDispatch();

  const confirm = (textObj: DialogTextContext) => {
    dispatch(setMessage(textObj));
    return new Promise((res) => {
      resolveCallback = res;
    });
  };
  const closeConfirm = () => {
    dispatch(setHide());
  };

  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };
  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  return { confirm, onConfirm, onCancel };
};
export default useCustomDialog;
