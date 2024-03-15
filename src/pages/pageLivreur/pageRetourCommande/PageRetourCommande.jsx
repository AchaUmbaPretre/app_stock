import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../../../config';
import { FadeLoader } from 'react-spinners';

const PageRetourCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const scroll = { x: 400 };
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const userId = useSelector((state) => state.user.currentUser.id);

     useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraison-user/${userId}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [userId]);

  return (
    <>
        <div className="pageCommandeLivraison">
          <div className="page-rows-retour" onClick={()=>navigate('/pageLivreurVente')}>
            <div className="page-retour-row" style={{background:'#fff',border: "1px solid rgba(3, 3, 109, 0.171)", color:"rgb(3, 3, 109)",padding: '6px',width:'max-content',cursor:'pointer',borderRadius: "5px"}}>
              retour
            </div>
          </div>
        <h1>Liste de commande non livré</h1>
        { loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
          ) : (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => {
                const lineNumber = index + 1;
                return (
                <List.Item>
                    <List.Item.Meta
                    className='pageCommande-list'
                    title={<a href={`pageLivraisonRetour/${item.id_commande}`} >{`Ligne ${lineNumber}: Commande n° ${item.id_commande} de ${item.nom}`}</a>}
                    description={`Adresse de la livraison : ${item.adresse}`}
                    />
                </List.Item>
                );
            }}
        />)}
        </div>

    </>
  )
}

export default PageRetourCommande;