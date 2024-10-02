async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashPassword(password: string): Promise<string> {
  return sha256(password);
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  const hashedPassword = await sha256(password);
  return hash === hashedPassword;
}
