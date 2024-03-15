import { StepBackwardOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import iconRetour from './../../../assets/return-box_2649277.png'
import iconLivraison from './../../../assets/delivery_1350253.png'
import './pageLivreurVente.scss'
import { useNavigate } from 'react-router-dom';

const PageLivreurVente = () => {
    const navigate = useNavigate();
      

  return (
    <>
        <div className="pageLivreurVente">
            <div className="pageLivreurVente-container">
              <div className="page-rows-top" style={{display:'flex', flexDirection:'column'}}>
                <div className="page-row-top" onClick={()=>navigate("/pageCommandeLivraison")}>
                  <img src={iconLivraison} alt="" className='page-icon'/>
                  <span className="page-top-desc">Livraison</span>
                </div>
                <div className="page-row-top" onClick={()=>navigate("/pageRetourCommande")}>
                  <img src={iconRetour} alt="" className='page-icon'/>
                  <span className="page-top-desc">Retour</span>
                </div>
              </div>
            </div>
        </div>

    </>
  )
}

export default PageLivreurVente