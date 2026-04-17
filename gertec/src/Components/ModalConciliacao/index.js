import { Modal, HStack, VStack, Text, Button, ButtonText, ModalBackdrop, ModalContent, ModalHeader, Heading, ModalCloseButton,
    Icon, CloseIcon, ModalBody, Input,
    InputField
  } from "@gluestack-ui/themed"

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { api  } from "../../Services/api";


const ModalConciliacao = ({openModal, closeModal, data, setData, BuscarVenda }) => {

    const AtualizarItem = async () => {
        const configPatch = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
        api.patch(`/vendas/formavenda/${data.id}/`, {
            ...data,
            atualizar_registro: true
        }, configPatch)
            .then((res) => {
                BuscarVenda()
                closeModal()
            })
    }
     

    return (
        <Modal 
            isOpen={openModal}
            onClose={closeModal}
            size='full'
            >
            <ModalBackdrop />
                    <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">Recebimentos no PinPad</Heading>
                        <ModalCloseButton>
                        <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack
                            gap={10}
                            >
                            <HStack 
                                justifyContent='space-between'>
                                <Text>NSU Host</Text>
                                <Input
                                    w={"60%"}   
                                    >
                                    <InputField 
                                    value={data.nsu_host}
                                    onChangeText={(text) => setData({...data, nsu_host: text})}
                                    placeholder="Digite o NSU HOST" 
                                    keyboardType="numeric"/>            
                                </Input>
                            </HStack>
                            <HStack
                                justifyContent='space-between'
                                >
                                <Text>NSU Sitef</Text>
                                <Input
                                    w={"60%"}   
                                    >
                                    <InputField 
                                    value={data.nsu_sitef}
                                    onChangeText={(text) => setData({...data, nsu_sitef: text})}
                                    placeholder="Digite o NSU SITEF" 
                                    keyboardType="numeric"/>            
                                </Input>
                            </HStack>
                            <HStack justifyContent='space-between'>
                                <Text>Autorização</Text>
                                <Input
                                    w={"60%"}   
                                    >
                                    <InputField 
                                    value={data.autorizacao}
                                    onChangeText={(text) => setData({...data, autorizacao: text})}
                                    placeholder="Digite a Autorização" 
                                    keyboardType="numeric"/>            
                                </Input>
                            </HStack >
                            <HStack justifyContent='space-between'>
                                <Text>Bandeira</Text>
                                <Input
                                    w={"60%"}   
                                    >
                                    <InputField 
                                    value={data.bandeira}
                                    onChangeText={(text) => setData({...data, bandeira: text})}
                                    placeholder="Digite a Bandeira" 
                                    keyboardType="numeric"/>            
                                </Input>
                            </HStack>
                        <Button
                            alignSelf='center'
                            w={'50%'}
                            bgColor={'$dinizred'}
                            gap={10}
                            onPress={AtualizarItem}
                            >
                            <ButtonText>Atualizar</ButtonText>
                            <FontAwesome name="refresh" size={20} color="white" />
                        </Button>
                    </VStack>
                    </ModalBody>
                </ModalContent>
        </Modal>
    )
}

export default ModalConciliacao;