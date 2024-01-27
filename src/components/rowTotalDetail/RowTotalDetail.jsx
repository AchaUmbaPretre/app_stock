import React, { useEffect, useState } from 'react'
import './rowTotalDetail.scss'
import { UsergroupAddOutlined, UserOutlined, SnippetsOutlined,ShoppingOutlined } from '@ant-design/icons';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RowTotalDetail = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [produit, setProduit] = useState([]);
    const [client, setClient] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [vente, setVente] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/produit/produitCount`);
                setProduit(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/client/clientCount`);
                setClient(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/livreur/livreurCount`);
                setLivreur(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

     useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const {data} = await axios.get(`${DOMAIN}/api/vente/venteCount`);
                setVente(data[0]?.total)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

  return (
    <>
        <div className="rowTotalDetail">
            <div className="rowTotalDetail-wrapper">
                <div className="rowTotalDetail-row" style={{background: 'rgba(255, 166, 0, 0.932)'}} onClick={()=>navigate('/clients')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2">{client[0]?.total ? client[0]?.total : 0 }</h2>
                        <span className="rowTotal-span">Clients</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <UserOutlined className='rowTotalIcon' />
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgb(131, 159, 241)'}} onClick={()=>navigate('/livreur')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2">{livreur[0]?.total}</h2>
                        <span className="rowTotal-span">Livreurs</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <UsergroupAddOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgba(53, 52, 52, 0.719)'}} onClick={()=>navigate('/products')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2">{produit[0]?.total}</h2>
                        <span className="rowTotal-span">Produits</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <SnippetsOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgba(0, 128, 0, 0.74)'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2">{vente}</h2>
                        <span className="rowTotal-span">vente</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <ShoppingOutlined className='rowTotalIcon'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RowTotalDetail