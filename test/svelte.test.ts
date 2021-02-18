import { KeyNavBoard } from '../src'
import { createKeyNavActions } from '../src/svelte'
import Element from './Element'
import { linkedListContains, linkedListLength } from './util'

test('createKeyNavActions', () => {
  const { navBoard, navContainer, navItem, pause, resume } = createKeyNavActions()
  const containerNode = new Element()
  const itemNode = new Element()
  expect(navBoard).toBeInstanceOf(KeyNavBoard)
  expect(navContainer).toBeInstanceOf(Function)
  expect(navItem).toBeInstanceOf(Function)
  const containerActionResult = navContainer(containerNode)
  expect(containerActionResult).toBeInstanceOf(Object)
  expect(containerActionResult.destroy).toBeInstanceOf(Object)
  const itemActionResult = navItem(itemNode)
  expect(itemActionResult).toBeInstanceOf(Object)
  expect(itemActionResult.update).toBeInstanceOf(Object)
  expect(itemActionResult.destroy).toBeInstanceOf(Object)
  expect(pause).toBeInstanceOf(Function)
  expect(resume).toBeInstanceOf(Function)
})

test('pause and resume', () => {
  const { navBoard, navContainer, navItem, pause, resume } = createKeyNavActions()
  const containerNode = new Element()
  const itemNode = new Element()
  const containerActionResult = navContainer(containerNode)
  const itemActionResult = navItem(itemNode, {active: true})
  expect(itemNode.isFocus).toBe(true)
  pause()
  expect(itemNode.isFocus).toBe(false)
  resume()
  expect(itemNode.isFocus).toBe(true)
})

test('navItem', () => {
  const { navBoard, navContainer, navItem } = createKeyNavActions()
  const containerNode = new Element()
  const itemNode1 = new Element()
  const itemNode2 = new Element()
  const itemNode3 = new Element({ tabindex: '5'})
  const containerActionResult = navContainer(containerNode)
  const item1ActionResult = navItem(itemNode1, {active: true})
  const item2ActionResult = navItem(itemNode2, {active: false})
  const item3ActionResult = navItem(itemNode3, {disabled: true})
  expect(itemNode1.getAttribute('tabindex')).toBe('0')
  expect(itemNode2.getAttribute('tabindex')).toBe('0')
  expect(itemNode3.getAttribute('tabindex')).toBe('5')
  let activeItem
  activeItem = navBoard.getActiveItem() || {el: null}
  expect(activeItem.el).toBe(itemNode1)
  item2ActionResult.update({active: true})
  activeItem = navBoard.getActiveItem() || {el: null}
  expect(activeItem.el).toBe(itemNode2)
  expect(linkedListLength(navBoard.listHead)).toBe(2)
  item1ActionResult.update({disabled: true})
  expect(linkedListLength(navBoard.listHead)).toBe(1)
  item2ActionResult.destroy()
  expect(linkedListLength(navBoard.listHead)).toBe(0)
  item3ActionResult.update({disabled: false})
  expect(linkedListLength(navBoard.listHead)).toBe(1)
})

test('navContainer', () => {
  const { navBoard, navContainer, navItem } = createKeyNavActions()
  const containerNode = new Element()
  const itemNode1 = new Element({
    rect: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    }
  })
  const itemNode2 = new Element({
    rect: {
      x: 0,
      y: 100,
      width: 100,
      height: 100
    }
  })
  const containerActionResult = navContainer(containerNode)
  const item1ActionResult = navItem(itemNode1)
  const item2ActionResult = navItem(itemNode2)
  expect(containerNode.listeners.keydown).toBeInstanceOf(Function)
  const keydownHandler = containerNode.listeners.keydown || jest.fn()
  const eventEnter = {
    keyCode: 13,
    preventDefault: jest.fn()
  }
  const mockClick = jest.fn()
  itemNode1.click = mockClick
  itemNode2.click = mockClick
  keydownHandler.call(containerNode, eventEnter)
  expect(eventEnter.preventDefault.mock.calls.length).toBe(1)
  expect(mockClick.mock.calls.length).toBe(0)


  let activeItem
  item1ActionResult.update({active: true})
  activeItem = navBoard.getActiveItem() || { el: null}
  expect(activeItem.el).toBe(itemNode1)

  // down
  {
    const eventDown = {
      keyCode: 40,
      // tslint:disable-next-line
      preventDefault: jest.fn(() => {})
    }
    keydownHandler.call(containerNode, eventDown)
    activeItem = navBoard.getActiveItem() || { el: null}
    expect(activeItem.el).toBe(itemNode2)
    expect(eventDown.preventDefault.mock.calls.length).toBe(0)
  }

  // up
  {
    const eventUp = {
      keyCode: 38,
      preventDefault: jest.fn()
    }
    keydownHandler.call(containerNode, eventUp)
    activeItem = navBoard.getActiveItem() || { el: null}
    expect(activeItem.el).toBe(itemNode1)
    expect(eventUp.preventDefault.mock.calls.length).toBe(0)
  }

  // enter
  {
    const eventEnter = {
      keyCode: 13,
      preventDefault: jest.fn()
    }
    const mockClick = jest.fn()
    itemNode1.click = mockClick
    keydownHandler.call(containerNode, eventEnter)
    expect(eventEnter.preventDefault.mock.calls.length).toBe(1)
    expect(mockClick.mock.calls.length).toBe(1)
  }

  // unknow key{
  {
    const event = {
      keyCode: 50,
      preventDefault: jest.fn()
    }
    const itemNode = new Element()
    const mockClick = jest.fn()
    itemNode.click = mockClick
    const itemActionResult = navItem(itemNode, {active: true})
    activeItem = navBoard.getActiveItem() || { el: null}
    expect(activeItem.el).toBe(itemNode)
    keydownHandler.call(containerNode, event)
    expect(navBoard.getActiveItem()).toBe(activeItem)
    expect(event.preventDefault.mock.calls.length).toBe(0)
    expect(mockClick.mock.calls.length).toBe(0)
  }

  containerActionResult.destroy()
  expect(containerNode.listeners.keydown).toBe(undefined)
})