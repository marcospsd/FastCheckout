export const telefone = (n) => {
    if (n) return n.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

export const CPFReplace = (n) => {return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}

export const ValorDinheiro = (n) => {return parseInt(n).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}

export const NameForma = (x) => {
    switch (x) {
        case 'DH':
            return "Dinheiro"
        case 'CC':
            return 'Cartão de Crédito'
        case 'CD':
            return 'Cartão de Débito'
        case 'DP':
            return 'PIX'
        case 'FO':
            return 'Folha de Pagamento'
        case 'VE':
            return 'Voucher Exagerado'
    }
}

export const CodUser = (user) => {
    switch (user) {
        case 'C':
            return 'Caixa'
        case 'V':
            return 'Vendedor'
        case 'A':
            return 'Administrador'
        case 'E':
            return 'Estoque'
    }
}
