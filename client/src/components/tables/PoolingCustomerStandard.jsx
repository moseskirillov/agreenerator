import React from 'react';
import { HotTable } from '@handsontable/react'

const PoolingCustomerStandard = ({sCRef, rows, iPoints, language}) => {
  return (
    <HotTable
      ref={sCRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={[
        {},
        {},
        {type: 'dropdown', source: iPoints},
        {type: 'dropdown', source: ['тент', 'изотерм', 'реф']},
        {}, {}, {}
      ]}
      nestedHeaders={
        [
          [`Склад<br/> заказчика`, 'Грузополучатель', `Город<br/> доставки`, 'Тип кузова',
            {
              label: 'Стоимость доставки 1 паллетоместа при следующем количестве паллет в поставке, руб. без НДС',
              colspan: 7
            }
          ],
          ['', '', '', '', '1-15', '16-20', '21-25']
        ]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default PoolingCustomerStandard;
