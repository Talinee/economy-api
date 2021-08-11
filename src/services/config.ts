/* eslint-disable @typescript-eslint/camelcase */
import merge from 'lodash.merge'
import fs from 'fs'

const environment = process.env.API_ENV || 'local'

const config = {
    environment,
    name: 'economy',
    api: {
        port: 80,
    },
    database: {
        username: '',
        password: '',
        host: 'mongodb.economy',
        port: 27017,
        database: 'economy',
        collectionPrefix: 'economy',
    },
    auth: {
        expires: {
            accessToken: 100 * 10 * 15,
            refreshToken: 100 * 50 * 10,
        },
    },
    email: {
        expires: {
            token: 5 * 60,
        },
    },
    session: {
        expires: {
            sessionToken: 60,
        },
        key: {
            private: '0914a56d0f89c978b949202f1bcc9bc677ce7e0beb11a556c0d49e5eae4baaeb',
            public: 'ah',
        },
        jwt: {
            issuer: 'economy',
        },

    },

}

const runtimeConfig = {
    name: process.env['NAME'],
    api: {
        port: process.env['API_GRAPHQL_PORT'],
    },
    auth: {
        expires: {
            accessToken: process.env['AUTH_EXPIRES_ACCESS_TOKEN'],
            refreshToken: process.env['AUTH_EXPIRES_REFRESH_TOKEN'],
        },
        key: {
            private: process.env['AUTH_KEY_PRIVATE'],
            public: process.env['AUTH_KEY_PUBLIC'],
        },
        jwt: {
            issuer: process.env['AUTH_JWT_ISSUER'],
            algorithm: process.env['AUTH_JWT_ALGORITHM'],
        },
    },
    database: {
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        host: process.env['DATABASE_HOST'],
        port: process.env['DATABASE_PORT'],
        database: process.env['DATABASE_NAME'],
        collectionPrefix: process.env['DATABASE_PREFIX'],
    },
    smtp: {
        email: process.env['SMTP_EMAIL'],
        host: process.env['SMTP_HOST'],
        port: process.env['SMTP_PORT'],
        secure: process.env['SMTP_SECURE'],
        username: process.env['SMTP_USERNAME'],
        password: process.env['SMTP_PASSWORD'],
    },
}

const environmentConfig = {
    local: {
        api: {
            port: 4000,
        },
        smtp: {
            email: 'chubbytoey.test@gmail.com',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            username: 'chubbytoey.test@gmail.com',
            password: 'test12345+',
        },
    },
    development: {
    },
    production: {
        smtp: {
            email: 'chubbytoey.test@gmail.com',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            username: 'chubbytoey.test@gmail.com',
            password: 'test12345+',
        },
    },
}


const mergeConfig = (baseConfig, replaceConfig): void => {
    Object.keys(baseConfig).map(key => {
        if (replaceConfig[key] !== undefined) {
            if (baseConfig[key] instanceof Object) {
                baseConfig[key] = merge(baseConfig[key], replaceConfig[key])
            }
            else {
                baseConfig[key] = replaceConfig[key]
            }
        }
    })
}

mergeConfig(config, environmentConfig[environment])
mergeConfig(config, runtimeConfig)

export default config
