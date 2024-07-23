import {Footer} from '@/components';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history} from '@umijs/max';
import {message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  // submit form
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword} = values;
    // Verify
    if (userPassword !== checkPassword) {
      message.error("Two passwords don't match");
      return;
    }
    try {
      // Register
      const res = await register(values);
      if (res) {
        const defaultLoginSuccessMessage = 'Registered successfully!';
        message.success(defaultLoginSuccessMessage);

        const urlParams = new URL(window.location.href).searchParams;
        history.push('/user/login?redirect=' + urlParams);
        return;
      }
    } catch (error : any) {
      const defaultLoginFailureMessage = "Login failed, please try again!";
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'Login'} - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: 'Register'
              }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="AC Center"
          subTitle={'AC will find a job in the near future'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account Password Register',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Please enter your account"
                rules={[
                  {
                    required: true,
                    message: 'Account is a required field!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Please enter your password"
                rules={[
                  {
                    required: true,
                    message: 'Password is a required field!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Length cannot be less than 8!'
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Please enter your password again"
                rules={[
                  {
                    required: true,
                    message: 'Checked password is a required field!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Length cannot be less than 8!'
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
