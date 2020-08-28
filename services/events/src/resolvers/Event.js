const Event = {
  _resolveReference(object) {
    let events
    return events.find((event) => event.id === object.id ) 
  }
}

export default Event