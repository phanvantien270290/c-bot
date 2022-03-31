/**
 * @owner BlueSky
 * @description Define Google API handler for APP
 * @since 1.0.0
 * @date Aug 30, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 * 
 * 
 * @ref https://github.com/gsuitedevs/node-samples 
 *      https://developers.google.com/sheets/api/guides/concepts
 */

import fs from 'fs';
import readline from 'readline';
import { google, Auth } from 'googleapis';
import { GOOGLE_API } from '../../config/app.config';
import { Logger } from '../../utils/logger.util';

export default class GoogleAPI {
    // If modifying these scopes, the token will be changed
    private scopes: Array<string> = [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        // 'https://www.googleapis.com/auth/documents.readonly'
    ];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first time.
    private TOKEN_PATH: string = '../../config/google-api/token.json';
    private jwt: Auth.JWT;
    constructor() {
        this.jwt = new google.auth.JWT(
            GOOGLE_API.CREDENTIAL.client_email,
            null,
            GOOGLE_API.CREDENTIAL.private_key,
            this.scopes,
            null
        );
    }

    private async getAccessToken() {
        const jwtClient = new google.auth.JWT(
            GOOGLE_API.CREDENTIAL.client_email,
            null,
            GOOGLE_API.CREDENTIAL.private_key,
            this.scopes,
            null
        );
        return await jwtClient.authorize();
    }


    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     */
    async authorize(credentials: any) {
        const { client_secret, client_id } = credentials;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);

        const token: Auth.Credentials = await this.getAccessToken();
        oAuth2Client.setCredentials(token);
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getNewToken(oAuth2Client: Auth.OAuth2Client, callback: Function) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });
        console.log('Auth URL generated', authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    return console.error('Error while trying to retrieve access token', err);
                }

                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
                callback(oAuth2Client);
            });
        });
    }

    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    getSpreadsheet(spreadsheetId: string, sheetName: string = 'Sheet 1', range: string = 'A1:Z', majorDimension = 'ROWS') {
        return new Promise(resolve => {
            const sheets = google.sheets({ version: 'v4', auth: this.jwt });
            sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!${range}`,
                majorDimension
            }, (err, res) => {
                if (err) {
                    Logger.error(err);
                }
                resolve(res);
            });
        });
    }

    /**
     * Prints the title of a sample doc:
     * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
     */
    getDocument(documentId: string) {
        return new Promise(resolve => {
            const docs = google.docs({ version: 'v1', auth: this.jwt });
            docs.documents.get({
                documentId,
            }, (err, res) => {
                if (err) {
                    Logger.error(err);
                }
                resolve(res);
            });
        });
    }
}