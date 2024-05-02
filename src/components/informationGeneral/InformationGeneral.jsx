import React from 'react'
import { Button, Space, Table, Popover, Tag, Image, Tabs } from 'antd';
import InformationJour from '../../pages/informationJour/InformationJour'
import InformationMoney from '../../pages/informationJour/InformationJourMoney/InformationMoney'
import './informationGeneral.scss'

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
            </Tabs.TabPane>
            <Tabs.TabPane tab='Rapport des 30 derniers jours' key={2}>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rapport d'un an" key={3}>
            </Tabs.TabPane>
        </Tabs>
        </div>
    </>
  )
}

export default InformationGeneral