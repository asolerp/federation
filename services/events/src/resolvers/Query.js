const Query = {

  // GET Events
  async events(info, args, context) {
    return await context.db.query.events({},info)
  },

  // GET Event
  async event (info, args, context) {
    return await context.db.query.event({
      where: {
        id: args.id
      }
    }, info)
  },
}

module.exports = Query