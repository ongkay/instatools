
import { TokenGenerator } from 'totp-generator-ts';


const getTotp = (token: string) => {
    const tokenku = token.replace(/ /g, '')
    const tokenGen = new TokenGenerator({
        period: 30,

    });
    const res = tokenGen.getToken(tokenku);
    console.log(res);

    return res

}

export default getTotp