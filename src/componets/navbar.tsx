import React, {useCallback} from 'react'
import {HamburgerIcon, HStack, IconButton} from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'

const NavBar = () => {
    const navigation = useNavigation<DrawerNavigationProp<{}>>()
    const handlePressMenuButton = useCallback(() => {
        navigation.openDrawer()
    }, [navigation])

    return (
        <HStack w="full" alignItems="center" alignContent="center" p={4}>
            <IconButton
                onPress={handlePressMenuButton}
                borderRadius={100}
                _icon={{
                    as: () => <HamburgerIcon/>,
                    name: 'menu',
                    size: 6,
                    color: 'white'
                }}
            />
        </HStack>
    )
}

export default NavBar
