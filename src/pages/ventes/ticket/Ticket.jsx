import React, { useEffect, useState } from 'react'
import './ticket.scss'
import config from '../../../config';
import logo from './../../../assets/logo_doe-removebg-preview.png'
import axios from 'axios';

const Ticket = ({idTicket}) => {

    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState({});
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
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Nom :</p>
                            <b>Elysée</b>
                        </div>
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Telephone :</p>
                            <b>+243 832222284</b>
                        </div>
                        <div className="ticket-contact-row">
                            <p className="ticket-name">Date :</p>
                            <b>le 20-10-2024</b>
                        </div>
                    </div>
                </div>

                <div className="ticket-table">
                    <table>
                        <tr>
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                        </tr>
                        <tr>
                            <td>Ernst Handel</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                        </tr>
                        <tr>
                            <td>Laughing Bacchus Winecellars</td>
                            <td>Yoshi Tannamuri</td>
                            <td>Canada</td>
                            <td>Canada</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Italy</td>
                            <td>Italy</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </>
  )
}

export default Ticket