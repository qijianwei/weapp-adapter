import HTMLElement from './HTMLElement'

export default function Canvas() {
  const canvas = wx.createCanvas()

  canvas.type = 'canvas'

  canvas.__proto__.__proto__ = new HTMLElement('canvas')

  canvas.getBoundingClientRect = () => {
    const ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }

    return ret
  }

  return canvas
}
