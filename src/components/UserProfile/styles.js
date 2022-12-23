import {makeStyles} from "@mui/styles";

export default makeStyles((theme) => ({
    activeStatus: {
        borderTop: '2px solid gray'
    },
    modal: {
        borderTop: '1px solid #ccc',
        padding: '10px 0px 10px 0px',
        cursor: 'pointer'

    },
    pressModal: {
        borderTop: '1px solid #ccc',
        padding: '10px 0px 10px 0px',

        backgroundColor: '#ccc',
        cursor: 'pointer'
    }


}))