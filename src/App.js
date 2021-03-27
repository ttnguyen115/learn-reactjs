import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';
import NotFound from './features/Todo/components/NotFound';

function App() {

  return (
    <div className="App">
        <Header />
        
        <Switch>
          <Route path="/" component={ CounterFeature } exact/>
          <Route path="/todos" component={ TodoFeature } />
          <Route path="/albums" component={ AlbumFeature } />
          <Route path="/products" component={ ProductFeature } />

          <Route component={ NotFound } exact/>
        </Switch>

    </div>
  );
}

export default App;
