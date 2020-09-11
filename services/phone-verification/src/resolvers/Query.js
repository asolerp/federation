const Query = {

  // GET Events
  async matches(info, args, { models: { Match } } ) {
    return await Match.find({})
  },

  // GET Event
  async match (info, args, { models: { Match } } ) {
    return Match.findById(args.id)
  },
}

module.exports = Query