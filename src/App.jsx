import { Routes, Route } from 'react-router-dom';
import NewsList from './routes/NewsList';
import News from './routes/News';
import Layout from './components/Layout';
import NotFound from './routes/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<NewsList />} />
        <Route path="/:id" element={<News />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
