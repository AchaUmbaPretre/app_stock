import React from 'react'
import './informationJour.scss'

const InformationJour = () => {

  return (
    <>
        <div className='informationJour'>
            <div className="info-row">
                <span>Nbre de vente : </span>
                <span>10</span>
            </div>
            <div className="info-row">
                <span>Nbre de commande : </span>
                <span>10</span>
            </div>
            <div className="info-row">
                <span>Nbre de livraison : </span>
                <span>10</span>
            </div>
        </div>

    </>
  )
}

export default InformationJour