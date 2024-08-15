import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;

const DepenseFilter = ({ onFilter }) => {
    const [dates, setDates] = useState([null, null]);
    const handleFilter = () => {
        onFilter(dates);
      };

  return (
    <>
        <div style={{ marginBottom: '20px' }}>
            <RangePicker
                onChange={(dates) => setDates(dates)}
                format="YYYY-MM-DD"
            />
            <Button onClick={handleFilter} type="primary" style={{ marginLeft: '10px' }}>
                Filtrer
            </Button>
        </div>
    </>
  )
}

export default DepenseFilter