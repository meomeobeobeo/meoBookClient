import {makeStyles} from '@mui/styles';


export default makeStyles((theme) => ({
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#111'
    },


    appBar: {
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: '#fff!important',
        height: '60px',
        textAlign: 'center',
        lineHeight: 46,
        boxShadow: 'none !important',
        borderBottom: '2px solid #ccc',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    title: {
        textDecoration: 'none',


    },
    toolBar: {


        justifyContent: 'space-between',
        margin: 'auto'


    },
    iconBar: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',


    },
    image: {
        marginLeft: '15px',
    },

}));