import { Result } from 'antd';
import ButtonComponent from '../components/core/ButtonComponent';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      style={{ marginTop: '100px' }}
      extra={
        <Link to="/">
          <ButtonComponent text={'Back to list'} fontSize={18}>
            Back to list
          </ButtonComponent>
        </Link>
      }
    />
  );
}

export default NotFound;
