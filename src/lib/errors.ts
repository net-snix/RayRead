export class ProofreadError extends Error {
  readonly title: string;

  constructor(title: string, message?: string) {
    super(message ? `${title}: ${message}` : title);
    this.title = title;
  }
}

export function toProofreadError(error: unknown): ProofreadError {
  if (error instanceof ProofreadError) {
    return error;
  }

  if (error instanceof Error) {
    return new ProofreadError("Proofread failed", error.message);
  }

  return new ProofreadError("Proofread failed", "Unknown error");
}
