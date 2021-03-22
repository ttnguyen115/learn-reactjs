import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
import NotFound from './features/Todo/components/NotFound';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: '10'
      };

      const productList = await productApi.getAll(params );

      console.log(productList);
    }

    fetchProducts();
  }, []);

  return (
    <div className="App">
        <Header />

        <Switch>
          <Route path="/" component={ CounterFeature } exact/>
          <Route path="/todos" component={ TodoFeature } />
          <Route path="/albums" component={ AlbumFeature } />
          <Route component={ NotFound } exact/>
        </Switch>

        Footer
    </div>
  );
}

export default App;
