import React, { FC } from 'react';
import { useStyles } from './about.styles';

export const About: FC = () => {
  const { root, content } = useStyles();

  // return <iframe src="/diagrams/app.html" title="app diagram" />;
  return (
    <div className={root}>
      <div className={content}>ABOUT YOU & WORLD</div>
    </div>
  );
};
