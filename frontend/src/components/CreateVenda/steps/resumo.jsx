import React, { useState } from 'react'
import { Coluna, ContainerCreate, Linha, Tittle } from '../styles'
import { NameForma } from '../../Functions/functions'
import { Alert, Button } from '@mui/material'
import { CPFReplace, ValorDinheiro } from '../../Functions/functions'
import AlertText from '../../Alerts'
import { api } from '../../../services/api'
import SenhaVenda from '../../../reports/senha'


const ResumoStep = ({ data, setData, step, setStep, close }) => {
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    const [ blockbutton, setBlockButton] = useState(false)

    const Enviar = () => {
      setBlockButton(true)
      api.post(`/vendas/venda/`, data)
      .then((res) => {
          SenhaVenda(res.data)
          close()
      })
      .catch((err) => {
          setAlert({...alert, open: true, texto: JSON.stringify(err.response.data)}) 
      })
      .finally((res) => {
        setBlockButton(false)
      })

    }

    console.log(data)

    return (
        <ContainerCreate>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})}/>
            <Tittle>
                <p><strong>RESUMO VENDA</strong></p>
            </Tittle>
            <Coluna>
                    <label><strong>Vendedor: </strong>{data.vendedorname ? data.vendedorname.first_name : "Não informado"}</label>
                    <label><strong>CPF: </strong>{CPFReplace(data.cpf)}</label>
            </Coluna>
            <Coluna>
                    <label><strong>CodVend: </strong> {data.vendedorname ? data.vendedorname.codvend : "Não informado"}</label>
                    <label><strong>Total da Venda: </strong>{ValorDinheiro(data.total_venda)}</label>
            </Coluna>
            <Linha>

            <label><strong>Nome: </strong> {data.dadoscliente.nome}</label>
            <label><strong>E-mail: </strong> {data.dadoscliente.telefone}</label>
            <label><strong>Telefone: </strong> {(data.dadoscliente.email)}</label>

            </Linha>
        
            <Tittle>
              <p><strong>FORMA DE PAGAMENTO</strong></p>
            </Tittle>
            <Linha>

                <table>
                  <tbody>
                  <tr id='formatitle'>
                    <td><b>Forma de Pagamento</b></td>
                    <td><b>Parcelas</b></td>
                    <td><b>Valor</b></td>
                  </tr>
                {data.formavenda.map((forma) => (
                  <tr key={forma.id}>
                    <td className='formaconteudo' >{NameForma(forma.forma)}</td>
                    <td className='formaconteudo' >{forma.parcelas}</td>
                    <td className='formaconteudo' >{ValorDinheiro(forma.valor)}</td>
                  </tr>
                ))}
                </tbody>
                </table>

            </Linha>
            <Tittle>
                <p><strong>PRODUTOS</strong></p>
            </Tittle>
            <Linha>
                
                <table>
                  <tbody>
                    <tr id='corpotittle'>
                        <td><b>Código</b></td>
                        <td><b>Descrição</b></td>
                        <td><b>Valor</b></td>
                        
                    </tr>
                    {data.corpovenda.map((corpovenda) => (
                        <tr key={corpovenda.id}>
                        <td>{corpovenda.codpro}</td>
                        <td>{corpovenda.descripro}</td>
                        <td>{ValorDinheiro(corpovenda.valor_unitpro)}</td>
                        </tr>
                ))}
                    </tbody>
                </table>
            </Linha>
            <hr/>
            <Coluna>
                <Button onClick={() => setStep(step-1)}>Revisar</Button>
                <Button disabled={blockbutton} onClick={() => Enviar()}>Enviar</Button>
            </Coluna>
        </ContainerCreate>
        )
}

export default ResumoStep