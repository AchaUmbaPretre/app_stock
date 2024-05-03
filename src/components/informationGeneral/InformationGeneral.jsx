import React from 'react'
import { Col, Row, Tabs } from 'antd';
import InformationJour from '../../pages/informationJour/InformationJour'
import InformationMoney from '../../pages/informationJour/InformationJourMoney/InformationMoney'
import './informationGeneral.scss'
import Information7Jours from '../../pages/informationJour/Information7jours';
import Information7joursMoney from '../../pages/informationJour/InformationJourMoney/Information7joursMoney';
import Information30joursMoney from '../../pages/informationJour/InformationJourMoney/Information30joursMoney';
import Information30Jours from '../../pages/informationJour/Information30jours';
import Information1an from '../../pages/informationJour/Information1an';
import Information1anMoney from '../../pages/informationJour/InformationJourMoney/Informatique1anMoney';
import TabPane from 'antd/es/tabs/TabPane';

const InformationGeneral = () => {
  return (
    <>
        <div className='informationGeneral'>
        <Tabs>
      <TabPane tab='Rapport du jour' key={0}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <InformationMoney />
          </Col>
          <Col xs={24} sm={12}>
            <InformationJour />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab='Rapport des 7 derniers jours' key={1}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Information7joursMoney />
          </Col>
          <Col xs={24} sm={12}>
            <Information7Jours />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab='Rapport des 30 derniers jours' key={2}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Information30joursMoney />
          </Col>
          <Col xs={24} sm={12}>
            <Information30Jours />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Rapport d'un an" key={3}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Information1anMoney />
          </Col>
          <Col xs={24} sm={12}>
            <Information1an />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
        </div>
    </>
  )
}

export default InformationGeneral