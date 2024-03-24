import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const Home : React.FC = () => {
  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title="Welcome, let start !"
      />
    </div>
  );
};

export default Home;
