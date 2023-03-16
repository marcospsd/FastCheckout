import React from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const AlertText = ({ data, close }) => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

      
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        close();
      };

    return (

    <Snackbar open={data.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleClose} severity={data.tipoalert} sx={{ width: '100%' }}>
            {data.texto}
        </Alert>
    </Snackbar>


    )
}

export default AlertText