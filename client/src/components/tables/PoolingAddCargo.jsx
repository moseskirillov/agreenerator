import React from 'react';
import { HotTable } from '@handsontable/react'

const PoolingAddCargo = ({addRef, rows, iPoints, language}) => {
  return (
    <HotTable
      ref={addRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={[
        {},
        {type: 'dropdown', source: iPoints},
        {type: 'dropdown', source: ['тент', 'изотерм', 'реф']},
        {}, {}, {}, {}
      ]}
      nestedHeaders={
        [
          [
            `Склад<br/> заказчика`, `Город<br/> доставки`, 'Тип кузова',
            `Стоимость доставки</br>FTL с возможностью</br>Догруза, 20 т., руб.</br> без НДС`,
            `Скидка заказчику</br>FTL с возможностью</br>Догруза за 1 паллет,</br>руб. без НДС`,
            `Тариф за доставку</br>1 паллеты в составе</br>Догруза,</br>руб. без НДС`,
            `Тариф за забор</br>партии груза</br> для Догруза,</br>руб. без НДС`
          ]
        ]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default PoolingAddCargo;
