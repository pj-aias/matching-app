import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { NativeModules } from "react-native";

const { DistributedBbsModule } = NativeModules;

class AiasSigner {
    constructor({ usk, gpk, domains }) {
        this.usk = usk;
        this.gpk = gpk;
        this.domains = domains;
    }

    async sign(msg) {
        console.log("gpk: ", JSON.stringify(this.gpk));
        console.log("msg: ", JSON.stringify(msg));
        const res = await DistributedBbsModule.sign(msg, JSON.stringify(this.usk), JSON.stringify(this.gpk));

        console.log("signature: ", JSON.stringify(res));

        return res
    }
}


const saveAiasSigner = async (signer) => {
    const stringfy_and_save = async (name, data) => {
        await RNSecureStorage.set(name, JSON.stringify(data), {
            accessible: ACCESSIBLE.WHEN_UNLOCKED,
        });
    }

    console.log("signer: ", signer)

    await stringfy_and_save("usk", signer.usk);
    await stringfy_and_save("gpk", signer.gpk);
    await stringfy_and_save("domains", signer.domains);
}

const loadAiasSigner = async () => {
    const load_and_parse = async (name) => {
        const data = await RNSecureStorage.get(name)
        return JSON.parse(data)
    }

    const usk = await load_and_parse("usk");
    const gpk = await load_and_parse("gpk");
    const domains = load_and_parse("domains");

    return new AiasSigner({ usk, gpk, domains })
}


const generateAiasSignerFromRoute = (route) => {
    const result = JSON.parse(route.params.result.replace('?result=', ''));
    const usk = result.usk;
    const gpk = result.gpk;
    const domains = result.domains;

    return new AiasSigner({ usk, gpk, domains });
}

const AiasStorage = {
    saveAiasSigner,
    loadAiasSigner
};


export {
    AiasSigner,
    generateAiasSignerFromRoute,
    AiasStorage,
}
