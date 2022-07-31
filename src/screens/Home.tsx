import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center, Icon } from 'native-base';
import { SignOut, Barcode } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';


import Logo from '../assets/logo_secondary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'

import { Order, OrderProps } from '../components/Order'

export function Home() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: "1",
            patrimony: '12345',
            when: '24/07/2022 às 19:15',
            status: 'open',

        },
        {
            id: "2",
            patrimony: '12367',
            when: '06/07/2022 às 13:45',
            status: 'closed',

        }
    ]);

    function handleNewOrder() {
        navigation.navigate('new');
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId });
    }


    function handleLogout() {
        auth()
        .signOut()
        .catch(error => {
            console.log(error);
            Alert.alert('Sair', 'Erro ao sair.');
        });
    }


    return (
        /*Itens dentro do VStack ficam um ao abaixo do outro */
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={24} color={colors.gray[300]} />}
                    onPress={handleLogout}
                />
            </HStack>
            <VStack flex={1} px={6}>
                {/* Itens dentro do HStack ficam um ao lado do outro */}
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>
                    <Text color="gray.200">
                        {orders.length > 0 ? orders.length : ''}
                    </Text>
                </HStack>
                <HStack space={3} mb={8}>

                    <Filter
                        title="em andamento"
                        type="open"
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />

                    <Filter
                        title="finalizados"
                        type="closed"
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Sua lista Está vazia! {'\n'}
                                {statusSelected === 'open' ? 'Clique no botão abaixo para adicionar um chamado' : 'Clique no botão abaixo para ver os chamados finalizados'}

                            </Text>
                        </Center>
                    )}
                />
                <Button title={statusSelected === 'open'
                    ? "Nova solicitação"
                    : "Solicitações finalizadas"} onPress={handleNewOrder} icon={<Barcode size={30} color="white" />} />
                    
            </VStack>

        </VStack>
    );
}