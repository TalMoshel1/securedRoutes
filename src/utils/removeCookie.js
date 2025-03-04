import Cookies from 'js-cookie';

export function removeCookie(){
   return Cookies.remove('token');
}