import { FC, useEffect } from 'react';
import { useNavigateTo } from 'contexts/navigate/navigate';

export const NotFoundRedirect: FC = () => {
  const navigate = useNavigateTo();
  useEffect(() => navigate.toIndex(), [navigate]);
  return null;
};
