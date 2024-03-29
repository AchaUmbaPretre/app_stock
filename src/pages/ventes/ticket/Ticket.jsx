import React, { useEffect, useState } from 'react'
import './ticket.scss'
import config from '../../../config';
import logo from './../../../assets/logo_doe-removebg-preview.png'
import axios from 'axios';
import moment from 'moment';

const Ticket = ({idTicket}) => {

    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/${idTicket}`);
            setLoading(false)
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idTicket]);

      console.log(data)

  return (
    <>
        <div className="ticket">
            <div className="ticket-wrapper">
                <div className="ticket-logo">
                    <img src={logo} alt="" className='ticket-img'/>
                    <h1 className='ticket-title'>Ndoé boutique</h1>
                    <h1 className='ticket-title'>+243 817 001 002 | Rdc kinsahsa</h1>
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
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Total</th>
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
                                <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td style={{color:'black'}}>
                                    {data.reduce(
                                    (total, item) => total + item.prix_unitaire * item.quantite,
                                    0
                                    )}
                                    $
                                </td>
                                </tr>
                            )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="ticket-fin">
                    <p className="ticket-desc">Merci d'avoir choisi nos services. Nous apprécions votre soutien et espérons vous revoir bientôt. N'hésitez pas à nous contacter si vous avez des questions ou des préoccupations. Bonne journée !</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Ticket