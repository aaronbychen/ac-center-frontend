import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <><GithubOutlined /> AC GitHub </>,
          href: 'https://github.com/aaronbychen',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
