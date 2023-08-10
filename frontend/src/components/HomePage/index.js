import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'


function HomePage() {
    const posts = useSelector((state) => state.posts)

    console.log(posts)

    return (<h1>Luvddit</h1>)
}

export default HomePage
