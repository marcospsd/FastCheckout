import React, { useState } from 'react';
import { telefone as numero, NameForma, ValorDinheiro } from '../../components/Functions/functions'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Tittle, ResumoCliente, Coluna, Linha, FormaPagamento, Produtos, ButtonList } from './styles'
import ListButtons from './Buttons';
import EditVenda from '../EditVenda'


const ViewVenda = ({ data, modal, setModal, mutate, setAtualizarVenda}) => {
    const [editModal, setEditModal] = useState(false)

    return (
        <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-create-venda'
            >
                { editModal ? <EditVenda 
                                open={editModal}
                                setOpen={setEditModal}
                                mutate={mutate}
                                initState={data}
                                setAtualizarVenda={setAtualizarVenda}
                                /> : null}
                <Tittle>
                    <p><strong>RESUMO DA VENDA</strong></p>
                </Tittle>
                <ResumoCliente>
                    <Linha>
                        <Coluna>
                            <label><strong>Ordem: </strong>{data.ordem}</label>
                            <label><strong>CPF: </strong>{(data.cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</label>
                        </Coluna>
                        <Coluna>
                            <label><strong>Vendedor: </strong> {data.vendedorname.first_name.split(' ').slice(0, 1).join(' ')}</label>
                            <label><strong>Total da Venda: </strong>{ValorDinheiro(data.total_venda)}</label>
                        </Coluna>
                    </Linha>
                    <label className='dadoscli'><strong>Nome: </strong> {data.dadoscliente.nome}</label>
                    <label className='dadoscli'><strong>E-mail: </strong> {data.dadoscliente.email}</label>
                    <label className='dadoscli' id="dadosclifinal"><strong>Telefone: </strong> {numero(data.dadoscliente.telefone)}</label>
                    <br/>
                </ResumoCliente>
        
                <FormaPagamento>
                    <p><strong>FORMA DE PAGAMENTO</strong></p>
                    <table>
                        <tbody>
                        <tr id='formatitle'>
                            <td><b>Formas de Pag.</b></td>
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
                    <br/>
                </FormaPagamento>
                <Produtos>
                    <p><strong>PRODUTOS</strong></p>
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
                                <td id={corpovenda.complementos.reposicao == true ? 'reposicao' : null}>{corpovenda.descripro} {corpovenda.complementos.reposicao == true ? '---   Best Seller  ---' : null}</td>
                                <td>{ValorDinheiro(corpovenda.valor_unitpro)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/>
                </Produtos>
                    <br/>
                <ButtonList>
                       <ListButtons
                            data={data}
                            mutate={mutate}
                            setOpen={setModal}
                            setEditModal={setEditModal}
                            
                       />
                </ButtonList>
                {/* <div id='opcoes'>
                    { ButtonCorreto(data) }
                    <ModalEdit open={openedit} setOpenEdit={setOpenEdit} openedit={openedit} value={data} criarvenda={criarvenda}/>
                </div> */}
             </Box>
        </Modal>
    
        )
}

export default ViewVenda