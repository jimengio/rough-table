/** Function from shared-utils */

function iterInterpose(acc: any[], xs: any[], sep: any): any[] {
  if (xs.length === 0) {
    return acc;
  } else if (acc.length === 0) {
    return iterInterpose([xs[0]], xs.slice(1), sep);
  } else {
    return iterInterpose(acc.concat([sep, xs[0]]), xs.slice(1), sep);
  }
}

// takes `[a, b, c]` and `sep`, returns `[a, sep, b, sep, c]`
export function interpose(xs: any[], sep: any): any[] {
  return iterInterpose([], xs, sep);
}
