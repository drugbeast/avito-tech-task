import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Skeleton, Tree, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import ButtonComponent from './core/ButtonComponent';
import { updateTreeData } from '../utils/updateTreeData';

const colors = ['#882426', '#CDBEA7', '#323030', 'C29545'];

function Commentaries(props) {
  const commentsIds = props.commentsIds;

  const [treeData, setTreeData] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const { Text } = Typography;

  useEffect(() => {
    createInitialCommentsTree(commentsIds);
    return () => {
      setClicked(false);
    };
  }, [commentsIds, isClicked]);

  const createInitialCommentsTree = async (commentsIds) => {
    const tree = [];
    for (let id of commentsIds) {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      const json = await response.json();
      if (!json.dead) {
        tree.push({
          title: (
            <Comment
              author={json.by}
              time={json.time}
              text={json.text}
              avatarBgColor={colors[Math.floor(Math.random() * colors.length)]}
            />
          ),
          key: `0-${id}`
        });
      }
    }
    setTreeData(tree);
  };

  const onLoadData = async ({ key }, commentsIds) => {
    const commentsNodes = [];
    for (let id of commentsIds) {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      const json = await response.json();
      commentsNodes.push({
        title: (
          <Comment
            author={json.by}
            time={json.time}
            text={json.text}
            avatarBgColor={colors[Math.floor(Math.random() * colors.length)]}
          />
        ),
        key: `${key}-${id}`
      });
    }
    setTreeData((origin) => updateTreeData(origin, key, commentsNodes));
  };

  return (
    <>
      <Typography>
        <Flex gap={10}>
          <ConfigProvider
            theme={{
              token: {
                fontSize: 30
              }
            }}>
            <Text strong={true}>Commentaries</Text>
          </ConfigProvider>
          <ButtonComponent
            handleClick={() => {
              setClicked(true);
              setTreeData([]);
            }}
            text={'Refresh commentaries'}
            fontSize={12}
            size={'small'}
            style={{position: 'relative', top: '5px'}}
          />
        </Flex>
      </Typography>

      <Skeleton loading={treeData.length == 0} active>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          selectable={false}
          loadData={async (treeNode) => {
            const keyArr = treeNode.key.split('-');
            const expandId = keyArr[keyArr.length - 1];
            const response = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${expandId}.json?print=pretty`
            );
            const json = await response.json();
            if (json.kids) {
              onLoadData(treeNode, json.kids);
            } else {
              onLoadData(treeNode, []);
            }
          }}
        />
      </Skeleton>
    </>
  );
}

export default Commentaries;
