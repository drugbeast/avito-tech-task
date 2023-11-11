import { Flex, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

function Header() {
  return (
    <>
      <Flex justify="center">
        <Typography>
          <Title level={1}>News App</Title>
        </Typography>
      </Flex>
    </>
  );
}

export default Header;
