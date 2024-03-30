import React, { useEffect, useState } from 'react'
import './rowTotalDetail.scss'
import { UsergroupAddOutlined, UserOutlined, SnippetsOutlined,ShoppingOutlined } from '@ant-design/icons';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';


const RowTotalDetail = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [produit, setProduit] = useState([]);
    const [client, setClient] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [vente, setVente] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);

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
     }, [DOMAIN])

     useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`${DOMAIN}/api/client/clientCount/count`);
            setClient(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

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
     }, [DOMAIN])

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
                        <h2 className="rowTotal-h2"><CountUp end={client ? client : 0 }/></h2>
                        <span className="rowTotal-span">Clients</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <UserOutlined className='rowTotalIcon' />
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgb(131, 159, 241)'}} onClick={()=>navigate('/livreur')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={livreur[0]?.total}/></h2>
                        <span className="rowTotal-span">Livreurs</span>
                    </div>
                    <div className="rowTotalDetail-right">
                    <UsergroupAddOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                <div className="rowTotalDetail-row" style={{background: 'rgba(53, 52, 52, 0.719)'}} onClick={()=>navigate('/ListeVariante')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={produit[0]?.total}/></h2>
                        <span className="rowTotal-span">Articles</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <SnippetsOutlined className='rowTotalIcon'/>
                    </div>
                </div>
                {
                  user?.role === 'admin' &&
                  <div className="rowTotalDetail-row" style={{background: 'rgba(0, 128, 0, 0.74)'}} onClick={()=>navigate('/ventes')}>
                    <div className="rowTotalDetail-left">
                        <h2 className="rowTotal-h2"><CountUp end={vente}/></h2>
                        <span className="rowTotal-span">ventes</span>
                    </div>
                    <div className="rowTotalDetail-right">
                        <ShoppingOutlined className='rowTotalIcon'/>
                    </div>
                  </div>
                }
            </div>
        </div>
    </>
  )
}

export default RowTotalDetail