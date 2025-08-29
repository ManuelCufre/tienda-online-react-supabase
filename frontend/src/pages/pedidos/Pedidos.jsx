export default function Pedidos({productosAgregados}) {
    console.log('desde pedidos')
    console.log(productosAgregados)
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Pedidos</h1>
            <p>Esta es la página de pedidos.</p>
        </div>
    )
}