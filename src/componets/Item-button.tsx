import React from 'react'
import {Button, IButtonProps, HamburgerIcon} from 'native-base'


interface Props extends IButtonProps {
    active: boolean
    Icon: React.ReactElement
    children: React.ReactNode
}

const ItemButton = ({active, Icon, children, ...props}: Props) => {

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
            leftIcon={Icon}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ItemButton


