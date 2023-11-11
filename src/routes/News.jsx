import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/core/ButtonComponent';
import { ConfigProvider, Flex, Spin, Table } from 'antd';
import Commentaries from '../components/Commentaries';
import { useEffect, useState } from 'react';
import { AMOUNT } from '../components/NewsContainer';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  }
];

function News() {
  const location = useLocation();
  const navigate = useNavigate();
  const newsFromStore = useSelector((state) => state.news.news);
  const [news, setNews] = useState(newsFromStore);

  const queryId = location.pathname.split('/').pop();

  async function fetchNews() {
    if (!newsFromStore.id) {
      const responseBestStories = await fetch(
        'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty'
      );
      let jsonBestStories = await responseBestStories.json();
      jsonBestStories = jsonBestStories.slice(0, AMOUNT);
      if (jsonBestStories.includes(Number(queryId)) && !isNaN(Number(queryId))) {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${queryId}.json?print=pretty`
        );
        const json = await response.json();
        setNews(json);
      } else {
        navigate('*');
      }
    }
  }

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      key: '1',
      name: 'URL',
      description: news.url
    },
    {
      key: '2',
      name: 'Title',
      description: news.title
    },
    {
      key: '3',
      name: 'Date',
      description: new Date(news.time * 1000).toLocaleString()
    },
    {
      key: '4',
      name: 'Author',
      description: news.by
    },
    {
      key: '5',
      name: 'Descendants',
      description: news.descendants
    }
  ];
  return (
    <>
      {(!news.id && !newsFromStore.id) && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#e03409'
            },
            components: {
              Spin: {
                dotSizeLG: 50
              }
            }
          }}>
          <Spin size="large" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />
        </ConfigProvider>
      )}
      {(news.id || newsFromStore.id) && (
        <Flex style={{ justifyContent: 'center' }}>
          <Flex style={{ width: '90%', flexDirection: 'column' }} gap={24}>
            <Link to="/">
              <ButtonComponent
                handleClick={null}
                text={'Back to list'}
                fontSize={20}
                size={'middle'}
                style={{ margin: '0 auto' }}
              />
            </Link>
            <Table
              columns={columns}
              pagination={false}
              bordered
              dataSource={data}
              style={{ width: '70%' }}
            />
            <Commentaries commentsIds={news.kids} />
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default News;
