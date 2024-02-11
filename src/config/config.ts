class config {
    public static getConfig() {
        return {
            applicationId: process.env.APPLICATION_ID,
            publicKey: process.env.PUBLIC_KEY,
        };
    }
}

export default config;
