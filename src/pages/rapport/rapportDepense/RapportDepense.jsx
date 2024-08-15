import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Card } from 'antd';
import axios from 'axios';
import './rapportDepense.scss';
import DepenseFilter from './depenseFilter/DepenseFilter';
import DepenseMoisChart from './depenseMoisChart/DepenseMoisChart';
import DepensePeriode from './depensePeriode/DepensePeriode';
import config from '../../../config';
import DepensesType from './depensesType/DepensesType';
import DepensesBeneficiaire from './depensesBeneficiaire/DepensesBeneficiaire';

const { TabPane } = Tabs;

const RapportDepense = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [monthlyData, setMonthlyData] = useState([]);
    const [totalPeriodData, setTotalPeriodData] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state is true
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState({
        monthlyData: [],
        totalPeriodData: []
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/rapport/depense-rapport-global`);
            setMonthlyData(response.data.monthlyData);
            setTotalPeriodData(response.data.totalPeriodData);
            setFilteredData({
                monthlyData: response.data.monthlyData,
                totalPeriodData: response.data.totalPeriodData
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Une erreur est survenue lors de la récupération des données.');
            setLoading(false);
        }
    };

    // Charger les données initiales au montage du composant
    useEffect(() => {
        fetchData();
    }, []);

    const handleFilter = (dates) => {
        setLoading(true);
        setError(null);
    
        const [startDate, endDate] = dates;
        const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
        const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;
    
        axios.get(`${DOMAIN}/api/rapport/depense-rapport-global`, {
            params: { startDate: formattedStartDate, endDate: formattedEndDate }
        })
        .then((response) => {
            setFilteredData({
                monthlyData: response.data.monthlyData,
                totalPeriodData: response.data.totalPeriodData
            });
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setError('Une erreur est survenue lors de la récupération des données.');
            setLoading(false);
        });
    };

    return (
        <div className="rapportDepense">
            <h1 className='rapport-h1'>Rapport des dépenses</h1>
            <div className="rapportDepense-wrapper">
                <DepenseFilter onFilter={handleFilter} />
            </div>
            <div className="rapportDepense-rows">
                <div style={{ padding: '20px' }}>
                    {loading && <Spin size="large" />}
                    {error && <div className="error-message">{error}</div>}
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Dépenses Mensuelles" key="1">
                            <Card>
                                <DepenseMoisChart data={filteredData.monthlyData} />
                            </Card>
                        </TabPane>
                        <TabPane tab="Total sur Période" key="2">
                            <Card>
                                <DepensePeriode data={filteredData.totalPeriodData} />
                            </Card>
                        </TabPane>
                        <TabPane tab="Dépenses par type" key="3">
                            <Card>
                                <DepensesType data={filteredData.totalPeriodData} />
                            </Card>
                        </TabPane>
                        <TabPane tab="Bénéficiaire" key="4">
                            <Card>
                                <DepensesBeneficiaire data={filteredData.totalPeriodData} />
                            </Card>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default RapportDepense;
