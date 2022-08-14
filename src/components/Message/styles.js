import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    header: {
        width: '100%',
        height: '60px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
    },
    userBox: {
        padding: '8px 24px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#ddd',

        }
    },
    nomalAvatar: {
        width: '58px!important',
        height: '58px!important',
    },
    ownMessage: {
      
        justifyContent: 'flex-end',
        

    },
    ownAvatar: {
        display: 'none!important'
    },
    ownContent: {
        backgroundColor: '#efefef',
        color: '#111',
        border : 'none!important',
    },
    ownIcon :{
        display : 'none!important'
    },
    ownReverse:{
        flexDirection :'row-reverse!important'
    },
    modal : {
        borderTop : '1px solid #ccc',
        padding :'10px 0px 10px 0px',
        cursor : 'pointer'

    },
    pressModal : {
        borderTop : '1px solid #ccc',
        padding :'10px 0px 10px 0px',

        backgroundColor: '#ccc',
        cursor : 'pointer'
    }
    




}));
