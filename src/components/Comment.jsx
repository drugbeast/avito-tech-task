import Typography from 'antd/es/typography/Typography';
import { Avatar, ConfigProvider, Flex } from 'antd';

function Comment(props) {
  const { author, time, text, avatarBgColor } = props;
  const { Text } = Typography;
  return (
    <Flex vertical style={{ padding: '0 10px 10px' }}>
      <Typography>
        <Flex gap={10}>
          <Avatar
            style={{
              backgroundColor: avatarBgColor,
              verticalAlign: 'middle',
              position: 'relative',
              top: '5px'
            }}
            size="default">
            {author ? author[0] : ''}
          </Avatar>
          <Flex vertical justify="center">
            <Text strong={true}>{author}</Text>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#8a8788'
                }
              }}>
              <Text italic={true}>{new Date(time * 1000).toLocaleString()}</Text>
            </ConfigProvider>
          </Flex>
        </Flex>
      </Typography>
      <Flex dangerouslySetInnerHTML={{ __html: text }} vertical style={{ marginTop: '5px' }} />
    </Flex>
  );
}

export default Comment;
