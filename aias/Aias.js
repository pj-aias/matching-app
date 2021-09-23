import RNSecureStorage from "rn-secure-storage";
import { NativeModules } from "react-native";

const { DistributedBbsModule } = NativeModules;

class AiasSigner {
    constructor({ usk, gpk, domains }) {
        this.usk = usk;
        this.gpk = gpk;
        this.domains = domains;

        console.log("usk: ", usk);
        console.log("domains: ", domains);
    }

    async sign(msg) {
        return await DistributedBbsModule.sign(msg, JSON.stringify(this.usk), JSON.stringify(this.gpk));
    }
}


const saveAiasSigner = async ({ usk, gpk, domains }) => {
    await RNSecureStorage.set("usk", JSON.stringify(usk));
    await RNSecureStorage.set("gpk", JSON.stringify(gpk));
    await RNSecureStorage.set("domains", JSON.stringify(domains));
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
