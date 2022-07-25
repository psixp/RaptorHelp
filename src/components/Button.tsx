import { Button as ButtonNativeBase, IButtonProps, Heading, VStack, HStack } from 'native-base';



type Props = IButtonProps & {
    title: string;
    icon: any;
}

export function Button({ title, icon="", ...rest }: Props) {

    return (
        <ButtonNativeBase
            bg="green.700"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{bg: 'green.600'}}
            

            {...rest}
            >
            <HStack
            justifyContent="space-between"
            alignItems="center"
            space={2}
            >
            <Heading 
            color="white" 
            fontSize="sm" 
            rounded="sm"
            overflow="hidden" 
            alignItems="center"
            >
                {title}
                
            </Heading> 
                {icon}
            </HStack>
        </ButtonNativeBase>
    );
}