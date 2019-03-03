import * as React from 'react';
import './ProductItem.css';
import {Product} from "../../../../models";
import ProductsStore from "../../../../stores/ProductsStore";
import {inject, observer} from "mobx-react";
import VanillaTilt from 'vanilla-tilt';
interface ProductItemProps {
    product: Product;
    store?: ProductsStore;
}

@inject('store')
@observer
class ProductItem extends React.Component<ProductItemProps, {selected: boolean}> {
    constructor(props: ProductItemProps) {
        super(props);
        this.state = {
            selected: false
        }
    }

    handleItemClicked = (event) => {
        event.preventDefault();
        const {id} = this.props.product;
        this.props.store.selectProduct(id);
    };

    componentDidMount(): void {
        const {name} = this.props.product;
        const img = document.getElementById(name);
        VanillaTilt.init(img, {
            scale: 1.25
        });
    }

    public render() {
        const { product } = this.props;
        const { name, description, thumbnailUrl} = product;
        const {selectedProduct} = this.props.store;
        const classes: string[] = ["ProductItem"];
        if (selectedProduct && selectedProduct.id === product.id) {
            classes.push("Selected");
        }

        return (
            <div className={classes.join(" ")} onClick={this.handleItemClicked}>
                <div className="Information">
                    <div className="Image">
                        <img id={name} src={thumbnailUrl} alt="image" data-tilt/>
                    </div>
                    <div className="Text">
                        <div className="Name">{name}</div>
                        <div className="Description">{description}</div>
                    </div>
                </div>
                <button>Delete</button>
            </div>
        );
    }
}

export default ProductItem;
