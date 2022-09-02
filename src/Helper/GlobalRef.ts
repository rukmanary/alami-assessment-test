export interface GlobalRefObject {
  [key: string]: any;
}

const ref: GlobalRefObject = {};

export const setRef = (key: string, value: any) => {
  ref[key] = value;
};

export const getRef = ref;

export const callRef = (key: string) => {
  if (typeof ref[key]) {
    return ref[key];
  }
};
