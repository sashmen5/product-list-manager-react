import {action, observable} from "mobx";
import {Product} from "../models";
import {normalizeAllProducts} from "../utils/ProductSorter";

const productsServerUrl: string = "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json ";

class ProductsStore {
    private originalProducts: Product[] = [];
    private currentPage: number = 0;
    public productsPerPage: number = 5;


    @observable proxyProducts: Product[] = [];
    @observable displayedProducts: Product[] = [];
    @observable errorOccurred: boolean = false;
    @observable loadingProducts: boolean = false;
    @observable selectedProduct: Product;
    @observable showModal: boolean = false;
    @observable savedProductName: string = "";

    @action
    fetchProducts = async () => {
        this.loadingProducts = true;
        try {
            const response = await fetch(productsServerUrl);
            const typedProducts = await response.json();
            this.originalProducts = normalizeAllProducts(typedProducts);
            this.proxyProducts = [...this.originalProducts];
            this.displayedProducts = [...this.originalProducts.slice(0, this.productsPerPage)];
        } catch (error) {
            this.errorOccurred = true;
        } finally {
            this.loadingProducts = false;
        }
    };

    @action
    filterProducts = (filterText: string) => {
        if (!filterText) {
            this.proxyProducts = [...this.originalProducts];
            this.displayedProducts = [...this.proxyProducts.slice(0, this.productsPerPage)];
            return;
        }

        filterText = filterText.toLowerCase();
        const result = this.proxyProducts
            .filter((item: Product) => {
                if (item.name.toLowerCase().indexOf(filterText) !== -1) {
                    return true;
                }

                return item.description && item.description.toLowerCase().indexOf(filterText) !== -1;

            });
        this.proxyProducts = [...result];
        this.displayedProducts = [...this.proxyProducts.slice(0, this.productsPerPage)];
    };

    @action
    sortProductsByName = () => {
        const result: Product[] = this.proxyProducts.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        this.proxyProducts = [...result];
        this.displayedProducts = [...this.proxyProducts.slice(0, this.productsPerPage)];

    };

    @action
    sortProductsByPrice = () => {
        const result: Product[] = this.proxyProducts.sort((a, b) => a.price - b.price);
        this.proxyProducts = [...result];
        this.displayedProducts = [...this.proxyProducts.slice(0, this.productsPerPage)];
    };

    @action
    editProduct = () => {
        let product = this.originalProducts.find(item => item.id === this.selectedProduct.id);
        product.name = this.selectedProduct.name;
        product.description = this.selectedProduct.description;
        product.price = this.selectedProduct.price;

        product = this.proxyProducts.find(item => item.id === this.selectedProduct.id);
        if (product) {
            product.name = this.selectedProduct.name;
            product.description = this.selectedProduct.description;
            product.price = this.selectedProduct.price;
        }


        this.changePage(this.currentPage);
        this.savedProductName = this.selectedProduct.name;
        this.selectedProduct = undefined;
        this.handleModal();
    };

    @action
    selectProduct = (id: number) => {
        const product: Product = this.originalProducts.find(item => item.id === id);
        this.selectedProduct = {...product};
    };

    @action
    changePage = (pageNumber: number) => {
        this.currentPage = pageNumber;
        const fromProduct: number = pageNumber * this.productsPerPage;
        const toProduct: number = fromProduct + this.productsPerPage;
        const products: Product[] = this.proxyProducts.slice(fromProduct, toProduct);
        this.displayedProducts = [...products];
    };

    @action
    selectedProductFieldChange = (key: string, value: string) => {
        this.selectedProduct[key] = value;
    };

    @action
    handleModal = () => {
      this.showModal = !this.showModal;
    };
}

export default ProductsStore;
