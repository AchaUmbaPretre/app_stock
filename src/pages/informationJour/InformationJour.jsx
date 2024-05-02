import React, { useEffect, useState } from 'react'
import './informationJour.scss'
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SyncOutlined,CarOutlined, UserOutlined,CarryOutOutlined, ShoppingCartOutlined ,ShoppingOutlined } from '@ant-design/icons';

const InformationJour = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [commande, setCommande] = useState([]);
    const [livraison, setLivraison] = useState([]);
    const navigate = useNavigate();
    const [produit, setProduit] = useState([]);
    const [client, setClient] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [vente, setVente] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);
    


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/venteDuJour`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeJour`);
            setCommande(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonNbreJour`);
            setLivraison(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/client/clientCount/countJour`);
            setClient(data[0].nbre_client);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);



      return (
        <>
            <div className="rowTotalDetail" style={{margin: '20px 0'}}>
            <div className="rowTotalDetail-wrapper">
                <div className="rowTotalDetail-row" style={{background: 'rgba(0, 128, 0, 0.74)'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={data[0]?.nombre_vendu}/></h2>
                        <span className="rowTotal-span">ventes</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <ShoppingOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgb(131, 159, 241)'}} onClick={()=>navigate('/livreur')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={commande[0]?.nbre}/></h2>
                        <span className="rowTotal-span">commandes</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <ShoppingCartOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(53, 52, 52, 0.719)'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={livraison[0]?.nbre_livraison}/></h2>
                        <span className="rowTotal-span">Livraisons</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <CarOutlined className='rowTotalIcon'/>
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'yellow'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={vente}/></h2>
                        <span className="rowTotal-span">Mouvement en cours</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <SyncOutlined className='rowTotalIcon'/>
                        
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(41, 41, 41, 0.801)'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={vente}/></h2>
                        <span className="rowTotal-span">Mouvement vendu</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <CarryOutOutlined className='rowTotalIcon'/>
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(255, 166, 0, 0.932)'}} onClick={()=>navigate('/clients')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={client ? client : 0 }/></h2>
                        <span className="rowTotal-span">Clients</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <UserOutlined className='rowTotalIcon' />
                    </div>
                </div>
            </div>
        </div>
        </>
      )
}

export default InformationJour