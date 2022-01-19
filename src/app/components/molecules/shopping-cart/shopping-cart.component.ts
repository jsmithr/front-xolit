import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from 'src/app/interface/invoice';
import { InvoiceDetail } from 'src/app/interface/invoiceDetail';
import { Product } from 'src/app/interface/product';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
	shoppingCart: any[] = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
	columns = [{ columnDef: 'nombre', text: 'Nombre' }, { columnDef: 'valorVentaConIva', text: 'Valor' }, { columnDef: 'cantidadUnidadesInventario', text: 'Uni. Inventario' }, { columnDef: 'porcentajeIvaAplicado', text: 'IVA' }, { columnDef: 'cantidadCompra', text: 'Cantidad' }, { columnDef: 'total', text: 'Total' }];
	displayedColumns = ['nombre', 'valorVentaConIva', 'cantidadUnidadesInventario', 'cantidadCompra', 'total'];
	invoice: Invoice = new Invoice();

	constructor(private invoiceSrv: InvoiceService, private _snackBar: MatSnackBar) {
		let total = 0;
		this.shoppingCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]').filter((p: any) => {
			p.total = p.cantidadCompra * p.valorVentaConIva
			total += p.total;
			return p.cantidadCompra > 0;
		});
		
		this.invoice.detalleFactura = [];
		this.invoice.total = total;
		this.shoppingCart.map(invoiceDetail => {
			this.invoice.detalleFactura.push({
				productoId: invoiceDetail.id,
				cantidad: invoiceDetail.cantidadCompra,
				valorVentaConIva: invoiceDetail.valorVentaConIva,
				porcentajeIVAAplicado: invoiceDetail.porcentajeIVAAplicado
			});
		});

		this.setDateSend();
		this.shoppingCart.push({ nombre: 'Total', total });
	}

	ngOnInit(): void {
	}

	setDateSend() {
		let someDate = new Date(), result = new Date(someDate.setDate(someDate.getDate() + 3));
		this.invoice.fechaEntrega = result;
	}

	validateDisabled = () => this.invoice.numeroDocumento == "" || this.invoice.nombre == '' || this.invoice.apellido == '' || this.invoice.telefono == '' || this.invoice.direccion == '';

	addInvoice() {
		this.invoiceSrv.add(this.invoice).subscribe(res => {
			if (res.status) {
				this._snackBar.open("Compra Realizada", "Cerrar", { duration: 5000, panelClass: 'snack-bar' });
				localStorage.removeItem('shopping-cart');
				this.shoppingCart = [];
				this.invoice = new Invoice();
			}
			console.log(res);
		});
	}

}
