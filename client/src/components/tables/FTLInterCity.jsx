import React from 'react';
import { HotTable } from '@handsontable/react'

const FtlInterCity = ({icRef, rows, points, language}) => {
  return (
    <HotTable
      ref={icRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={
        [
          {type: 'dropdown', source: points},
          {type: 'dropdown', source: points},
          {type: 'dropdown', source: ['1.5т', '3т', '5т', '10т', '15т', '20т']},
          {}, {}, {}
        ]
      }
      nestedHeaders={[
        ['Адрес загрузки', 'Город выгрузки', 'Тип ТС, тоннаж', {
          label: 'Стоимость за машину, руб. без НДС',
          colspan: 3
        }],
        ['', '', '', 'Тент', 'Изотерм', 'Реф']]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default FtlInterCity;