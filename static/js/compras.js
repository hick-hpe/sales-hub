const modalCancelarCompra = document.querySelector(
    '#modalCancelarCompra'
);

const formCancelarCompra = document.querySelector(
    '#formCancelarCompra'
);

modalCancelarCompra.addEventListener(
    'show.bs.modal',
    (event) => {

        const button = event.relatedTarget;

        const compraId =
            button.dataset.compraId;

        formCancelarCompra.action =
            `/compras/${compraId}/cancelar/`;

        console.log(compraId);
        console.log(formCancelarCompra.action);
    }
);


const modalDetalhesCompra =
    document.querySelector('#modalDetalhesCompra');

modalDetalhesCompra.addEventListener(
    'show.bs.modal',
    async (event) => {

        const button = event.relatedTarget;

        const compraId =
            button.dataset.compraId;

        const response =
            await fetch(`/compras/${compraId}/detalhes/`);

        const compra =
            await response.json();

        document.querySelector('#compraId')
            .textContent = `#${compra.id}`;

        document.querySelector('#compraFornecedor')
            .textContent = compra.fornecedor;

        document.querySelector('#compraData')
            .textContent = compra.data;

        document.querySelector('#compraTotal')
            .textContent =
                compra.total.toLocaleString(
                    'pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }
                );

        const status =
            document.querySelector('#compraStatus');

        status.textContent =
            compra.status;

        status.className =
            compra.status_codigo === 'A'
                ? 'badge text-bg-success'
                : 'badge text-bg-danger';

        const tbody =
            document.querySelector('#tbodyItensCompra');

        tbody.innerHTML = '';

        compra.itens.forEach(item => {

            tbody.innerHTML += `
                <tr>
                    <td>${item.produto}</td>
                    <td>${item.quantidade}</td>
                    <td>
                        ${item.preco.toLocaleString(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }
                        )}
                    </td>
                    <td>
                        ${item.subtotal.toLocaleString(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }
                        )}
                    </td>
                </tr>
            `;
        });
    }
);