import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise = null

export const getFingerprint = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load()
  }
  
  const fp = await fpPromise
  const result = await fp.get()
  
  return result.visitorId
}
