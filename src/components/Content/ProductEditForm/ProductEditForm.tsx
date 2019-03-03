import * as React from 'react';
import './ProductEditForm.css';
import ProductsStore from "../../../stores/ProductsStore";
import {inject, observer} from "mobx-react";
import VanillaTilt from "vanilla-tilt";

interface ProductEditFormProps {
    store?: ProductsStore
}

@inject('store')
@observer
class ProductEditForm extends React.Component<ProductEditFormProps, null> {
    componentDidUpdate(): void {
        const image = document.getElementById("image");
        if (image) {
            VanillaTilt.init(image, {
                reverse: true,
                glare: true,
                "max-glare": 0.95
            });
        }
    }

    handleSavePressed = (event) => {
        event.preventDefault();
        this.props.store.editProduct();
    };

    handleInputChange = (event) => {
        event.preventDefault();
        const {value, name} = event.target;
        this.props.store.selectedProductFieldChange(name, value);
    };

    checkPriceError = (number: string) => {
        const isNum = /^\d+$/.test(number);
        return !isNum
    };

    public render() {
        const {selectedProduct} = this.props.store;
        let priceError: boolean = false;
        let nameError: boolean = false;

        let disableSubmit: boolean = false;
        let disableInput: boolean = false;

        let name: string = "";
        let price: number = 0;
        let description: string = "";
        let url: string = "";

        if (selectedProduct) {
            priceError = this.checkPriceError(selectedProduct.price.toString());
            nameError = !selectedProduct.name;
            name = selectedProduct.name;
            price = selectedProduct.price;
            description = selectedProduct.description;
            url = selectedProduct.url;
        } else {
            disableInput = true;
            if (priceError || nameError) {
                disableSubmit = true;

            }
        }

        return (
            <div className="ProductEditForm">
                {
                    url &&
                            <div
                                className="Image"
                                id="image"
                            >
                                <img id={name} src={selectedProduct.url} alt="image" data-tilt/>
                            </div>
                }

                <form onSubmit={this.handleSavePressed}>
                    <label>Product name</label>
                    <input
                        disabled={disableInput}
                        name="name"
                        type="text"
                        onChange={this.handleInputChange}
                        value={name}
                    />
                    {nameError && <div className="Error">Please enter name</div>}

                    <label>Description</label>
                    <textarea
                        disabled={disableInput}
                        value={description}
                        onChange={this.handleInputChange}
                    />

                    <label>Price</label>
                    <input
                        disabled={disableInput}
                        value={price}
                        name="price"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                    {priceError && <div className="Error">Please enter only digits</div>}
                    <input
                        disabled={disableSubmit}
                        type="submit"
                        value="Save"
                    />
                </form>
            </div>
        );
    }
}

export default ProductEditForm;
