import md5 from "md5"

export const createHash = (
  ts: string,
  privateKey: string,
  publicKey: string
) => {
  return md5(`${ts}${privateKey}${publicKey}`)
}
