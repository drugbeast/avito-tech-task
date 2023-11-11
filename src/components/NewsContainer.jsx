import { useEffect, useState } from 'react';
import { useInterval } from '../utils/useInterval';
import NewsCard from './NewsCard';
import { Flex, List, Skeleton } from 'antd';
import ButtonComponent from './core/ButtonComponent';

export const AMOUNT = 100;

function NewsContainer() {
  const [news, setNews] = useState([]);
  const [isClicked, setClicked] = useState(false);

  const fetchData = () => {
    const fetchNews = async (newsIds) => {
      const newsArr = [];
      for (let id of newsIds) {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );
        const json = await response.json();
        newsArr.push(json);
      }
      return newsArr;
    };

    fetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
      .then((res) => res.json())
      .then(async (newsIds) => {
        const fetchedNews = await fetchNews(newsIds.slice(0, AMOUNT));
        setNews(fetchedNews);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setClicked(false);
      setNews([]);
    };
  }, [isClicked]);

  useInterval(() => {
    fetchData();
    setNews([]);
  }, 60000);

  return (
    <Flex style={{ justifyContent: 'center' }}>
      <Flex style={{ width: '90%', flexDirection: 'column' }} gap="large">
        <ButtonComponent
          handleClick={() => setClicked(true)}
          text={'Refresh the news'}
          fontSize={20}
          size={'middle'}
          style={{ margin: '0 auto' }}
        />
        <List
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            position: 'bottom',
            align: 'center'
          }}
          grid={{ gutter: 24, column: 2 }}
          dataSource={
            news.length != 0 ? news.sort((a, b) => b.time - a.time) : Array(AMOUNT).fill({})
          }
          renderItem={(item) => (
            <List.Item>
              <Skeleton loading={news.length == 0} active>
                <NewsCard item={item} />
              </Skeleton>
            </List.Item>
          )}
        />
      </Flex>
    </Flex>
  );
}

export default NewsContainer;
