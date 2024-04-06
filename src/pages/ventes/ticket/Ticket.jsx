import React, { useEffect, useRef, useState } from 'react'
import './ticket.scss'
import config from '../../../config';
import logo from './../../../assets/logo_doe-removebg-preview.png'
import axios from 'axios';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import { PrinterOutlined,WhatsAppOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Ticket = ({idTicket}) => {

    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const componentRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/${idTicket}`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idTicket]);

      const openWhatsApp = () => {
        const phoneNumber = data[0]?.telephone;
        const whatsappURL = `https://wa.me/${phoneNumber}`;
    
        window.open(whatsappURL, '_blank');
      };

        // Calcul du total
  const total = data?.reduce((total, item) => total + item.prix_unitaire * item.quantite, 0);


  console.log(data)

  // Calcul du solde
  const acompte = data[0]?.acompte;
  const solde = total - acompte;
    

  return (
    <>
        <div className="ticket" ref={componentRef}>
            <div className="ticket-wrapper">
                <span className="ticket-number">N° {`${new Date().getFullYear().toString().substring(2)}${data[0]?.id_shop.toString().padStart(2, '0')}${data[0]?.id_commande.toString().padStart(4, '0')}`}</span>
                <div className="ticket-logo">
                    <img src={logo} alt="" className='ticket-img'/>
                    <h1 className='ticket-titles'>Ndoé boutique</h1>
                    <h1 className='ticket-title'>+243 817 001 002 | Rdc Kinshasa</h1>
                </div>
                <div className="ticket-contact">
                    <div className="ticket-contact-rows">
                    {data.length > 0 && (
                        <React.Fragment>
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Nom :</p>
                            <b>{data[0]?.nom_client}</b>
                        </div>
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Telephone :</p>
                            <b>{data[0]?.telephone}</b>
                        </div>
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Date :</p>
                            <b>{moment(data[0]?.date_vente).format('DD-MM-YYYY')}</b>
                        </div>
                        </React.Fragment>
                    )}
                    </div>
                </div>

                <div className="ticket-table">
                    <table>
                        <thead>
                        <tr>
                            <th className='ticket-th'>Nom</th>
                            <th className='ticket-th'>Quantité</th>
                            <th className='ticket-th'>Prix</th>
                            <th className='ticket-th'>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((dd, index) => (
                        <React.Fragment key={dd.id}>
                            <tr>
                            <td>{dd.nom_produit} {dd.nom_marque}</td>
                            <td>{dd.quantite}</td>
                            <td>{dd.prix_unitaire}$</td>
                            <td>{dd.prix_unitaire * dd.quantite}$</td>
                            </tr>
                            {index === data.length - 1 && (
                            <>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td style={{fontSize: "10px"}}>Acompte payé</td>
                                    <td style={{fontSize: "10px"}}>{total}$</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td style={{fontSize: "10px"}}>Solde</td>
                                    <td style={{fontSize: "10px"}}>{total}$</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td style={{fontSize: "10px"}}>Reste à payer</td>
                                    <td style={{fontSize: "10px"}}>{total - data[0]?.acompte > 0 ? total - data[0]?.acompte : 0}$</td>
                                </tr>
                            </>
                            )}
                        </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="ticket-fin">
                    <p className="ticket-desc">Merci d'avoir choisi nos services. Nous apprécions votre soutien et espérons vous revoir bientôt. N'hésitez pas à nous contacter si vous avez des questions ou des préoccupations. <b>Bonne journée !</b></p>
                </div>
            </div>
        </div>
        <ReactToPrint
            trigger={() => {
                    return <button style={{padding: "5px 8px", background :'#fff', border: 'none', marginBottom: '10px', cursor : 'pointer'}}><PrinterOutlined /> Imprimer</button>;
                }}
            documentTitle='carte'
            pageStyle={'print'}
            onAfterPrint={()=>{console.log("document printer")}}
            content={() => componentRef.current}
            />

        <Button
        style={{ padding: '5px 8px', background: '#fff', border: 'none', marginBottom: '10px', cursor: 'pointer' }}
        onClick={openWhatsApp}
      >
        <WhatsAppOutlined /> Partager sur WhatsApp
      </Button>
        </>
  )
}

export default Ticket