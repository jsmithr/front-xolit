import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	listProduct: Product[];
	input: string;
	total = { totalProducts: 0, totalValue: 0 };

	constructor(private productSrv: ProductService) {
		if (localStorage.getItem('shopping-cart') == undefined)
			localStorage.setItem('shopping-cart', '[]');

		productSrv.get().subscribe((res: Product[]) => {
			let jsonCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
			this.listProduct = this.loadQuantity(res, jsonCart);
		});
		this.calculateTotal();
	}

	ngOnInit(): void {
	}

	loadQuantity(res: Product[], productsLocalstorage: Product[]) {
		return res.map((p: Product) => {
			let searhProduct = productsLocalstorage.find((productCart: Product) => p.id == productCart.id);
			if (searhProduct)
				p.cantidadCompra = searhProduct.cantidadCompra;

			return p;
		});
	}

	addSub(quantity: number, product: Product) {
		if (product.cantidadCompra == undefined || product.cantidadCompra == 0)
			product.cantidadCompra = 1;
		else if (product.cantidadCompra >= 1) {
			product.cantidadCompra += (1 * quantity);
		}
		this.addToShoppingCart(product);
		this.calculateTotal();
	}

	addToShoppingCart(product: Product) {
		let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
		let productCart = shoppingCart.find((p: Product) => p.id == product.id);

		if (productCart)
			productCart.cantidadCompra = product.cantidadCompra;
		else
			shoppingCart.push(product);

		localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
	}

	calculateTotal() {
		let jsonCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]'), totalProducts = 0, totalValue = 0;
		jsonCart.map((product: Product) => {
			totalProducts += product.cantidadCompra || 0;
			totalValue += (product.valorVentaConIva || 0) * (product.cantidadCompra || 0);
		});
		this.total = { totalProducts, totalValue };
	}
}
