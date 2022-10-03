import React, { FC, useEffect } from "react";
import { useMediaQuery } from "@styles/hooks/useMediaQuery";
import { useRipples } from "@hooks/useRipple";
import HomeIcon from "../../../public/icons/home.svg";
import { useStyles } from "./index.styles";

export const App: FC = () => {
  const { root, gallery } = useStyles();
  const [ripples, showRipple] = useRipples();
  const match = useMediaQuery('(min-width: 500px)') && 'match';

  useEffect(() => {
    // throw new Error('TEST ERROR');
  }, []);

  return (
    <div className={root} onClick={showRipple}>
      <HomeIcon width="50"/>
      <h1>YOU AND WORLD</h1>
      <h2>{match}</h2>
      {ripples}
      {/* <Carousel /> */}
      <div className={gallery}>

      </div>
    </div>
  );
};
