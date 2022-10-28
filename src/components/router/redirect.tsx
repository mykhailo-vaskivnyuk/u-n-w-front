import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from './constants';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  useEffect(() => navigate(RoutesMap.INDEX));
  return null;
};
