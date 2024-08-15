import { Table, Tag } from 'antd';
import React from 'react';

const DepensesType = ({data}) => {
    const scroll = { x: 600 };
    
    const columns = [
        { 
          title: '#', 
          dataIndex: 'id', 
          key: 'id', 
          render: (text, record, index) => index + 1, 
          width: 80
        },
        {
          title: 'Bénéficiaire',
          dataIndex: 'beneficiaire',
          key: 'beneficiaire',
          render: (text) => <Tag color='blue'>{text}</Tag>,
        },
        {
          title: 'Montant',
          dataIndex: 'total_beneficiaire',
          key: 'total_beneficiaire',
          render: (text) => <Tag color='blue'>{text} $</Tag>, // Retourner le JSX
        },
    ];
  return (
    <>
        <div>
            <Table columns={columns} dataSource={data} scroll={scroll} pagination={{ pageSize: 8 }} />
        </div>
    </>
  )
}

export default DepensesType