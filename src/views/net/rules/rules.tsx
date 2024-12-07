import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { useStyles } from './rules.styles';

export const NetRules: FC = () => {
  const { root } = useStyles();
  return (
    <FormContainer title="Правила спільноти">
      <div className={root}>
        <ul>
          <li>Власник приєднується за запрошенням іншого власника</li>
          <li>Власник від{`'`}єднується за бажанням або за рішенням більшості учасників кола</li>
          <li>
            Після від{`'`}єднання вибувший нічого не винен спільноті, а спільнота нічого не винна
            вибувшому
          </li>
          <li>
            Спільні ресурси (власність) належить спільноті, навіть якщо в спільноті один власник
          </li>
          <li>
            Власники вкладають в розвиток справи (реалізацію мети) ресурс (інтелектуальний,
            духовний, матеріальній, технологічний, інструментальний, інформаційний) за бажанням та
            по можливості
          </li>
          <li>
            Прибуток (інтелектуальний, духовний, матеріальній, технологічний, інструментальний,
            інформаційний) розподіляється рівномірно між усіма власниками
          </li>
          <li>Рішення приймаються за згодою всіх власників</li>
          <li>Ці правила змінюються за згодою всіх власників</li>
          <li>Кожен власник погоджується з цими правилами по факту приєднання</li>
          <li>За згодою всіх учасників кола власник переміщується на рівень ближче до ядра</li>
          <li>
            В разі відсутності координатора власники зобов{`'`}язані обрати його не довше ніж за три
            дні. Інакше всі учасники кола від{`'`}єднуються автоматично
          </li>
          <li>Власник зобовязується ознайомити з цими правилами кожного учасника свого дерева</li>
        </ul>
      </div>
    </FormContainer>
  );
};
