import { Howl } from "howler"
import { parseInt } from "es-toolkit/compat"
import MD5 from "crypto-js/md5"

function md5() {
  return MD5((Date.now() + Math.random()).toString()).toString()
}

class AudioPlayer {
  constructor() {
    /**
     * 当前正在播放的音频的 ID
     */
    this.playingId = ""
    /**
     * 音频列表
     */
    this.audioList = []
    /**
     * 定时器，用于回调播放进度
     */
    this.intervalTime = null
    /**
     * 播放速度
     */
    this.rate = 1
    /**
     * 音频播放进度
     */
    this.seekTime = 0
  }

  startPlaying(audio, onlyOne = false) {
    if (!onlyOne) {
      this.audioList.push(audio)
    } else {
      this.audioList = [audio]
    }
    this.playingId = audio.id
  }

  endPlaying(id) {
    const audioIndex = this.audioList.findIndex(v => {
      return v.id === id
    })
    if (audioIndex !== -1) {
      this.audioList[audioIndex].howl.unload()
      this.audioList.splice(0, audioIndex + 1)
    }
    if (this.audioList.length) {
      this.audioList[0].howl.play()
    } else {
      this.playingId = ""
    }
  }

  play(payload) {
    clearInterval(this.intervalTime)
    const id = md5()
    const cb = error => {
      if (payload.callback) {
        payload.callback(error, id)
      }
    }
    const howl = new Howl({
      ...payload.properties,
      format: payload.properties.format || "wav",
      autoplay: false,
      rate: this.rate,
      xhr: {
        withCredentials: payload.properties.withCredentials !== undefined ? payload.properties.withCredentials : true,
      },
      onend: () => {
        this.endPlaying(id)
        cb()
        clearInterval(this.intervalTime)
        payload.onend && payload.onend()
      },
      onloaderror(soundId, error) {
        cb(error)
      },
      onplayerror(soundId, error) {
        cb(error)
      },
      onpause: () => {
        clearInterval(this.intervalTime)
        payload.onpause && payload.onpause()
      },
      onplay: () => {
        this.timeUpdate(payload.onTimeupdate)
        payload.onplay && payload.onplay()
      },
      onError: err => {
        console.log(err)
      },
    })
    // 如果有正在播放的音频，先停止它
    if (this.playingId) {
      const currentAudio = this.audioList.find(audio => audio.id === this.playingId)
      if (currentAudio) {
        // 如果点击的是当前正在播放的音频
        if (currentAudio.properties.src === payload.properties.src) {
          // 是否允许重播
          if (payload.replay) {
            this.seekTime = 0
            this.endPlaying(this.playingId)
          } else if (payload.pause) {
            // 暂停当前音频
            if (currentAudio.howl.playing()) {
              currentAudio.howl.pause()
            } else {
              currentAudio.howl.play()
            }
            return this.playingId // 返回当前音频的 ID 表示已暂停或继续播放
          } else {
            currentAudio.howl.stop()
            this.endPlaying(this.playingId)
            return null // 返回 null 表示没有新的音频在播放
          }
        } else {
          currentAudio.howl.stop()
          this.endPlaying(this.playingId)
        }
      }
    }
    howl.play() // 播放新的音频
    this.setSeek(this.seekTime)
    const audio = {
      id,
      properties: payload.properties,
      howl: howl,
    }
    // Object.seal(audio)，将audio对象密封，禁止新增或删除其自身属性，但允许修改已有属性的值
    this.startPlaying(Object.seal(audio), payload.onlyOne)
    return id
  }

  /**
   * 清空音频列表
   */
  clearAudioList() {
    this.audioList = []
    this.playingId = ""
  }

  /**
   * 停止播放所有音频
   */
  stop() {
    this.audioList.forEach(audio => {
      if (this.playingId === audio.id) {
        audio.howl.stop()
      }
    })
    clearInterval(this.intervalTime)
  }

  /**
   * 终止播放所有音频
   */
  abort() {
    this.audioList.forEach(audio => {
      if (this.playingId === audio.id) {
        audio.howl.stop()
      }
    })
    clearInterval(this.intervalTime)
    this.clearAudioList()
  }

  /**
   * 监听播放进度
   * @param {function} callback 回调函数
   */
  timeUpdate(callback) {
    this.intervalTime = setInterval(() => {
      const currentTime = this.getCurrentTime()
      callback && callback(currentTime)
    }, 500)
  }

  /**
   * 获取当前播放进度
   */
  getCurrentTime() {
    const audio = this.audioList.find(audio => audio.id === this.playingId)
    return audio ? audio.howl.seek() : 0
  }

  /**
   * 设置播放速度
   * @param {number} rate 播放速度
   */
  setRate(rate) {
    const audio = this.audioList.find(audio => audio.id === this.playingId)
    this.rate = rate
    audio && audio.howl.rate(rate)
  }

  /**
   * 设置播放进度
   * @param {number} time 播放进度
   */
  setSeek(time) {
    const audio = this.audioList.find(audio => audio.id === this.playingId)
    if (audio && time) {
      audio.howl.seek(parseInt(time / 1000))
      this.seekTime = 0
    } else {
      this.seekTime = parseInt(time / 1000)
    }
  }
}

export default new AudioPlayer()
