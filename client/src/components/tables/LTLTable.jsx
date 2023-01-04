import React from 'react';
import { HotTable } from '@handsontable/react'
import { DropdownCellType, registerCellType } from 'handsontable/cellTypes';

const LtlTable = ({hotRef, rows, language}) => {

  registerCellType(DropdownCellType)

  return (
    <HotTable
      ref={hotRef}
      language={language}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={
        [
          {}, {}, {},
          {type: 'dropdown', source: ['сети', 'другое']},
          {type: 'dropdown', source: ['тент', 'изотерм', 'рефрижератор']},
          {}, {}, {}, {}, {}, {}, {}, {}, {}
        ]
      }
      nestedHeaders={
        [['Адрес загрузки', 'Адрес выгрузки', 'Регион', 'Грузополучатель', 'Тип кузова', {
          label: 'Стоимость доставки 1 паллетоместа при следующем количестве паллет в поставке, руб. без НДС и без копеек',
          colspan: 9
        }], ['', '', '', '', '', '1', '2', '3', '4', '5', '6-8', '9-15', '16-20', '21-25']]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default LtlTable;