import React from 'react'
import { mount } from 'enzyme'

import Catcher from './'

let cleanup

beforeEach(() => {
  const setup = () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    return () => {
      spy.mockRestore()
    }
  }
  cleanup = setup()
})

afterEach(() => {
  cleanup()
})

function Thrower() {
  throw new Error('🤡')
}

it('calls the onCatch prop for the componentDidCatch lifecycle hook', () => {
  const fn = jest.fn()
  const result = mount(
    <Catcher onCatch={fn}>
      <Thrower />
    </Catcher>,
  )
  expect(fn).toHaveBeenCalled()
})

it('updates the componentDidCatch instance method when the onCatch prop changes', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const result = mount(<Catcher onCatch={fn1}>{null}</Catcher>)
  result.setProps({ onCatch: fn2 })
  expect(result.instance().componentDidCatch).toBe(fn2)
  result.setProps({ children: <Thrower /> })
  expect(fn2).toHaveBeenCalled()
})
