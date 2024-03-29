const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty lists is 0', () => {
    const blog = []
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {

    const listWithOneBlog = [ {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    } ]

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(34)

  })
})

describe('favorite blog', () => {

  test('empty list returns 0', () => {
    const blog = []
    const result = listHelper.favoriteBlog(blog)
    expect(result).toEqual([])
  })

  test('when list has only one blog returns that blog', () => {

    const listWithOneBlog = [ {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    } ]

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({'author': 'Michael Chan', 'likes': 7, 'title': 'React patterns'})
  })

  test('of a bigger list is calculated right', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      }
    ]

    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 12, 'title': 'Canonical string reduction'})

  })

})

// describe('most blogs', () => {

//   test('empty list returns 0', () => {
//     const blog = []
//     const result = listHelper.mostBlogs(blog)
//     expect(result).toEqual([])
//   })

//   test('when list has only one blog returns that blog', () => {

//     const listWithOneBlog = [ {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     } ]

//     const result = listHelper.mostBlogs(listWithOneBlog)
//     expect(result).toEqual({"author": "Michael Chan"})
//   })
// })