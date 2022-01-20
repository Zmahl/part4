const mostBlogs = require('../utils/listHelper').mostBlogs

describe('most blogs', () => {
    test('checks if the author with the most blogs is returned', () => {
        const blogs = [
            {
                author: "Robert C. Martin",
                blogs: 3
            },
            {
                author: "George Orwell",
                blogs: 7
            },
            {
                author: "Colin Moore",
                blogs: 7
            }
        ]

        const result = mostBlogs(blogs)

        expect(result).toEqual(
            {
                author: "George Orwell",
                blogs: 7
            }
        )
    })
})