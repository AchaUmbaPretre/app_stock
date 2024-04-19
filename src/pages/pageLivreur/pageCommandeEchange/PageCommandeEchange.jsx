import { useSelector } from 'react-redux';
import './pageCommandeLivraison.scss'
import { List } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../../../config';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { CaretLeftOutlined } from '@ant-design/icons';

const PageCommandeEchange = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
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
      }, [DOMAIN,userId]);

  return (
    <>
        <div className="pageCommandeLivraison">
        <div className='pageCommande-return' onClick={()=>navigate('/pageLivreurVente')}>
          <div className="page-retour-row">
            <CaretLeftOutlined />
          </div>
        </div>
        <h1>Liste de commande</h1>
        { loading ? (
            <div className="spinner-container">
              <FadeLoader color={'#36D7B7'} loading={loading} />
            </div>
        ) : (
          <div>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => {
                  const lineNumber = index + 1;
                  return (
                  <List.Item>
                      <List.Item.Meta 
                      className='pageCommande-list'
                      title={<a href={`pageCommandeVentes/${item.id_commande}`} >{`Ligne ${lineNumber}: Commande n° ${item.id_commande} de ${item.nom}`}</a>}
                      description={`Adresse de la livraison : C/${item.nom_commune} Q/${item.quartier} Av/${item.avenue} N°${item.num}`}
                      />
                  </List.Item>
                  );
              }}
            />
          </div>)}
        </div>
    </>
  )
}

export default PageCommandeEchange;