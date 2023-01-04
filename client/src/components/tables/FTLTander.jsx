import React from 'react';
import { HotTable } from '@handsontable/react'

const FtlTander = ({tRef, rows, language}) => {
  return (
    <HotTable
      ref={tRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={
        [
          {},
          {type: 'dropdown', source: ['1.5т', '3т', '5т', '10т', '15т', '20т']},
          {type: 'dropdown', source: ['1-4', '5-6', '7-8', '9-15', '16-33']},
          {type: 'dropdown', source: ['тент', 'изотерм', 'реф']},
          {}, {}, {}, {}, {}, {}, {}, {}
        ]
      }
      nestedHeaders={
        [['Место загрузки', 'Тип ТС', `Вместимость</br> паллет`, 'Тип кузова', `Минимально</br> оплачиваемое</br> время, час`, `Адрес</br> выгрузки`, 'Грузополучатель',
          `Минимальный тариф</br> руб. без НДС`, `Тариф за 8-ми</br> часовой простой`, `Тариф за доп. точку</br> выгрузки руб.</br> без НДС`, 'ПРР', 'Экспедирование']]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default FtlTander;