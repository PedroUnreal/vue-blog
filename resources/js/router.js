import Welcome from "./views/Welcome";
import Posts from "./views/posts/Posts";
import PostPage from "./views/posts/PostPage";

export default {
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [
        {
            name: "Welcome",
            path: '/',
            component: Welcome,
        },
        {
            name: "Posts",
            path: '/posts',
            component: Posts,
        },
        {
            name: "Post",
            path: '/posts/:id/show',
            props: true,
            component: PostPage,
        }
    ]
}
