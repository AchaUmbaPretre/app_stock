import React, { useState } from 'react';
import { Tabs, Spin, Card } from 'antd';
import axios from 'axios';
import './rapportDepense.scss'
import DepenseFilter from './depenseFilter/DepenseFilter'
import TabPane from 'antd/es/tabs/TabPane';
import DepenseMoisChart from './depenseMoisChart/DepenseMoisChart';
import DepensePeriode from './depensePeriode/DepensePeriode';

const RapportDepense = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [totalPeriodData, setTotalPeriodData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFilter = (dates) => {
        setLoading(true);
    
        const [startDate, endDate] = dates;
        const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
        const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;
    
        axios.get('/api/depense-rapport-global', {
          params: { startDate: formattedStartDate, endDate: formattedEndDate }
        })
        .then((response) => {
          setMonthlyData(response.data.monthlyData);
          setTotalPeriodData(response.data.totalPeriodData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
      };
    
  return (
    <>
        <div className="rapportDepense">
            <h1 className='rapport-h1'>Rapport des dépenses</h1>
            <div className="rapportDepense-wrapper">
                <DepenseFilter onFilter={handleFilter} />
            </div>
            <div className="rapportDepense-rows">
                <div style={{ padding: '20px' }}>
                    {loading && <Spin size="large" />}
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Dépenses Mensuelles" key="1">
                        <Card>
                            <DepenseMoisChart data={monthlyData} />
                        </Card>
                        </TabPane>
                        <TabPane tab="Total sur Période" key="2">
                        <Card>
                            <DepensePeriode data={totalPeriodData} />
                        </Card>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
  )
}

export default RapportDepense