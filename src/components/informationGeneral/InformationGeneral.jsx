import React from 'react'
import InformationJour from '../../pages/informationJour/InformationJour'
import InformationMoney from '../../pages/informationJour/InformationJourMoney/InformationMoney'
import './informationGeneral.scss'

const InformationGeneral = () => {
  return (
    <>
        <div className='informationGeneral'>
            <InformationMoney/>
            <InformationJour/>
        </div>
    </>
  )
}

export default InformationGeneral