const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (sum, item) => {
      return sum + item.likes 
    }, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...likes)
  const favorites = blogs.filter( (blog) => blog.likes === mostLikes)

  return favorites[0] === undefined
    ? []
    : (({ title, author, likes }) => ({ title, author, likes }))(favorites[0])

}

const mostBlogs = (blogs) => {
  // iterates through the blogs
  // keeps count of how many blogs each author has
  // returns the author with the most blogs, along with how many blogs they have

  const authors = groupBy(blogs, 'author')
  console.log(authors)

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}