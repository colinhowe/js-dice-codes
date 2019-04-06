const makeStringHandler = (s) => {
  let currentPos = 0;

  return {
    peek: () => {
      while (s[currentPos] == ' ') {
        currentPos += 1;
      }
      return s[currentPos];
    },
    next: () => {
      currentPos += 1
      while (s[currentPos] == ' ') {
        currentPos += 1;
      }
    },
    empty: () => currentPos == s.length,
    pos: () => currentPos,
    all: () => s,
  }
}

const error = (code, c, handler) => {
  throw `${code}: Invalid character ${c} at position ${handler.pos()} in ${handler.all()}`;
};

const _number = (handler) => {
  let value = 0;
  let multiplier = 1;
  const startPos = handler.pos();
  
  if (handler.peek() == '-') {
    multiplier = -1;
    handler.next();
  }

  while (!handler.empty()) {
    const c = handler.peek();
    switch (c) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        value *= 10;
        value += parseInt(c);
        handler.next();
        break;
      default:
        if (startPos == handler.pos()) {
          // No numbers found at all, error
          error('E00', c, handler);
        }
        return value * multiplier;
    }
  }

  if (multiplier === -1 && startPos + 1 === handler.pos()) {
    // User just entered a - without anything else
    throw 'E04: Unexpected end of input';
  }

  return value * multiplier;
}

const _term = (handler) => {
  let c = handler.peek();
  let quantity = null;
  switch (c) {
    case 'd':
      quantity = 1;
      break;
    default:
      quantity = _number(handler);
  }

  if (handler.empty()) {
    return { constant: quantity };
  }

  c = handler.peek();
  switch (c) {
    case 'd':
      break;
    case '+':
      return { constant: quantity };
    case '-':
      return { constant: quantity };
    default:
      error('E01', c, handler);
  }
  handler.next();

  const die = _number(handler);

  return { die, quantity };
}

const _expr = (handler) => {
  const allDie = [];

  while (!handler.empty()) {
    const term = _term(handler);
    allDie.push(term)

    if (!handler.empty()) {
      const c = handler.peek();
      if (c !== '+' && c !== '-') {
        error('E02', c, handler);
      }
      if (c === '+') {
        // Don't skip the - as it forms part of the number
        handler.next();
      }
    }
  }

  return allDie;
}

export const parseDiceCode = (code) => {
  const handler = makeStringHandler(code);

  const expression = _expr(handler);

  return expression;
};
