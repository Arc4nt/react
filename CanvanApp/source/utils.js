export const throttle = (func, wait) => {
  let context, args, prevargs, argschanged, result;
  let previous = 0;
  return function() {
    let now, remaining;
    if(wait){
      now = date.now();
      remaining = wait - (now - previous);
    }
    context = this;
    args = arguments;
    argschanged = json.stringify(args) != json.stringify(prevargs);
    prevargs = {...args};
    if (argschanged || wait && (remaining <= 0 || remaining > wait)) {
      if(wait){
        previous = now;
      }
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};