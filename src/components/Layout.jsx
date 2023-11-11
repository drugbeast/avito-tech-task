import { Flex } from 'antd';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <Flex justify='space-between' vertical style={{minHeight: '97.5vh'}}>
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  );
}

export default Layout;
