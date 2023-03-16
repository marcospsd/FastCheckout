export const FormatTelCel = (id) => {
    try{ 
        const v = id.replace(/^(\d{2})(\d)/g,"($1) $2");
        const v2 = v.replace(/(\d)(\d{4})$/,"$1-$2");
        return v2
    } catch {
        return id
    }

}


export const formatDinheiro = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    return amount
  }
};


export const NameStatus = (x) => {
    switch (x) {
        case "F":
            return "Finalizado"
        case "P":
            return "Pendente"
    }
}

export const telefone = (n) => {
  if (n) return n.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

export const CPFReplace = (n) => {return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}


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

export const NameForma2 = (x) => {
    switch (x) {
        case 'DH':
            return "Dinheiro"
        case 'CC':
            return 'C. Crédito'
        case 'CD':
            return 'C. Débito'
        case 'DP':
            return 'PIX'
        case 'FO':
            return 'F. Pagamento'
        case 'VE':
            return 'Voucher EX.'
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

export function emailwhats(data) {
    if (data.dadoscliente.telefone, data.dadoscliente.email) {
        return `Sua nota fiscal será enviada através do E-mail: ${data.dadoscliente.email} ou Whatsapp: ${data.dadoscliente.telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")} que foram fornecidos no cadastro.`
    } else if (data.dadoscliente.email != null) {
        return `Sua nota fiscal será enviada através do E-mail: ${data.dadoscliente.email} que foi fornecido no cadastro.`
    } else if (data.dadoscliente.telefone != null) {
        return `Sua nota fiscal será enviada através do WhatsApp: ${data.dadoscliente.telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")} que foi fornecido no cadastro.`
    } else if (!data.dadoscliente.email, !data.dadoscliente.telefone) {
        return ""
    }
}

export const Dias = (dado) => {
    switch (dado) {
        case true:
            return "365 Dias"
        case false:
            return "90 Dias"
    }
}