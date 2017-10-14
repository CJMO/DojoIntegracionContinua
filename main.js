var guess = ['1','2','3','4'], ERROR = 'ERROR';
module.exports = {
  codeBreaker:function(number){
    let resultX = '', result_ = '';
    if(number === undefined)
      return ERROR;
    number = number.toString();
    if( isNaN(number) || number.indexOf('e') !== -1 || number.length !== 4)
      return ERROR;
    let auxNumber = number;
    number = number.split('');
    auxNumber = auxNumber.toString().split('');
    auxNumber = auxNumber.sort();
    for (let i = 0; i< number.length; i++) {
      //Validar numeros repetidos
      if(i<number.length-1 && auxNumber[i]===auxNumber[i+1])
        return ERROR;
      if(guess.indexOf(number[i]) !== -1) {
        if (guess[i] === number[i]) {
          resultX += 'X';
        }else{
          result_ += '_';
        }
      }
    }
    return resultX+result_;
  },

  setSecret:function(numero){
    guess = numero;
  }

}
