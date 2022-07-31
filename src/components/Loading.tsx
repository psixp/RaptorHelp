import { Center, Spinner, Image} from 'native-base'


export function Loading() {
    return (
        <Center flex={1} bg="gray.700">
            {/* <Spinner color="secundary.700" /> */}
            <Image
            source={require('../assets/logo-gif_4_semFundo.gif')}
            style={{ width: 50, height: 50 }}
             />
        </Center>
    )
}