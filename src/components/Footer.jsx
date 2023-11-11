import { Flex, Typography } from 'antd';

function Footer() {
  const { Text } = Typography;
  return (
    <>
      <Flex justify="center" style={{ padding: '40px 20px 20px' }}>
        <Typography>
          <Text strong={true} level={1}>
            Created by drugbeast. 2023
          </Text>
        </Typography>
      </Flex>
    </>
  );
}

export default Footer;
