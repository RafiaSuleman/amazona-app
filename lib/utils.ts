/* eslint-disable @typescript-eslint/no-explicit-any */
export const round2 = (num: number) => Math.round((num + Number.EPSILON) * 100) /100

export function convertDocToObj(doc: any) {
    if (doc._id) {
      doc._id = doc._id.toString();
    } else {
      console.warn('doc._id is undefined');
    }
    return doc;
  }