const selectFornecedor = document.querySelector('#selectFornecedor');
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const tabelaProdutos = document.querySelector('#tabelaProdutos tbody');
const valorTotal = document.querySelector('#valorTotal');

let produtosFornecedor = [];

// ========================
// FORNECEDOR
// ========================

selectFornecedor.addEventListener('change', async (e) => {
    const fornecedorId = e.target.value;

    console.log('fornecedorId:', fornecedorId);

    produtosFornecedor = [];

    if (!fornecedorId) {
        atualizarTodosSelects();
        return;
    }

    const url = `/fornecedores/${fornecedorId}/produtos/`;

    try {
        const response = await fetch(url);
        produtosFornecedor = await response.json();

        atualizarTodosSelects();
    } catch (error) {
        console.error(error);
    }
});


// ========================
// SELECT PRODUTOS
// ========================

function atualizarTodosSelects() {
    document.querySelectorAll('.selectProdutos').forEach(select => {
        preencherSelect(select);
    });
}

function preencherSelect(select) {
    select.innerHTML = '<option value="">Selecione...</option>';

    produtosFornecedor.forEach(produto => {
        select.innerHTML += `
            <option value="${produto.id}">
                ${produto.nome}
            </option>
        `;
    });
}


// ========================
// ADICIONAR PRODUTO
// ========================

btnAdicionarProduto.addEventListener('click', () => {

    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>
            <select
                class="form-select selectProdutos"
                name="produto[]"
                required>
            </select>
        </td>

        <td>
            <input
                type="number"
                min="1"
                value="1"
                name="quantidade[]"
                class="form-control quantidade">
        </td>

        <td>
            <input
                type="number"
                step="0.01"
                min="0"
                value="0"
                name="preco[]"
                class="form-control preco">
        </td>

        <td>
            <span class="subtotal">
                R$ 0,00
            </span>
        </td>

        <td>
            <button
                type="button"
                class="btn btn-danger btn-sm removerProduto">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    `;

    tabelaProdutos.appendChild(tr);

    preencherSelect(tr.querySelector('.selectProdutos'));

    calcularTotal();
});


// ========================
// REMOVER PRODUTO
// ========================

document.addEventListener('click', (e) => {

    const btn = e.target.closest('.removerProduto');

    if (!btn) return;

    const linhas = tabelaProdutos.querySelectorAll('tr');

    if (linhas.length === 1) {
        return;
    }

    btn.closest('tr').remove();

    calcularTotal();
});


// ========================
// CALCULAR SUBTOTAL
// ========================

document.addEventListener('input', (e) => {

    if (
        e.target.classList.contains('quantidade') ||
        e.target.classList.contains('preco')
    ) {
        calcularLinha(e.target.closest('tr'));
        calcularTotal();
    }
});

function calcularLinha(tr) {

    const quantidade =
        parseFloat(tr.querySelector('.quantidade')?.value || 0);

    const preco =
        parseFloat(tr.querySelector('.preco')?.value || 0);

    const subtotal = quantidade * preco;

    tr.querySelector('.subtotal').textContent =
        formatarMoeda(subtotal);
}


// ========================
// TOTAL
// ========================

function calcularTotal() {

    let total = 0;

    document.querySelectorAll('#tabelaProdutos tbody tr')
        .forEach(tr => {

            const quantidade =
                parseFloat(
                    tr.querySelector('.quantidade')?.value || 0
                );

            const preco =
                parseFloat(
                    tr.querySelector('.preco')?.value || 0
                );

            total += quantidade * preco;
        });

    valorTotal.textContent = formatarMoeda(total);
}


// ========================
// UTIL
// ========================

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}


// ========================
// PRIMEIRA LINHA
// ========================

const primeiraLinha = document.querySelector('#tabelaProdutos tbody tr');

primeiraLinha.querySelector('input[name="quantidade[]"]')
    .classList.add('quantidade');

primeiraLinha.querySelector('input[name="preco[]"]')
    .classList.add('preco');

calcularTotal();

