import React from 'react';
import { HotTable } from '@handsontable/react'

const PoolingCustomerStandard = ({sPRef, rows, iPoints, language}) => {
  return (
    <HotTable
      ref={sPRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={[
        {},
        {type: 'dropdown', source: ['сети', 'другое']},
        {type: 'dropdown', source: iPoints},
        {type: 'dropdown', source: ['тент', 'изотерм', 'реф']},
        {}
      ]}
      nestedHeaders={
        [
          ['Грузоотправитель', 'Грузополучатель', `Город<br/> доставки`, 'Тип кузова', `Стоимость доставки<br/> 1 паллетомета, руб.<br/> без НДС`]
        ]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default PoolingCustomerStandard;
