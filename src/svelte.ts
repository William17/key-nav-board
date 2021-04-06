import { KeyNavBoard, Direction, NavItem, KeyNavBoardConstructorOptions } from './KeyNavBoard'
const KEY_CODE_TO_DIRECTION: {[key:string]: any} = {
  '40': Direction.down, 
  '39': Direction.right,
  '38': Direction.up,
  '37': Direction.left
}

function createContainer (keyNavBoard: KeyNavBoard) {
  return function navContainer (node: any) {
    function handleKeydown (event: any) {
      const keyCode = event.keyCode.toString() 
      if (keyCode === '13') {
        event.preventDefault()
        const activeItem = keyNavBoard.getActiveItem()
        if (activeItem) {
          activeItem.el.click()
        }
        return
      }
      const direction = KEY_CODE_TO_DIRECTION[keyCode]
      if (direction) {
        keyNavBoard.navigate(direction)
      }
    }
    node.addEventListener('keydown', handleKeydown, true)
    const activeItem = keyNavBoard.getActiveItem()
    if (activeItem) {
      activeItem.el.focus()
    }
    return {
      destroy() {
        node.removeEventListener('keydown', handleKeydown, true)
      }
    }
  }
}
type ItemOptions = {
  disabled?: boolean,
  active?: boolean
}
function triggerActive (node: any) {
  node.focus()
}
function triggerDeactive(node: any) {
  node.blur()
}

function createItem (keyNavBoard: KeyNavBoard) {
  return function item (node: any, options: ItemOptions = {disabled: false, active: false}) {
    const item = new NavItem(node)
    if (!node.getAttribute('tabindex')) {
      node.setAttribute('tabindex', '0')
    }
    if (!options.disabled) {
      keyNavBoard.addItem(item) 
    }
    if (options.active) {
      keyNavBoard.setActiveItem(item)
      triggerActive(node)
    }
    return {
      update (options: ItemOptions) {
        if (options.disabled) {
          keyNavBoard.removeItem(item)
        } else {
          keyNavBoard.addItem(item)
        }
        if (options.active) {
          keyNavBoard.setActiveItem(item)
          triggerActive(node)
        }
      },
      destroy () {
        keyNavBoard.removeItem(item)
      }
    }
  }
}
export function createKeyNavActions (options?: KeyNavBoardConstructorOptions) {
  const navBoard = new KeyNavBoard(options)
  const navContainer = createContainer(navBoard)
  const navItem = createItem(navBoard)
  const pause = () => {
    const activeItem = navBoard.getActiveItem()
    if (activeItem) {
      triggerDeactive(activeItem.el)
    }
  }
  const resume = () => {
    const activeItem = navBoard.getActiveItem()
    if (activeItem) {
      triggerActive(activeItem.el)
    }
  }
  return {
    navBoard,
    navContainer,
    navItem,
    pause,
    resume
  }
}

