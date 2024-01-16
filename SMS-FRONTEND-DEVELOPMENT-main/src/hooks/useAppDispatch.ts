import { useDispatch } from "react-redux";

// store type
import { AppDispatch } from "redux/store";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
