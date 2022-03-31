/**
 * @owner BlueSky
 * @description Dozuki controller
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseController from "./base.controller";
import Dozuki from "../modules/dozuki";
import { Helper } from "../utils/helper.util";
import GuideTasks from "../modules/dozuki/tasks/guide.task";
import WorklogTasks from "../modules/dozuki/tasks/worklog.task";
import UserTasks from "../modules/dozuki/tasks/user.task";
import CategoryTasks from "../modules/dozuki/tasks/category.task";
// import { CustomResponse } from '../interfaces/custom-response.interface';

export default class DozukiController extends BaseController {
    dozuki: Dozuki;
    constructor(service: any) {
        super(service);
        this.dozuki = new Dozuki();
    }

    async pullCategories(req: Request, res: Response) {
        CategoryTasks.fetchAll();
        res.status(200).send({
            status: true, msg: `The Category fetching is in progress.`
        });
    }

    async pullGuides(req: Request, res: Response) {
        GuideTasks.fetchAll();
        res.status(200).send({
            status: true, msg: `The Guide fetching is in progress.`
        });
    }

    async pullWorklogs(req: Request, res: Response) {
        WorklogTasks.fetchAll();
        res.status(200).send({
            status: true, msg: `The Worklog fetching is in progress.`
        });
    }

    async pullGuideDaily(req: Request, res: Response) {
        GuideTasks.dailyFetch();
        res.status(200).send({
            status: true, msg: `The Guide is being fetched out on a daily basis.`, date: (new Date()).toDateString()
        });
    }

    async pullWorklogDaily(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);

        WorklogTasks.dailyFetch(date);
        res.status(200).send({
            status: true, msg: `The Worklog is being fetched out on a daily basis.`, date: date.toDateString()
        });
    }

    async sendWorklogDaily(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);
        WorklogTasks.dailyReport(date, { status: 'complete', cancelled: 0 });
        res.status(200).send({
            status: true, msg: `The Worklog email is being sent out on a daily basis.`, date: date.toDateString()
        });
    }

    async sendWorklogWeekly(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);
        WorklogTasks.weeklyReport(date, { cancelled: 0 });
        res.status(200).send({
            status: true, msg: `The Worklog email is being sent out on a weekly basis.`, date: date.toDateString()
        });
    }

    async updateInProgressWorklogDaily(req: Request, res: Response) {
        WorklogTasks.dailyInProgressFetch();
        res.status(200).send({
            status: true, msg: `The Worklog changes are being pulling to update on a daily basis.`, date: (new Date()).toDateString()
        });
    }

    async pullUsers(req: Request, res: Response) {
        UserTasks.fetchAll();
        res.status(200).send({
            status: true, msg: `The User fetching is in progress.`
        });
    }

    async updateFromLabelDaily(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);
        WorklogTasks.dailyUpdateFromLabel(date);
        res.status(200).send({
            status: true, msg: 'The Label is being daily updated to the Worklog.'
        });
    }

    async updateAllFromLabel(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const numOfRecords = criteria?.numOfRecords || 0;
        WorklogTasks.updateAllFromLabel(numOfRecords);
        res.status(200).send({
            status: true, msg: 'The Label is being all updated to the Worklog.'
        });
    }
    async getWorklogs(req: Request, res: Response) {
        const _searchParams: ISearchParams = this.getParameters(req);
        const result = await this.dozuki.worklog.getWorklogs(_searchParams);
        res.status(200).send(result);
    }
    async pullUserDaily(req: Request, res: Response) {
        UserTasks.dailyFetch();
        res.status(200).send({
            status: true, msg: `The User is being fetched out on a daily basis.`, date: (new Date()).toDateString()
        });
    }

    async pullCategoryDaily(req: Request, res: Response) {
        CategoryTasks.dailyFetch();
        res.status(200).send({
            status: true, msg: `The Category is being fetched out on a daily basis.`, date: (new Date()).toDateString()
        });
    }

    async sendWorklog2AcuDaily(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);
        WorklogTasks.dailyReport2Acu(date, { status: 'complete', cancelled: 0 });
        res.status(200).send({
            status: true, msg: `The Worklog-2-Acu email is being sent out on a daily basis.`, date: date.toDateString()
        });
    }

    async sendWorklog2AcuWeekly(req: Request, res: Response) {
        const criteria: any = this.getCriteria(req);
        const date = (new Date(criteria?.date)).toString() === 'Invalid Date' ? new Date() : new Date(criteria?.date);
        WorklogTasks.weeklyReport2Acu(date, { cancelled: 0 });
        res.status(200).send({
            status: true, msg: `The Worklog-2-Acu email is being sent out on a weekly basis.`, date: date.toDateString()
        });
    }

    private getCriteria(req: Request) {
        const { searchFields, options, ...others } = this.getParameters(req);
        const pagingOffset = Helper.getPagingOffset(options?.page, options?.limit);
        return { ...searchFields, ...pagingOffset, ...others };
    }
}