module.exports = ({ config }) => {
    return {
        ...config,
        hooks: {
            android: {
                googleServicesFile: process.env.google_services,

            },
            extra: {
                firebaseServiceAccount: process.env.firebase_service_account,
            }
        }
    }
}

