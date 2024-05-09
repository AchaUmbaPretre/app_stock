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
import Information1anMoney from '../../pages/informationJour/InformationJourMoney/Informatique1anMoney';
import InformationHier from '../../pages/informationJour/InformationHier';
import InformationHierMoney from '../../pages/informationJour/InformationJourMoney/InformationHierMoney';

const InformationGeneral = () => {
  return (
    <>
        <div className='informationGeneral'>
        <Tabs>
            <Tabs.TabPane tab="Aujourd'hui" key={0}>
                <InformationMoney/>
                <InformationJour/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Hier' key={1}>
                <InformationHierMoney/>
                <InformationHier/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='7 derniers jours' key={2}>
                <Information7joursMoney/>
                <Information7Jours/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='30 derniers jours' key={3}>
                <Information30joursMoney/>
                <Information30Jours/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="1 an" key={4}>
                <Information1anMoney/>
                <Information1an/>
            </Tabs.TabPane>
        </Tabs>
        </div>
    </>
  )
}

export default InformationGeneral