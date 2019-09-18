import HTMLVideoElement from './HTMLVideoElement'

const _videoContent = new WeakMap()

const _videoAttributeAdapter = {
  top: (val, content) => {
    _videoContent.get(content).y = parseInt(val, 10)
  },
  left: (val, content) => {
    _videoContent.get(content).x = parseInt(val, 10)
  }
}

export default class Video extends HTMLVideoElement {
  constructor(url) {
    super()
    const videoContent = wx.createVideo()

    _videoContent.set(this, videoContent)

    videoContent.onPlay(() => {
      this.dispatchEvent({ type: 'play' })
    })
    videoContent.onPause(() => {
      this.dispatchEvent({ type: 'pause' })
    })
    videoContent.onEnded(() => {
      this.dispatchEvent({ type: 'ended' })
    })
    videoContent.onError(() => {
      this.dispatchEvent({ type: 'error' })
    })

    videoContent.onWaiting(() => {
      this.dispatchEvent({ type: 'waiting' })
    })
    if (url) {
      videoContent.src = url
    }
  }
  load() {
    console.warn('HTMLVideoElement.load() is not implemented.')
    this.dispatchEvent({ type: 'canplay' })
  }

  get src() {
    return _videoContent.get(this).src
  }

  set src(value) {
    _videoContent.get(this).src = value
  }

  get poster() {
    return _videoContent.get(this).poster
  }
  set poster(value) {
    _videoContent.get(this).poster = value
  }

  get controls() {
    return _videoContent.get(this).controls
  }

  set controls(value) {
    if (value) {
      _videoContent.get(this).controls = true
      _videoContent.get(this).showCenterPlayBtn = true
    } else {
      _videoContent.get(this).controls = false
      _videoContent.get(this).showCenterPlayBtn = false
    }
  }

  get style() {
    return this._style
  }

  set style(value) {
    this._style = new Proxy(value, {
      set(target, prop, value) {
        console.log(prop, value)
        target[prop] = value
        if (_videoAttributeAdapter.hasOwnProperty(prop)) {
          _videoAttributeAdapter[prop].apply(this, value, this)
        }
        return true
      }
    })
  }

  get width() {
    return _videoContent.get(this).width
  }

  set width(value) {
    _videoContent.get(this).width = value
  }

  get height() {
    return _videoContent.get(this).height
  }

  set height(value) {
    _videoContent.get(this).height = value
  }

  play() {
    return _videoContent.get(this).play()
  }
}
