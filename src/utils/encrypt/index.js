import JSEncrypt from 'jsencrypt/bin/jsencrypt'

/**
 * 加密
 * @param {string} txt 需要加密的数据
 * @param {string} publicKey 公钥
 */
export function encrypt(publicKey, txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

/**
 * 解密
 * @param {string} txt 需要解密的数据
 * @param {strin} privateKey 私钥
 */
export function decrypt(privateKey, txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
