import { useContext } from 'react';
import Swal from 'sweetalert2';
import { TokenErrorContext } from '../context/tokenErrorContext';

const RequireLoginAlert = () => {
    const {unSetError}=useContext(TokenErrorContext)


    Swal.fire({
        title: 'שגיאה באימות!',
        text: 'התחבר מחדש',
        icon: 'error',
        confirmButtonText: 'הבנתי',
    }).then(() => {
        unSetError(); git remote -v
      });
      

    return null;
};

export default RequireLoginAlert;