/**
 * @owner BlueSky
 * @description Define configuration for APP
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export const API_TOKEN_SECRET = "An API token secret used for JWT library";

export const GOOGLE_API = {
    CREDENTIAL: {
        type: "service_account",
        project_id: "peppy-breaker-196707",
        private_key_id: "6a424a609802c0ed73d054b809d9bc526498e3d6",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcPZUwhcEXcQOZ\nPrdxpgYtvg6sMIePduMtVHN+z4Yu8HxnM/RTT8Zf9eJu+VBAFLDEPF2bEr8XyFu2\nVE0Ku3uNa7G0HvfB4HsbbxsEpcQi9Y6xujJHPXmhFm7GpJQNT+IRQnaaEi+AjNGr\nevgtqxqbmwPwzYps/QAF4tNKq7x3hAcK8ZUhGo0o+b+UNAP6mYIzYLcqZEcEr8l/\nVQoaBc2bR8cIoG0zeQfdEmKum78L5Bb7wKg3mGf7AVAzo8ggknT93i+FaFV242nY\nT5XOMLwIVxfU4kIGdQLWfE0i2wlfYIU+EBVEVTEOvJwiMWSdYXlKqoOp0udWlkyh\nVoX9mlpFAgMBAAECggEARvITz5+8yWcxCiIXbIzGG3lE8l1rAPMsP0Ys17VmKeRb\nqQVHeZks7CAb/OZK0X5TshfzLVp62VLKimWHQktV1CbF35N8T1YesJtn+llHUdSN\nQhjZgc3hcAteq+bJr63Jaqrybg258jZ/cs146kva3jOqu2qp48mSfBm+dha7kszz\noEpVosh8EbycirDtb3wkB7HpPkwE5oMymB/D0TK6a79HV4pkgmqxAgKZau4YKaNj\nlSkVMeK28yugkuYdWs3piSjzZbjp6+eRPOufxeY3jK2XyOCQ/0RR6gFaSGoGDs0c\ni+ffCayi9f6eG+D8NBm4lMiqJCSh3O8MGFegn0wkFQKBgQDZT6f/i08fVbQ7L2/G\nBaY+9W/enbZ0Mgp6NRbxFGaLBlpsKw2Q+7S5UG35kNKHDWok+jKI34Gt3BiEYwv1\nOEEk6laTIZCINn0RkxiFCNg0PJRYDT0q/xI3bYEi+yfTcmedAqVFuVC3lltBAckx\nBoFVwDG6AoHWAC49q5HyE/gXEwKBgQC4DoZlRdewUfrJDkGjgU19PbNQLFrv9GjT\nNtl+IqaRG/zxGZ741vzWokoSnUCnebFlDxkpHeKs0oX5OPpNamAoXeb5Bh3hW2YN\nFLLSpe4HRI4SijY7POqKHWFtkNhTfDOSoz69q8uqyFf2Ecg2b5+N8KzgScr7QAys\nqkre6v68RwKBgQC3wFtWAf4NiPK1eQ8SaoSAiBjoLIOzDP0/CNU1VQLAW8bp4B3A\nkpXmfNQBSyw5dmZijg1dH2EQGiPBDd92ovKyvFQoZSFJjImE6tS46RmoUfE94zPt\nv3Ev3TBs2+J5MSvb3/jQVDqkgkb3WQM+qTmDwNhLaQNQaSawjvsBr1EAcQKBgHX/\nIdwFJZztQajp0dzfxWzYRH/On9Ibz6QxEsgRsNVwqv1qnocLVPbI/lHmrI9xre+K\n+WdpuGtxX+CBzb4Zx2G5qZzWdguGy+rw7R+srufL5IUwREo/6GD5Kv/SD02eX3XP\n4CY64Awx+mpPxhpX/2NA+6Oiy1W+HyIG3o8A+qR7AoGAJxqts55y+qJOAntu4OZy\n7MDwn0jAQR/aVZ+jOK3LQlGlYhDqjKaaqMIBt1pyA7RRih+Q7BgSd0hMf4T0I6Sd\nA1ZyC4yd1zxD/p9iXyKiSTjfJONJyDdO3LA8OFfR8AMOlgaW48cKBmVz3n4ZJWrl\nZL/xxRG64r64Fkp3fB75xmc=\n-----END PRIVATE KEY-----\n",
        client_email: "cciapi@peppy-breaker-196707.iam.gserviceaccount.com",
        client_id: "114816509016056849579",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/cciapi%40peppy-breaker-196707.iam.gserviceaccount.com"
    },
    SPREADSHEET: {
        FORTINET: {
            ID: '1kiyeWRonDsuTMSwbbxvuZrawlKk75fvkt7FefiWFirM',
            RANGE: 'A2:Z'
        }
    }
};