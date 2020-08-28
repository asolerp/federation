const Query = {

  // GET USER LOGED IN
  async event (info, args, context) {
    return await context.db.query.event({
      where: {
        id: context.event.id
      }
    }, info)
  },
}

module.exports = Query