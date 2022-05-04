const findMiddleware = (item) => {
    return async (req, res, next) => {
        let foundItem

        try {
            foundItem = await item.findById(req.params.id)
            res.foundItem = foundItem
            if (foundItem == null) {
                return res.status(404).json({message: "Not found"})
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    
        next()
    }
}

module.exports = findMiddleware