import { useState } from 'react';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');


    const navigation = useNavigation();

    function handleNewOrderRegister() {
        if (!patrimony || !description) {
            return Alert.alert('Cadastrar', 'Informe o patrimônio e a descrição.');
        }


        setIsLoading(true);

        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert('Solicitação', 'Ordem cadastrada com sucesso.');
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                Alert.alert('Solicitação', 'Erro ao cadastrar ordem.');
            });
    }
    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova Solicitação" />

            <Input
                placeholder='Nº do patrimônio'
                mt={4}
                onChangeText={setPatrimony}
            />
            <Input
                placeholder="Descrição do problema"
                flex={1}
                mt={5}
                multiline
                textAlignVertical="top"
                onChangeText={setDescription}
            />

            <Button title="Cadastrar" icon
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />
        </VStack>
    );
}