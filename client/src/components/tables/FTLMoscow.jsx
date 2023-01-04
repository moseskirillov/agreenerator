import React from 'react';
import { HotTable } from '@handsontable/react'

const FtMoscow = ({mRef, rows, language}) => {
  return (
    <HotTable
      ref={mRef}
      stretchH="all"
      colHeaders={true}
      contextMenu={true}
      language={language}
      className="htCenter"
      data={rows}
      height={'80vh'}
      columns={[
        {},
        {type: 'dropdown', source: ['1.5т', '3т', '5т', '10т', '15т', '20т']},
        {type: 'dropdown', source: ['1-4', '5-6', '7-8', '9-15', '16-33']},
        {type: 'dropdown', source: ['тент', 'изотерм', 'реф']},
        {}, {}, {}, {}, {}, {}, {}, {}, {}
      ]}
      nestedHeaders={
        [[`Место<br/> загрузки`, 'Тип ТС', `Вместимость<br/> паллет`, 'Тип кузова', `Минимально<br/> оплачиваемое<br/> время, час`,
          {
            label: 'Стоимость за машину, руб. без НДС',
            colspan: 4
          },
          `Тариф за 8-ми<br/> часовой простой`, `Тариф за доп. точку<br/> выгрузки руб. без НДС`, 'ПРР', 'Экспедирование'],
          ['', '', '', '', '', `1 зона<br/> (выгрузка)`, `2 зона<br/> (выгрузка)`, `3 зона<br/> (выгрузка)`, `4 зона<br/> (выгрузка)`]
        ]
      }
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default FtMoscow;