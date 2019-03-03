import * as React from 'react';
import ReactPaginate from 'react-paginate';

import "./Content.css";
import ProductList from "./ProductList/ProductList";
import ProductsStore from "../../stores/ProductsStore";
import {inject, observer} from "mobx-react";
import ProductEditForm from "./ProductEditForm/ProductEditForm";
import Modal from "../Modal/Modal";


@inject('store')
@observer
class Content extends React.Component<{ store?: ProductsStore }, { sortValue: string }> {
    constructor(props: { store?: ProductsStore }) {
        super(props);
        this.state = {
            sortValue: ""
        }
    }

    filterItems = (event) => {
        event.preventDefault();
        const {store} = this.props;
        store.filterProducts(event.target.value);
    };

    handleSortChange = (event) => {
        const {value} = event.target;
        const {store} = this.props;
        this.setState({
            sortValue: value
        });

        if (value === "name") {
            store.sortProductsByName();
        } else {
            store.sortProductsByPrice();
        }
    };

    handlePageClick = (data: { selected: number }) => {
        const {selected} = data;
        this.props.store.changePage(selected);
    };

    closeModal = (event) => {
        event.preventDefault();
        this.props.store.handleModal();
    };

    public render() {
        const {proxyProducts, productsPerPage, showModal, savedProductName} = this.props.store;
        const pageCount = proxyProducts.length / productsPerPage;
        let modalText: string = "";
        if (showModal) {
            modalText = `Thank you for updating product - "${savedProductName}"`;
        }

        return (
            <div className="Content">
                <div className="LeftSide">
                    <div className="Bar">
                        <button>+ Add</button>
                        <input type="text" placeholder="Search" onChange={this.filterItems}/>
                        <select value={this.state.sortValue} onChange={this.handleSortChange}>
                            <option value="" disabled>Sort</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <ProductList/>
                    <ReactPaginate
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        onPageChange={this.handlePageClick}
                        containerClassName={'Pagination'}
                        previousClassName={'Previous'}
                        nextClassName={'Next'}
                        disabledClassName={'Disabled'}
                    />
                </div>
                <div className="RightSide">
                    <ProductEditForm/>
                </div>
                {
                    showModal && <Modal
											text={modalText}
											btnText="Close"
											handleBtnClicked={this.closeModal}
										/>
                }

            </div>
        );
    }
}

export default Content;
