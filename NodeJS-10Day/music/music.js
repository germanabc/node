// 该数据仓储中默认已经初始化好了一些数据
// 然后我们对这个 storage 仓储做增删改产
var storage = [
  { id: 1, title: '富士山下', singer: '陈奕迅', music: '陈奕迅 - 富士山下.mp3', poster: '陈奕迅.jpg' },
  { id: 2, title: '石头记', singer: '达明一派', music: '达明一派 - 石头记.mp3', poster: '达明一派.jpg' },
  { id: 3, title: 'Titoli', singer: 'Ennio Morricone', music: 'Ennio Morricone - Titoli.mp3', poster: 'Ennio Morricone.jpg' },
  { id: 4, title: '友情岁月', singer: '黄耀明', music: '黄耀明 - 友情岁月.mp3', poster: '黄耀明.jpg' },
  { id: 5, title: '梦里水乡', singer: '江珊', music: '江珊 - 梦里水乡.mp3', poster: '江珊.jpg' },
  { id: 6, title: 'Blowing In The Wind', singer: '南方二重唱', music: '南方二重唱 - Blowing In The Wind.mp3', poster: '南方二重唱.jpg' },
  { id: 7, title: '女儿情', singer: '万晓利', music: '万晓利 - 女儿情.mp3', poster: '万晓利.jpg' },
  { id: 8, title: '王馨平', singer: '别问我是谁', music: '王馨平 - 别问我是谁.mp3', poster: '王馨平.jpg' },
  { id: 9, title: '五环之歌', singer: '岳云鹏', music: '岳云鹏,MC Hotdog - 五环之歌.mp3', poster: '岳云鹏.jpg' }
]

// 关于 ECMAScript 6 中的 class
// Class 知识一个语法糖而已，目的是为了更像传统的面向对象语言
// 构造函数的prototype属性，在ES6的“类”上面继续存在
// 类的所有方法都定义在类的prototype属性上面
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
// 没有变量提升

class Music {

  constructor(title, singer, music, poster) {
    this.title = title
    this.singer = singer
    this.music = music
    this.poster = poster
  }

  save() {
    // id 自动生成
    let id = 0
    storage.forEach((music, index) => {
      if (music.id > id) {
        id = music.id
      }
    })

    // 这一步，其实就是讲数据添加到数据库中
    storage.push({
      id: ++id,
      title: this.title,
      singer: this.singer,
      music: this.music,
      poster: this.poster
    })
  }

  updateById(id) {
    // 修改是根据原来的id找到该元素在数组中的索引下标
    // 然后通过该下标来放到该元素进行修改
    // 修改的时候，把原来的数据也传进来，重新覆盖
    // 只不过该记录的id已经索引没有变化
    let index = storage.findIndex(m => m.id === id)
    storage[index].title = this.title
    storage[index].singer = this.singer
    // storage[index].music = this.music
    // storage[index].poster = this.poster
  }

  static removeById(id) {
    // 先根据id查找数组中的索引
    // 根据索引再删除
    let index = storage.findIndex(m => m.id === id)
    storage.splice(index, 1)
  }

  static getAll() {
    return storage
  }

  static getById(id) {
    return storage.find(m => m.id === id)
  }
}

// 最后将 Music 暴露出去
module.exports = Music

// 数据也是从表单中提交过来的
// var m = new Music('test', 'testdsa', 'dsadas', 'dsadsa')

// // m.save()
// // Music.removeById(2)

// // 该数据是从表单中提交过来的
// var music = new Music('爱情呼叫转移','eason', 'dsadas', 'dsadsa')

// // id 也是从表单中提交过来的
// music.updateById(1)

// console.log(storage)

// function Music () {

// }


// var music = new Music('','','','',)

// // 保存到数据仓储中
// music.save()

// Music.removeById(1)

// // 获取所有的音乐列表数据
// Music.getAll()

// Music.getById()

// Music
// .updateById(id, 数据)
