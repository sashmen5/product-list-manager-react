import * as React from 'react';
import './ProductList.css';
import ProductsStore from "../../../stores/ProductsStore";

import { inject, observer } from 'mobx-react';
import ProductItem from "./ProductItem/ProductItem";

@inject('store')
@observer
class ProductList extends React.Component<{store?: ProductsStore}, object> {
    async componentDidMount(): Promise<void> {
        const { store } = this.props;
        await store.fetchProducts();
    };

    public render() {
        const { displayedProducts, loadingProducts, errorOccurred } = this.props.store;
        let showProducts = false;
        if (!loadingProducts && !errorOccurred && displayedProducts) {
            showProducts = true;
        }

        return (
            <div className="ProductList">
                {
                    loadingProducts && <div className="lds-dual-ring"/>
                }
                {
                    showProducts && displayedProducts.length === 0 && <div>No data to display</div>
                }
                {
                    showProducts && displayedProducts.length > 0 && displayedProducts.map(item => <ProductItem key={item.id} product={item}/>)
                }
                {
                    errorOccurred && <div>Sorry, some error occurred</div>
                }
            </div>
        );
    }
}

export default ProductList;
