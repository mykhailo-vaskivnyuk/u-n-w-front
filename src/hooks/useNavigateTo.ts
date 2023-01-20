import { useContext } from 'react';
import { NavigateContext } from '@contexts/navigate/navigate';

export const useNavigateTo = () => useContext(NavigateContext);
