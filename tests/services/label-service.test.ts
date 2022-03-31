/**
 * @owner BlueSky
 * @description Unit Test for Label Service
 * @since 1.0.0
 * @date Apr 04, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import LabelService from "../../app/services/label.service";
import LabelRepository from '../../app/repositories/label.repository';
import { connect, clearDatabase, closeDatabase } from "../database-handler";

describe("Unit Test for Label Service Module", () => {
    /**
     * Connect to a new in-memory database before running any tests.
     */
    beforeAll(async () => await connect());

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await clearDatabase());

    /**
     * Remove and close the db and server.
     */
    afterAll(async () => await closeDatabase());


    test("Insert a NEW label based on criteria", async (done) => {
        const service = new LabelService(new LabelRepository());
        const resp = await service.findAndInsert({
            custId: 'TEST',
            partNumber: 'TEST-PN',
            serialNumber: 'TEST-SN'
        }, null);
        expect(resp.status).toBe(true);
        done();
    });

});