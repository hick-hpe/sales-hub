const modalExcluirFornecedor = document.getElementById('excluirFornecedor');

modalExcluirFornecedor.addEventListener('show.bs.modal', (event) => {

    const button = event.relatedTarget;
    const formExcluirFornecedor = modalExcluirFornecedor.querySelector("#formExcluirFornecedor");

    const nomeFornecedorElem = modalExcluirFornecedor.querySelector('#nomeFornecedor');
    const id = button.getAttribute('data-id');
    const distribuidora = button.getAttribute('data-distribuidora');
    const nome = button.getAttribute('data-nome');

    nomeFornecedorElem.textContent = `${distribuidora} - ${nome}`;

    formExcluirFornecedor.action = `/fornecedores/${id}/excluir/`;
});