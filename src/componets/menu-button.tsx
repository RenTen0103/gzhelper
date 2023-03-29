import React from 'react'
import {Button, Icon, IButtonProps, HamburgerIcon} from 'native-base'
import Icons from 'react-native-vector-icons/FontAwesome'

interface Props extends IButtonProps {
    active: boolean
    icon: string
    children: React.ReactNode
}

const MenuButton = ({active, icon, children, ...props}: Props) => {

    return (
        <Button
            size={"lg"}
            _light={{
                colorScheme: 'blue',
                _pressed: {
                    bg: 'primary.100'
                },
                _text: {
                    color: active ? 'blue.50' : 'blue.500'
                }
            }}
            _dark={{
                colorScheme: 'darkBlue',
                _pressed: {
                    bg: 'primary.600'
                },
                _text: {
                    color: active ? 'blue.50' : undefined
                }
            }}
            bg={active ? undefined : 'transparent'}
            variant="solid"
            justifyContent="flex-start"
            leftIcon={<HamburgerIcon name={icon} size="sm" opacity={0.5}/>}
            {...props}
        >
            {children}
        </Button>
    )
}

export default MenuButton
