import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/interface/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
	selector: 'app-invoices',
	templateUrl: './invoices.component.html',
	styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

	invoiceList: any[] = [];
	columns = [{ columnDef: 'numeroFactura', text: '# Factura' },{ columnDef: 'nombre', text: 'Nombre completo' }, { columnDef: 'numeroDocumento', text: 'Número Documento' }, { columnDef: 'telefono', text: 'Teléfono' }, { columnDef: 'fechaEntrega', text: 'Fecha Entrega' }, { columnDef: 'fechaPedido', text: 'Fecha Pedido' }, { columnDef: 'total', text: 'Total' }];
	displayedColumns = ['numeroFactura', 'nombre', 'numeroDocumento', 'telefono', 'fechaEntrega', 'fechaPedido', 'total'];

	constructor(private invoiceSrv: InvoiceService, public dialog: MatDialog) {
		this.invoiceSrv.get().subscribe(res => {
			this.invoiceList = res.map((invoice: Invoice) => {
				invoice.nombre = invoice.nombre + ' ' + invoice.apellido;
				let total = 0;
				/* invoice.detalleFactura.map(({ cantidad, valorVentaConIva }) => total += cantidad * valorVentaConIva);
				invoice.total = total; */
				return invoice;
			});
		});
	}

	ngOnInit(): void {
	}

	openDialog(invoice: any) {
		this.invoiceSrv.find(invoice.numeroFactura).subscribe(res => {
			const dialogRef = this.dialog.open(DialogDetailInvoice, {
				width: '600px',
				data: res
			});
		});
	}

}


@Component({
	selector: 'dialog-detail-invoice',
	templateUrl: 'dialog-detail-invoice.component.html',
	styleUrls: ['./invoices.component.scss']
})
export class DialogDetailInvoice {
	invoice: Invoice;
	columns = [{ columnDef: 'nombre', text: 'Nombre' }, { columnDef: 'valorVentaConIva', text: 'Valor Unit.' }, { columnDef: 'cantidadUnidadesInventario', text: 'Uni. Inventario' }, { columnDef: 'porcentajeIvaAplicado', text: 'IVA' }, { columnDef: 'cantidadCompra', text: 'Cantidad' }, { columnDef: 'total', text: 'Total' }];
	displayedColumns = ['nombre', 'valorVentaConIva', 'cantidadCompra', 'total'];

	constructor(
		public dialogRef: MatDialogRef<DialogDetailInvoice>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		let total = 0;
		let detailInvoice = data.detalleFactura.map((d: any) => {
			total += d.cantidad * d.valorVentaConIva;
			return {
				nombre: d.producto.nombre,
				valorVentaConIva: '$ ' + d.valorVentaConIva.toLocaleString(),
				cantidadCompra: d.cantidad.toLocaleString(),
				total: '$ ' + (d.cantidad * d.valorVentaConIva).toLocaleString(),
			}
		});

		detailInvoice.push({
			nombre: 'Total',
			valorVentaConIva: '',
			cantidadCompra: '',
			total: '$ ' + total.toLocaleString(),
		});

		this.invoice = { ...data, detalleFactura: detailInvoice };
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}