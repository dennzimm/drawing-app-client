export const bem = (...args: any[]) =>
  args.reduce((out, x, i) => {
    out += x;

    if (i === args.length - 1) {
      return out;
    } else if (i === 0) {
      return (out += '--');
    }

    return (out += '-');
  }, '');
