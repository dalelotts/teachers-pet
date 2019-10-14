// Fisher–Yates Shuffle
function shuffle (array) {
  let remainingMembers = array.length

  // While there remain elements to shuffle…
  while (remainingMembers) {
    // Pick a remaining element…
    const index = Math.floor(Math.random() * remainingMembers--)

    // And swap it with the current element.
    const member = array[remainingMembers]
    array[remainingMembers] = array[index]
    array[index] = member
  }

  return array
}

module.exports = shuffle
