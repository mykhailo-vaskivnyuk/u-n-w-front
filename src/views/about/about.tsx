import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './about.styles';

export const About: FC = () => {
  const { root, button } = useStyles();

  return (
    <FormContainer title="ПРО YOU & WORLD">
      <div className={root}>
        <p>
          Даний інструмент допомагає людині реалізувати своє творче бажання та досягти поставлену
          мету.
        </p>
        <p>Користувач даного інструменту отримує можливість:</p>
        <ul>
          <li>знаходити бажаючих та ресурси для реалізації своєї ініціативи,</li>
          <li>бути запрошеним до участі в реалізації запропонованої ініціативи.</li>
        </ul>
        <p>
          Фундаментом інструменту є структура комунікативних зв’язків учасників спільноти
          (об’єднання, колективу, організації). Перший учасник створює спільноту. Описує її мету.
          Запрошує бажаючих до участі. Нові учасники запрошують наступних. Спільнота здійснює
          діяльність на досягнення вказаної мети.
        </p>
        <p>
          Структурована комунікація з набором правил для її реорганізації та оптимальне розподілення
          інформаційних потоків забезпечує прийняття ефективних рішень задля реалізації мети.
        </p>
        <Button
          btnType="primary"
          href="https://github.com/mykhailo-vaskivnyuk/u-n-w-back/blob/main/README.md"
          className={button}
        >
          Довідка
        </Button>
      </div>
    </FormContainer>
  );
};
