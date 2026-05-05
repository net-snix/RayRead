export type ProofreadProvider = {
  proofread(input: string): Promise<string>;
};
