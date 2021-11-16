function removeDollarSign(regEx) {
  if (regEx[regEx.length - 1] === '$') {
    return regEx.substr(0, regEx.length - 2);
  }

  return regEx;
}

function removeCarrot(regEx) {
  if (regEx[0] === '^') {
    return regEx.substr(1);
  }

  return regEx;
}

function getBody(regEx) {
  const bodyNoSlashes = regEx.substr(1, regEx.length - 2);
  const body = removeDollarSign(removeCarrot(bodyNoSlashes));

  return body;
}

//Auto add ^ and $ to regEx
//Needs to work with string and literal regEx
function makeFullMatch(regEx) {
  const stringRegEx = new RegExp(regEx).toString();
  const body = getBody(stringRegEx);

  return new RegExp(`^${body}$`);
}

export function regExValidator({ value, rule }) {
  const { regEx } = rule;

  if (!regEx) {
    return true;
  }

  const matcher = makeFullMatch(regEx);
  return matcher.test(value);
}
