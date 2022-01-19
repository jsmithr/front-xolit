export class Product {
    id?: number;
    nombre: string;
    valorVentaConIva?: number;
    cantidadUnidadesInventario?: number;
    porcentajeIvaAplicado?: string;
    cantidadCompra?: number = 0;
    total: number = 0;
}