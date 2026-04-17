import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '../ui/modal';
import { HStack } from '../ui/hstack';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import { Button, ButtonText } from '../ui/button';
import { Heading } from '../ui/heading';
import { Input, InputField } from '../ui/input';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { api } from "../../Services/api";


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
                    <Heading className="text-lg font-semibold">Recebimentos no PinPad</Heading>
                    <ModalCloseButton>
                        <AntDesign name="close" size={18} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack className="gap-[10px]">
                        <HStack className="justify-between">
                            <Text>NSU Host</Text>
                            <Input className="w-[60%]">
                                <InputField
                                    value={data.nsu_host}
                                    onChangeText={(text) => setData({...data, nsu_host: text})}
                                    placeholder="Digite o NSU HOST"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </HStack>
                        <HStack className="justify-between">
                            <Text>NSU Sitef</Text>
                            <Input className="w-[60%]">
                                <InputField
                                    value={data.nsu_sitef}
                                    onChangeText={(text) => setData({...data, nsu_sitef: text})}
                                    placeholder="Digite o NSU SITEF"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </HStack>
                        <HStack className="justify-between">
                            <Text>Autorização</Text>
                            <Input className="w-[60%]">
                                <InputField
                                    value={data.autorizacao}
                                    onChangeText={(text) => setData({...data, autorizacao: text})}
                                    placeholder="Digite a Autorização"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </HStack>
                        <HStack className="justify-between">
                            <Text>Bandeira</Text>
                            <Input className="w-[60%]">
                                <InputField
                                    value={data.bandeira}
                                    onChangeText={(text) => setData({...data, bandeira: text})}
                                    placeholder="Digite a Bandeira"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </HStack>
                        <Button
                            className="self-center w-[50%] bg-[#c52f33] gap-[10px]"
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
