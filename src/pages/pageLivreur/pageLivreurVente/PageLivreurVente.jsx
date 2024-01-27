import { StepBackwardOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import './pageLivreurVente.scss'
import { useNavigate } from 'react-router-dom';

const PageLivreurVente = () => {
    const navigate = useNavigate();
      

  return (
    <>
        <div className="pageLivreurVente">
            <div className="pageLivreurVente-container">
              <div className="page-rows-top">
                <div className="page-row-top" onClick={()=>navigate("/pageRetourCommande")}>
                  <StepBackwardOutlined className='page-icon' />
                  <span className="page-top-desc">Retour</span>
                </div>
                <div className="page-row-top">
                  <ShoppingCartOutlined className='page-icon' onClick={()=>navigate("/pageCommandeLivraison")}/>
                  <span className="page-top-desc">Livraison</span>
                </div>
              </div>
            </div>
        </div>

    </>
  )
}

export default PageLivreurVente