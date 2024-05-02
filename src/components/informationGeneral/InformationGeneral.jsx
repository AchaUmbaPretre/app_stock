import React from 'react'
import { Tabs } from 'antd';
import InformationJour from '../../pages/informationJour/InformationJour'
import InformationMoney from '../../pages/informationJour/InformationJourMoney/InformationMoney'
import './informationGeneral.scss'
import Information7Jours from '../../pages/informationJour/Information7jours';
import Information7joursMoney from '../../pages/informationJour/InformationJourMoney/Information7joursMoney';
import Information30joursMoney from '../../pages/informationJour/InformationJourMoney/Information30joursMoney';
import Information30Jours from '../../pages/informationJour/Information30jours';
import Information1an from '../../pages/informationJour/Information1an';

const InformationGeneral = () => {
  return (
    <>
        <div className='informationGeneral'>
        <Tabs>
            <Tabs.TabPane tab='Rapport du jour' key={0}>
                <InformationMoney/>
                <InformationJour/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Rapport des 7 derniers jours' key={1}>
                <Information7joursMoney/>
                <Information7Jours/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Rapport des 30 derniers jours' key={2}>
                <Information30joursMoney/>
                <Information30Jours/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rapport d'un an" key={3}>
                <Information30joursMoney/>
                <Information1an/>
            </Tabs.TabPane>
        </Tabs>
        </div>
    </>
  )
}

export default InformationGeneral