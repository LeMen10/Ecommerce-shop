class LoadMoreController {
    async show(req, res) {
        var limit = 2;
        var startFrom = parseInt(req.fields.startFrom);
        var users = await database.collection("user").find({})
            .sort({ "id": -1 })
            .skip(startFrom)
            .limit(limit)
            .toArray();
        res.json(users)
        // res.render('news')
    }
}

module.exports = new LoadMoreController();