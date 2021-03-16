import { KeyNavBoard, NavItem, Direction } from '../src'
import Element from './Element'
import { linkedListContains, linkedListLength } from './util'

function createNavItem(options: any) {
  return new NavItem(new Element(options))
}

test('instantiation', () => {
  const nav = new KeyNavBoard()
  expect(nav).toBeInstanceOf(KeyNavBoard)
})

describe('add item', () => {
  test('basic', () => {
    const nav = new KeyNavBoard()
    const item = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    expect(linkedListContains(nav.listHead, item)).toBe(false)
    nav.addItem(item)
    expect(linkedListContains(nav.listHead, item)).toBe(true)
  })
  test('add duplicate item', () => {
    const nav = new KeyNavBoard()
    const item = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    expect(linkedListContains(nav.listHead, item)).toBe(false)
    nav.addItem(item)
    expect(linkedListContains(nav.listHead, item)).toBe(true)
    nav.addItem(item)
    expect(linkedListLength(nav.listHead)).toEqual(1)
  })
})

describe('remove item', () => {
  test('remove head and tail', () => {
    const nav = new KeyNavBoard()
    const item1 = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    expect(linkedListLength(nav.listHead)).toEqual(0)
    nav.addItem(item1)
    expect(linkedListLength(nav.listHead)).toEqual(1)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    nav.removeItem(item1)
    expect(linkedListLength(nav.listHead)).toEqual(0)
    expect(linkedListContains(nav.listHead, item1)).toBe(false)
  })
  test('remove head', () => {
    const nav = new KeyNavBoard()
    const item1 = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    const item2 = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    expect(linkedListLength(nav.listHead)).toEqual(0)
    nav.addItem(item1)
    nav.addItem(item2)
    expect(linkedListLength(nav.listHead)).toEqual(2)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(true)
    nav.removeItem(item1)
    expect(linkedListLength(nav.listHead)).toEqual(1)
    expect(linkedListContains(nav.listHead, item1)).toBe(false)
    expect(linkedListContains(nav.listHead, item2)).toBe(true)
  })
  test('remove head', () => {
    const nav = new KeyNavBoard()
    const item1 = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    const item2 = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    expect(linkedListLength(nav.listHead)).toEqual(0)
    nav.addItem(item1)
    nav.addItem(item2)
    expect(linkedListLength(nav.listHead)).toEqual(2)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(true)
    nav.removeItem(item2)
    expect(linkedListLength(nav.listHead)).toEqual(1)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(false)
  })
  test('remove middle', () => {
    const nav = new KeyNavBoard()
    const item1 = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    const item2 = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    const item3 = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    expect(linkedListLength(nav.listHead)).toEqual(0)
    nav.addItem(item1)
    nav.addItem(item2)
    nav.addItem(item3)
    expect(linkedListLength(nav.listHead)).toEqual(3)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(true)
    expect(linkedListContains(nav.listHead, item3)).toBe(true)
    nav.removeItem(item2)
    expect(linkedListLength(nav.listHead)).toEqual(2)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(false)
    expect(linkedListContains(nav.listHead, item3)).toBe(true)
  })
  test('remove item not exists', () => {
    const nav = new KeyNavBoard()
    const item1 = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    const item2 = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    nav.addItem(item1)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    const length = linkedListLength(nav.listHead)
    nav.removeItem(item2)
    expect(linkedListLength(nav.listHead)).toEqual(length)
    expect(linkedListContains(nav.listHead, item1)).toBe(true)
    expect(linkedListContains(nav.listHead, item2)).toBe(false)
  })
})

describe('set active', () => {
  test('basic', () => {
    const nav = new KeyNavBoard()
    const item = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    nav.addItem(item)
    nav.setActiveItem(item)
    expect(nav.getActiveItem()).toBe(item)
  })
  test('active item not exists', () => {
    const nav = new KeyNavBoard()
    const item = createNavItem({
      rect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })
    const itemNotExists = createNavItem({
      rect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    })
    nav.addItem(item)
    nav.setActiveItem(item)
    expect(nav.getActiveItem()).toBe(item)
    nav.setActiveItem(itemNotExists)
    expect(nav.getActiveItem()).toBe(item)
  })
})

describe('simple nav', () => {
  describe('no active item', () => {
    const nav = new KeyNavBoard()
    expect(nav.getActiveItem()).toEqual(null)
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toEqual(null)
  })
  describe('right', () => {
    test('navigation right - head', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation right - head intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 50,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation right - inclusion', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 125,
            width: 100,
            height: 25
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation right - been included', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 100,
            height: 300
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation right - direct', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toEqual(items[1])
    })
    test('navigation right - foot intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 150,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation right - foot', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 300,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toEqual(items[1])
    })
    test('navigation right - no item on the right', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.right)
      expect(nav.getActiveItem()).toEqual(items[0])
    })
  })

  describe('left', () => {
    test('navigation left - head', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation left - head intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 50,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation left - inclusion', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 50,
            width: 100,
            height: 10
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation left - beening included', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 300
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation left - direct', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 100,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toEqual(items[1])
    })

    test('navigation left - foot intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 150,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation left - foot', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 300,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toEqual(items[1])
    })

    test('navigation left - no item on the left', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 200,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.left)
      expect(nav.getActiveItem()).toEqual(items[0])
    })
  })

  describe('up', () => {
    test('navigation up - head', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation up - head intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 50,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation up - inclusion', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 150,
            y: 0,
            width: 10,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation up - beening included', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 50,
            y: 0,
            width: 250,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation up - direct', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toEqual(items[1])
    })
    test('navigation up - foot intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 150,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation up - foot', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 300,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toEqual(items[1])
    })
    test('navigation up - no item above', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toEqual(items[0])
    })
  })

  describe('down', () => {
    test('navigation down - head', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 0,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation down - head intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 50,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation down - inclusion', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 50,
            y: 200,
            width: 10,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toBe(items[1])
    })
    test('navigation down - been included', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 50,
            y: 200,
            width: 300,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation down - direct', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toEqual(items[1])
    })

    test('navigation down - foot intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 150,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toBe(items[1])
    })

    test('navigation down - foot', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 200,
            y: 200,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toEqual(items[1])
    })
    test('navigation down - no item below', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 100,
            height: 100
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.down)
      expect(nav.getActiveItem()).toEqual(items[0])
    })
  })
})

describe('priority', () => {
  test('least distance, no intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        },
        {
          rect: {
            x: 300,
            y: 0 + 10,
            width: 50,
            height: 50
          }
        },
        {
          rect: {
            x: 0,
            y: 0,
            width: 50,
            height: 50
          }
        },
        {
          rect: {
            x: 400,
            y: 0 + 20,
            width: 50,
            height: 50
          }
        },
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[3])
  })
  test('least distance, with intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 1000,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 10,
            height: 50
          }
        },
        {
          rect: {
            x: 200,
            y: 0 + 20,
            width: 50,
            height: 50
          }
        },
        {
          rect: {
            x: 300,
            y: 0 + 10,
            width: 100,
            height: 50
          }
        }
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[2])
  })
  test('same distance, most intersection', () => {
      const nav = new KeyNavBoard()
      const items = [
        {
          rect: {
            x: 100,
            y: 100,
            width: 1000,
            height: 100
          }
        },
        {
          rect: {
            x: 100,
            y: 0,
            width: 50,
            height: 50
          }
        },
        {
          rect: {
            x: 200,
            y: 0,
            width: 10,
            height: 50
          }
        },
        {
          rect: {
            x: 300,
            y: 0,
            width: 100,
            height: 50
          }
        },
      ].map(item => createNavItem(item))
      items.forEach(item => {
        nav.addItem(item)
      })
      nav.setActiveItem(items[0])
      nav.navigate(Direction.up)
      expect(nav.getActiveItem()).toBe(items[3])
  })
})

describe('memory', () => {
  test('up memory', () => {
    const nav = new KeyNavBoard({remember: true})
    const items = [
      {
        rect: {
          x: 0,
          y: 0,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 100,
          y: 0,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 0,
          y: 100,
          width: 200,
          height: 100
        }
      }
    ].map(item => createNavItem(item))
    items.forEach(item => {
      nav.addItem(item)
    })
    nav.setActiveItem(items[0])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.up)
    expect(nav.getActiveItem()).toBe(items[0])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[1])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.up)
    expect(nav.getActiveItem()).toBe(items[1])
  })
  test('right memory', () => {
    const nav = new KeyNavBoard({remember: true})
    const items = [
      {
        rect: {
          x: 0,
          y: 0,
          width: 100,
          height: 200
        }
      },
      {
        rect: {
          x: 100,
          y: 0,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 100,
          y: 200,
          width: 100,
          height: 100
        }
      }
    ].map(item => createNavItem(item))
    items.forEach(item => {
      nav.addItem(item)
    })
    nav.setActiveItem(items[1])
    nav.navigate(Direction.left)
    expect(nav.getActiveItem()).toBe(items[0])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[1])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.left)
    expect(nav.getActiveItem()).toBe(items[0])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[2])
  })
  test('down memory', () => {
    const nav = new KeyNavBoard({remember: true})
    const items = [
      {
        rect: {
          x: 0,
          y: 0,
          width: 200,
          height: 100
        }
      },
      {
        rect: {
          x: 0,
          y: 100,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 100,
          y: 100,
          width: 100,
          height: 100
        }
      }
    ].map(item => createNavItem(item))
    items.forEach(item => {
      nav.addItem(item)
    })
    nav.setActiveItem(items[0])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[1])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.up)
    expect(nav.getActiveItem()).toBe(items[0])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[2])
  })
  test('left memory', () => {
    const nav = new KeyNavBoard({remember: true})
    const items = [
      {
        rect: {
          x: 0,
          y: 0,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 0,
          y: 100,
          width: 100,
          height: 100
        }
      },
      {
        rect: {
          x: 100,
          y: 100,
          width: 100,
          height: 200
        }
      }
    ].map(item => createNavItem(item))
    items.forEach(item => {
      nav.addItem(item)
    })
    nav.setActiveItem(items[0])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.left)
    expect(nav.getActiveItem()).toBe(items[0])
    nav.navigate(Direction.down)
    expect(nav.getActiveItem()).toBe(items[1])
    nav.navigate(Direction.right)
    expect(nav.getActiveItem()).toBe(items[2])
    nav.navigate(Direction.left)
    expect(nav.getActiveItem()).toBe(items[1])
  })
})
