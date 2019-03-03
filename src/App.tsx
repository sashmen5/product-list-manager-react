import * as React from 'react';
import './App.css';
import {inject, observer} from 'mobx-react';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import ProductsStore from "./stores/ProductsStore";

@inject('store')
@observer
class App extends React.Component<{ store?: ProductsStore }, object> {

    public render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

export default App;
