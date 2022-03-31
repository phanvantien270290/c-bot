/**
 * Why we need MongoDB Memory Server?
 * This is because when you run your unit test, 
 * you wouldn’t want your unit test dummy date to be saved into your real database. 
 * Thus, MongoDB memory server provides you the ability to store your data 
 * in memory only.
 */
module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.0.3', // Version of MongoDB
            skipMD5: true
        },
        autoStart: false
    }
};