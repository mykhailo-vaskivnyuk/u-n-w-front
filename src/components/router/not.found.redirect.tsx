import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '../../constants/router.constants';

export const NotFoundRedirect: FC = () => {
  const navigate = useNavigate();
  useEffect(() => navigate(RoutesMap.INDEX));
  return null;
};
