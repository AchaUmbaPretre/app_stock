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
          title: 'Type de dépense',
          dataIndex: 'type',
          key: 'type',
          render: (text) => <Tag color='blue'>{text}</Tag>,
        },
        {
          title: 'Montant',
          dataIndex: 'total_type',
          key: 'total_type',
          ey: 'total_type',
          sorter: (a, b) => a.total_type - b.total_type,
          sortDirections: ['descend', 'ascend'],
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