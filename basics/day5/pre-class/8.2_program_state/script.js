var mode = 'green';

var main = function (input) {
  if (input == 'greenmode') {
    mode = 'green';
  } else if (input == 'bluemode') {
    mode = 'blue';
  } else if (input == 'redmode') {
    mode = 'red';
  }

  var myOutputValue =
    'A fool sees not the same tree that a wise man sees. -William Blake';

  if (mode == 'blue') {
    myOutputValue =
      'The sea, once it casts its spell, holds one in its net of wonder forever. -Jacques Cousteau';
  }
  if (mode == 'red') {
    myOutputValue = `Don't waste your time on jealousy; sometimes you're ahead, sometimes you're behind. The race is long, and in the end, it's only with yourself – Baz Luhrmann`;
  }

  return myOutputValue;
};