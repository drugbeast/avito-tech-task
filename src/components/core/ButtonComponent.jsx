import { Button } from 'antd';
import ConfigProvider from 'antd/es/config-provider';

function ButtonComponent(props) {
  const { handleClick, text, fontSize, size, style } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgTextHover: '#e03409',
          colorPrimary: '#e03409',
          controlHeight: 40,
          fontSize: fontSize
        }
      }}>
      <Button style={style} onClick={handleClick} size={size}>
        {text}
      </Button>
    </ConfigProvider>
  );
}

export default ButtonComponent;
