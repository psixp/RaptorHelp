import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({ title, description, footer = undefined , icon: Icon, children }: Props) {
    const { colors } = useTheme();
    return (
        <VStack bg="gray.600" p={5} mt={5} rounded="sm" >
            <HStack alignItems="center" justifyContent="space-between" mb={4}>
                <Icon color={colors.primary[700]} />
                <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                    {title}
                </Text>
            </HStack>

            {
                !!description &&
                <Text color="gray.200" fontSize="md">
                    {description}
                </Text>
            }

            {children}

            {
                !!footer &&
                <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
                    <Text color="gray.200" fontSize="md">
                        {footer}
                    </Text>
                </Box>
            }
        </VStack>
    );
}