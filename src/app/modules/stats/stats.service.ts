import { JoinUsForm } from "../joinUsForm/joinUsForm.model";

const now = new Date();

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date(now);
sevenDaysAgo.setDate(now.getDate() - 7);

const thirtyDaysAgo = new Date(now);
thirtyDaysAgo.setDate(now.getDate() - 30);

const getJoiningRequestStats = async () => {
    const totalRequestPromise = JoinUsForm.countDocuments();

    const requestInTodayPromise = JoinUsForm.countDocuments({
        createdAt: { $gte: startOfToday }
    });

    const requestInLast7DaysPromise = JoinUsForm.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });

    const requestInLast30DaysPromise = JoinUsForm.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    });

    const [
        totalRequest,
        requestInToday,
        requestInLast7Days,
        requestInLast30Days
    ] = await Promise.all([
        totalRequestPromise,
        requestInTodayPromise,
        requestInLast7DaysPromise,
        requestInLast30DaysPromise
    ]);

    return {
        totalRequest,
        requestInToday,
        requestInLast7Days,
        requestInLast30Days
    };
};

export const StatsService = {
    getJoiningRequestStats
};
