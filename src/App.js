import React, { useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import AlbumFeature from './features/Album';
import TodoFeature from './features/Todo';
import NotFound from './features/Todo/components/NotFound';
import productApi from './api/productApi'

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
        Header
        
        <div>
          <NavLink to="/">Home</NavLink><br/>
          <NavLink to="/todos">Todos</NavLink><br/>
          <NavLink to="/albums">Albums</NavLink><br/>
        </div>

        <Switch>
          <Route path="/todos" component={ TodoFeature } />
          <Route path="/albums" component={ AlbumFeature } />
          <Route component={ NotFound } />
        </Switch>

        Footer
    </div>
  );
}

export default App;
