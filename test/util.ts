export function linkedListContains(linkedList: any, target: any) {
  if (!linkedList) {
    return false
  }
  let item = linkedList
  while (item) {
    if (item === target) {
      return true
    }
    item = item.next
  }
  return false
}
export function linkedListLength(linkedList: any) {
  let item = linkedList
  let length = 0
  while (item) {
    length++
    item = item.next
  }
  return length
}