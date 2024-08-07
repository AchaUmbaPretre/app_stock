import React, { useEffect, useState } from 'react'
import './informationJour.scss'
import axios from 'axios';
import config from '../../config';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import venteIcon from './../../assets/remove-from-cart_5733278.png'
import commandeIcon from './../../assets/check-box_6399627.png'
import livraisonIcon from './../../assets/delivery_1350151.png'
import mouvementEncoursIcon from './../../assets/production_9784534.png'
import mouvementVenduIcon from './../../assets/package_755832.png'
import detteIcon from './../../assets/money_12831139.png'
import paiementIcon from './../../assets/payment-method_10747694.png'
import clientIcon from './../../assets/customer_3126649.png'


const InformationHier = ({ period }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [commande, setCommande] = useState([]);
    const [livraison, setLivraison] = useState([]);
    const navigate = useNavigate();
    const [client, setClient] = useState([]);
    const [mouvementEncours, setMouvementEncours] = useState([]);
    const [mouvementVente, setMouvementVente] = useState([]);
    const [dette, setDette] = useState([]);
    const [paiement, setPaiement] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/venteDhier`);
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
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeHier`);
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
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonNbreDHier`);
            setLivraison(data);
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
            const { data } = await axios.get(`${DOMAIN}/api/client/clientCount/countHier`);
            setClient(data[0].nbre_client);
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementCountHier`);
            setMouvementEncours(data[0]?.nbre_mouvement_encours);
            setMouvementVente(data[0]?.nbre_mouvement_vente);
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/detteRapportHier`);
            setDette(data[0]?.montant_total_restant);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/paiementHierMontant`);
            setPaiement(data[0]?.montant_total);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);


      return (
        <>
            <div className="rowTotalDetails" style={{margin: '20px 0'}}>
            <div className="rowTotalDetail-wrapper">
                <div className="rowTotalDetail-row" style={{background: 'rgba(0, 128, 0, 0.74)'}} onClick={()=>navigate(`venteRapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={data[0]?.nombre_vendu}/></h2>
                        <span className="rowTotal-span">ventes</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={venteIcon} alt="" className='rowTotalIcon' />
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgb(131, 159, 241)'}} onClick={()=>navigate(`/commandeRapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={commande[0]?.nbre}/></h2>
                        <span className="rowTotal-span">commandes</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={commandeIcon} alt="" className='rowTotalIcon' />
                    </div>
                </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(53, 52, 52, 0.719)'}} onClick={()=>navigate(`/livraisonRapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={livraison[0]?.nbre_livraison}/></h2>
                        <span className="rowTotal-span">Livraisons</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={livraisonIcon} alt="" className='rowTotalIcon' />
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(124, 3, 3, 0.575)'}} onClick={()=>navigate(`/mouvementEncours?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={mouvementEncours}/></h2>
                        <span className="rowTotal-span">Mouvement en cours</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={mouvementEncoursIcon} alt="" className='rowTotalIcon' />
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(1, 1, 223, 0.582)'}} onClick={()=>navigate(`/mouvementVente_rapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={mouvementVente}/></h2>
                        <span className="rowTotal-span">Mouvement vendu</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={mouvementVenduIcon} alt="" className='rowTotalIcon' />
                    </div>
                  </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgb(112,128,144)'}} onClick={()=>navigate(`dette_rapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={dette ? dette : 0 }/> $</h2>
                        <span className="rowTotal-span">Montant à credit</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={detteIcon} alt="" className='rowTotalIcon' />
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgb(128,0,0)'}} onClick={()=>navigate(`/paiement_rapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={paiement ? paiement : 0 }/> $</h2>
                        <span className="rowTotal-span">Remboursement</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={paiementIcon} alt="" className='rowTotalIcon' />
                    </div>
                </div>
                  <div className="rowTotalDetail-row" style={{background: 'rgba(255, 166, 0, 0.932)'}} onClick={()=>navigate(`/client_rapport?period=${period}`)}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={client ? client : 0 }/></h2>
                        <span className="rowTotal-span">Clients</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <img src={clientIcon} alt="" className='rowTotalIcon' />
                    </div>
                </div>
            </div>
        </div>
        </>
      )
}

export default InformationHier