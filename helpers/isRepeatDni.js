const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

  /*    Matcher matcher = mask.matcher(value);

    if(!matcher.matches()){
        return false;
    }
*/
       const  dni = value.substring(0,8);
       const  control = value.substring(8,9);
       const  letters = "TRWAGMYFPDXBNJZSQVHLCKE";
       const  position = Integer.parseInt(dni)%23;

       const  controlCalculated = letters.substring(position,position+1);

    if(!control.equalsIgnoreCase(controlCalculated)){
        return false;
    }
    return true;

}



module.exports = { isDate };


