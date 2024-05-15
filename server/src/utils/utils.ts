import bcrypt from 'bcrypt'

export class Utils {
  public async generateHashToken(req1: any, req2: any, req3: any) {
    const tokenScript = `${req1}${req2}${req3}`
    const token = await bcrypt.hash(tokenScript, 10)

    const cleanToken = token.replace(/\//g, '')
    return cleanToken
  }
  public async generateHashPassword(password: any) {
    return await bcrypt.hash(password, 10)
  }
  public async comparePassword(password1: any, password2: any) {
    return await bcrypt.compare(password1, password2)
  }
}
