import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'

import { Order, OrderProps } from '../components/Order'

export function Home() {
    const { colors } = useTheme();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([

    ]);

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
                />
            </HStack>
            <VStack flex={1} px={6}>
                {/* Itens dentro do HStack ficam um ao lado do outro */}
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus chamados
                    </Heading>
                    <Text color="gray.200">
                        3
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
                    renderItem={({ item }) => <Order data={item} />}
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
                    : "Solicitações finalizadas"} />

            </VStack>

        </VStack>
    );
}