import { createPortal } from "react-dom";
import { FC, useCallback } from "react";

//style
import { ItemPrices } from "Components/Item/style/Item.style";
import { SnackBarContainer } from "./style/SnackbarList.style";

//redux
import useAppSelector from "hooks/useAppSelector";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { removeSnackbarByID } from "redux/actions/actions-snackbar";

//components
import SnackBar from "./SnackBar/SnackBar.component";

const SnackBarList: FC<{}> = () => {
  const snackbarPortalElement = document.getElementById("snackbar-root");
  const { items } = useAppSelector((state) => state.snackbar);
  const dispatch: AppDispatch = useDispatch();

  const closeSnackbarHandler = useCallback(
    (id: string | number) => {
      dispatch(removeSnackbarByID(String(id)));
    },
    [dispatch]
  );

  if (snackbarPortalElement == null || !items || ItemPrices.length < 1)
    return <></>;
  return (
    <>
      {createPortal(
        <SnackBarContainer>
          {items.map((snackData, _) => (
            <SnackBar
              key={snackData!.id}
              id={snackData!.id}
              type={snackData.type}
              message={snackData.message}
              onSnackClose={closeSnackbarHandler}
            />
          ))}
        </SnackBarContainer>,
        snackbarPortalElement
      )}
    </>
  );
};

export default SnackBarList;
