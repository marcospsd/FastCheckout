import React from 'react'
import { Snackbar } from 'react-native-paper'

const AlertSnack = ({ open, text, setOpen}) => {


    return (
    <Snackbar
        wrapperStyle={{ top: 0}}
        elevation={5}
        duration={5000}
        visible={open.open}
        onDismiss={() => setOpen({...open, open: !open})}
        action={{
            label: 'Fechar',
            onPress: () => setOpen({...open, open:false}),
            textColor: 'white'
        }}

        >
        {text}
    </Snackbar>
    )
}

export default AlertSnack;