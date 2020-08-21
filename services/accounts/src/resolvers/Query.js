const Query = {
  async user (info, args, context) {
    return await context.db.query.user({
      where: {...args}
    },info)
  },
  async users(info, args, context) {
    return await context.db.query.users()
  }
}

module.exports = Query