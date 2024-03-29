import React, { useEffect, useState } from 'react'
import config from '../../../config';
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
                
            </div>
        </div>

    </>
  )
}

export default Ticket