import React from 'react'
import config from '../../../config';

const Ticket = ({idTicket}) => {

    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/${id}`);
            setLoading(false)
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

  return (
    <div>Ticket</div>
  )
}

export default Ticket