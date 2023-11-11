import { useDispatch } from 'react-redux';
import { Card, Flex, Typography } from 'antd';
import { UserOutlined, LikeOutlined, CalendarOutlined } from '@ant-design/icons';
import { setNews } from '../store/newsSlice';
import { Link } from 'react-router-dom';

function NewsCard(props) {
  const dispatch = useDispatch();

  const card = props.item;
  const { Text } = Typography;

  const date = new Date(card.time * 1000).toLocaleString();
  const cardsContent = [
    {
      key: 1,
      icon: <UserOutlined />,
      content: card.by
    },
    {
      key: 2,
      icon: <LikeOutlined />,
      content: card.score
    },
    {
      key: 3,
      icon: <CalendarOutlined />,
      content: date
    }
  ];

  return (
    <Link to={`/${card.id}`}>
      <Card title={card.title} hoverable={true} onClick={() => dispatch(setNews(card))}>
        <Typography>
          {cardsContent.map((card) => (
            <Flex key={card.key} gap={4}>
              {card.icon}
              <Text italic={true} style={{ fontSize: 18 }}>
                {card.content}
              </Text>
            </Flex>
          ))}
        </Typography>
      </Card>
    </Link>
  );
}

export default NewsCard;
