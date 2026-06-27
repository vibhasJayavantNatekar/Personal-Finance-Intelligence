const { getHealthInsights } = require("../Services/healthInsight.service");
const apiResponse = require("../Utils/apiResponse");

const healthInsights = async (req, res, next) => {

    try {

        const data = await getHealthInsights(req.user.id)

        res.status(200).json(

            apiResponse(
                true,
                "Financial Health Insights fetched successfully",
                data
            )

        )

    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while fetching info.."
        }

        next(err)

    }

}

module.exports = {healthInsights}