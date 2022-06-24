import React, { FC } from "react";
import { createContext } from "react";

export const EditModeContext = createContext<
  [boolean, { toggleEditMode: () => void }]
>([
  false,
  {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleEditMode: () => {},
  },
]);

const MobilEditMode: FC<DefaultProps> = ({ children }) => {
  const [mode, setMode] = React.useState(false);
  const editMode = React.useMemo(
    () => ({
      toggleEditMode: () => {
        setMode((prevMode) => !prevMode);
      },
    }),
    [setMode]
  );
  return (
    <EditModeContext.Provider value={[mode, editMode]}>
      {children}
    </EditModeContext.Provider>
  );
};

export default MobilEditMode;
