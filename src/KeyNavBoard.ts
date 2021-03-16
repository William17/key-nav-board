type Element = any
export enum Direction {
  up = 'up',
  left = 'left',
  down = 'down',
  right = 'right'
}
const keysMap = {
  [Direction.up]: {
    head: 'x1',
    right: 'y2',
    foot: 'x2',
    left: 'y1'
  },
  [Direction.right]: {
    head: 'y1',
    right: 'x2',
    foot: 'y2',
    left: 'x1'
  },
  [Direction.down]: {
    head: 'x1',
    right: 'y2',
    foot: 'x2',
    left: 'y1'
  },
  [Direction.left]: {
    head: 'y1',
    right: 'x2',
    foot: 'y2',
    left: 'x1'
  }
}

const OppositeDirection = {
  [Direction.up]: Direction.down,
  [Direction.down]: Direction.up,
  [Direction.left]: Direction.right,
  [Direction.right]: Direction.left
}

type Coordinates = {
  x1: number
  x2: number
  y1: number
  y2: number
}

type CoordinateKeys = {
  head: keyof Coordinates
  foot: keyof Coordinates
  left: keyof Coordinates
  right: keyof Coordinates
}

export class NavItem {
  static ID = 1
  id: string
  el: Element
  boardId?: string
  prev?: NavItem
  next?: NavItem;
  fromItem?: NavItem
  fromDirection?: Direction
  constructor(el: Element) {
    this.el = el
    this.id = 'item-' + NavItem.ID++
  }
  // toJSON () {
  //   return this.id
  // }
}

export type KeyNavBoardConstructorOptions = {
  remember?: boolean
}

export class KeyNavBoard {
  static id = 1
  id: string
  remember: boolean
  activeItem: NavItem | null
  listHead: NavItem | undefined
  listTail: NavItem | undefined
  constructor(options: KeyNavBoardConstructorOptions = {}) {
    const { remember } = options
    this.id = 'board-' + KeyNavBoard.id++
    this.activeItem = null
    this.remember = remember || false
  }
  addItem(item: NavItem) {
    const { id, listTail } = this
    if (item.boardId !== id) {
      item.boardId = id
      if (listTail) {
        listTail.next = item
        item.prev = listTail
        this.listTail = item
      } else {
        this.listHead = item
        this.listTail = item
      }
    }
  }
  removeItem(item: NavItem) {
    if (item.boardId === this.id) {
      item.boardId = undefined
      const { prev, next } = item
      if (!prev) {
        // it's head
        if (!next) {
          // it's tail
          this.listHead = undefined
          this.listTail = undefined
        } else {
          // it's not tail
          this.listHead = next
          next.prev = undefined
        }
      } else {
        // it's not head
        if (!next) {
          // it's tail
          this.listTail = prev
          prev.next = undefined
        } else {
          // it's not tail
          prev.next = next
          next.prev = prev
        }
      }
      item.prev = undefined
      item.next = undefined
    }
  }
  setActiveItem(item: NavItem) {
    if (item.boardId === this.id) {
      this.triggerDeactive(this.activeItem)
      this.activeItem = item
      this.triggerActive(item)
    }
  }
  triggerActive(item: NavItem | null) {
    if (item) {
      item.el.focus()
    }
  }
  triggerDeactive (item: NavItem | null) {
    if (item) {
      item.el.blur()
    }
  }
  getActiveItem() {
    return this.activeItem
  }
  getCoordinates(item: Element): Coordinates {
    const { x, y, width, height } = item.getBoundingClientRect()
    return { x1: x, x2: x + width, y1: y, y2: y + height }
  }
  getMatchResult(
    currentItem: NavItem,
    direction: Direction,
    memoryItem?: NavItem
  ): NavItem | null {
    let bestItem = null
    let bestIntersectionVal = -Infinity
    let bestDistance: number = Infinity
    let bestItemHead: number = Infinity
    const keys = keysMap[direction] as CoordinateKeys
    const isRightOrDown = direction === Direction.right || direction === Direction.down
    const id = currentItem.id
    const coordinates = this.getCoordinates(currentItem.el)
    const head = coordinates[keys.head]
    const right = coordinates[keys.right]
    const foot = coordinates[keys.foot]
    const left = coordinates[keys.left]
    // tslint:disable-next-line
    let node = this.listHead
    while (node) {
      const item = node
      node = item.next
      const itemId = item.id
      if (itemId === id) {
        // skip self
        continue
      }
      const itemCoordinates = this.getCoordinates(item.el)
      const itemHead = itemCoordinates[keys.head]
      const itemRight = itemCoordinates[keys.right]
      const itemFoot = itemCoordinates[keys.foot]
      const itemLeft = itemCoordinates[keys.left]
      const distance = isRightOrDown ? (itemLeft - right) : (left - itemRight)
      if (distance >= 0) {
        // 总体思路
        // 有重叠里面找距离最近的
        // 如果没有重叠的，就找距离最近的
        if (memoryItem && memoryItem.id === itemId) {
          bestItem = item
          break
        }
        // intersectionVal > 0 才被认定为有重叠
        const intersectionVal = this.getIntersectionVal(head, foot, itemHead, itemFoot)
        if (bestIntersectionVal > 0) {
          // 已经找到一个有重叠的
          // 如果现在这个没有重叠， 或者有重叠，但是距离比当前有重叠的远，则跳过
          if (intersectionVal <= 0 || (distance > bestDistance)) {
            continue
          }
          if (distance === bestDistance) {
            // 距离一样，看谁的重叠多
            if (intersectionVal < bestIntersectionVal) {
              continue
            }
            // 距离一样，重叠也一样，看谁排在先头
            if (intersectionVal === bestIntersectionVal && itemHead >= bestItemHead) {
              continue
            }
          }
        } else {
          // 没找到重叠的，当前这个也没重叠，而且距离比较远，则跳过
          if (distance > bestDistance && intersectionVal <= 0 ) {
            continue
          }
        }
        bestIntersectionVal = intersectionVal
        bestDistance = distance
        bestItemHead = itemHead
        bestItem = item
      }
    }
    return bestItem
  }
  getIntersectionVal(head: number, foot: number, itemHead: number, itemFoot: number) {
    //       itemHead
    //
    //       itemFoot
    // head
    //
    // foot
    if (itemFoot <= head) {
      return -(head - itemFoot)
    }
    // head
    //       itemHead
    //
    //       itemFoot
    // foot
    if (head <= itemHead && itemFoot <= foot) {
      return itemFoot - itemHead
    }
    //       itemHead
    // head
    //
    //       itemFoot
    // foot
    if (head <= itemFoot && itemFoot <= foot) {
      return itemFoot - head
    }
    // head
    //
    // foot
    //       itemHead
    //
    //       itemFoot
    if (foot <= itemHead) {
      return -(itemHead - foot)
    }
    // head
    //
    //       itemHead
    // foot
    //       itemFoot
    if (head <= itemHead && itemHead <= foot) {
      return foot - itemHead
    }
    //       itemHead
    // head
    //
    // foot
    //       itemFoot
    return foot - head
    
  }
  navigate(direction: Direction) {
    const remember = this.remember
    const activeItem = this.getActiveItem()
    if (!activeItem) {
      return
    }
    const { fromDirection, fromItem } = activeItem
    const memoryItem = remember
      ? fromDirection && direction === OppositeDirection[fromDirection]
        ? fromItem
        : undefined
      : undefined
    const nextActiveItem = this.getMatchResult(activeItem, direction, memoryItem)
    if (nextActiveItem && nextActiveItem !== activeItem) {
      activeItem.fromDirection = undefined
      activeItem.fromItem = undefined
      nextActiveItem.fromDirection = direction
      nextActiveItem.fromItem = activeItem
      this.setActiveItem(nextActiveItem)
    }
  }
}
