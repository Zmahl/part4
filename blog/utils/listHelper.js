const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //Accesses likes for each blog
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    
    //Checks for empty list of blogs to return 0
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
        //Accesses likes for each blog
        const reducer = (favBlog, blog) => {

            if (blog.likes > favBlog.likes){

                favBlog.title = blog.title
                favBlog.author = blog.author
                favBlog.likes = blog.likes
            }

            console.log(favBlog)
            return favBlog
        }
        
        //Checks if blogs is empty
        if (blogs.length == 0){
            return null
        }

        else {
            const bestBlog = blogs.reduce(reducer)
            delete bestBlog._id
            delete bestBlog.__v
            delete bestBlog.url
    
            return bestBlog
    }
}

const mostBlogs = (blogs) => {
            //Accesses likes for each blog
            const reducer = (mostBlogs, blog) => {

                if (blog.blogs > mostBlogs.blogs){
    
                    mostBlogs.author = blog.author
                    mostBlogs.blogs = blog.blogs
                }

                console.log(mostBlogs)
                return mostBlogs
            }
            
            //Checks if blogs is empty
            if (blogs.length == 0){
                return null
            }
    
            else {

                const bigBlogs = blogs.reduce(reducer)
                delete bigBlogs._id
                delete bigBlogs.__v
                delete bigBlogs.url
                delete bigBlogs.title
        
                return bigBlogs
        }
}

const mostLikes = (blogs) => {
    //Accesses likes for each blog
    const reducer = (mostLikes, blog) => {

        if (blog.likes > mostLikes.likes){
    
            mostLikes.author = blog.author
            mostLikes.likes = blog.likes
        }

        console.log(mostLikes)
        return mostLikes
    }
            
    //Checks if blogs is empty
    if (blogs.length == 0){
        return null
    }
    
    else {

        const mostLiked = blogs.reduce(reducer)
        delete mostLiked._id
        delete mostLiked.__v
        delete mostLiked.url
        delete mostLiked.title
        
        return mostLiked
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}