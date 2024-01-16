import { TypedUseSelectorHook, useSelector } from 'react-redux';

// store type
import { RootState } from 'redux/store';


const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
