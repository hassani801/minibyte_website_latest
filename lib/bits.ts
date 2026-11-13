// The minibyte logo is one byte: 01101101 = "m".
export const toBits = (n: number): number[] =>
  Array.from({ length: 8 }, (_, i) => (n >> (7 - i)) & 1);

export const charBits = (ch: string): number[] => toBits(ch.charCodeAt(0));

export const M_BITS = toBits(109); // 0 1 1 0 1 1 0 1
