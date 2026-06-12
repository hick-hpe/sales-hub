const inputTelefone = document.querySelector('#id_telefone');

inputTelefone.addEventListener('input', (e) => {
    let numeros = e.target.value.replace(/\D/g, '');
    
    numeros = numeros.substring(0, 11);

    e.target.value = formatarTelefone(numeros);
});

function formatarTelefone(numeros) {
    if (numeros.length === 0) {
        return '';
    }
    if (numeros.length <= 2) {
        return `(${numeros}`;
    }
    if (numeros.length <= 6) {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2)}`;
    }
    if (numeros.length <= 10) {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
    } else {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
    }
}