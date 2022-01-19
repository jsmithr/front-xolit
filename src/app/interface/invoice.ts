import { InvoiceDetail } from "./invoiceDetail";

export class Invoice {
    id: number;
    numeroFactura: number = 0;
    numeroDocumento: string = "";
    nombre: string = '';
    apellido: string = '';
    telefono: string = '';
    direccion: string = '';
    fechaEntrega: any;
    fechaPedido: string;
    detalleFactura: InvoiceDetail[];
    total: number = 0;
}