class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          productName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    delete queryCopy['keyword']

    if (!queryCopy.singleOrigin){
        delete queryCopy["origin"]
    }
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    if (queryCopy.new) {
        this.query = this.query.find(JSON.parse(queryStr)).sort({createdAt: -1});
    }
    else {
        this.query = this.query.find(JSON.parse(queryStr))
    }

    return this;
  }
}

module.exports = ApiFeatures;