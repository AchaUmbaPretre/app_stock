import React from 'react'
import './pageLivreurDetail.scss'
import profil from '../../../assets/2e6501ef-e0e6-4968-af04-5a90fe0ffd69.jpg'

const PageLivreurDetail = () => {
  return (
    <>
      <div className="pageLivreurDetail">
        <div className="pageLivreurDetail-wrapper">
          <img src={profil} alt="" className="img-page-livreur" />
          <div className="pageLivreurDetail-rows">
            <span className="pageLivreur-name"><span className='pageLivreur-sous-nom'>Nom : </span> Produit1</span>
            <span className="pageLivreur-name"><span className='pageLivreur-sous-nom'>Nom : </span>Produit1</span>
            <span className="pageLivreur-name"><span className='pageLivreur-sous-nom'>Nom : </span>Produit1</span>
            <span className="pageLivreur-name"><span className='pageLivreur-sous-nom'>Nom : </span>Produit1</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageLivreurDetail