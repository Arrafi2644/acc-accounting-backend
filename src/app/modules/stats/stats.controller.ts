import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { StatsService } from './stats.service';

const getJoiningRequestStats = catchAsync(async (req: Request, res: Response) => {
    const data = await StatsService.getJoiningRequestStats();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successful.",
        data: data
    })
})


export const StatsController = {
    getJoiningRequestStats
}
