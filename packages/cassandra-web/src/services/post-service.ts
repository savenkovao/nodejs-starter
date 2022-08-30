import { v4 as uuid } from "uuid";
import mapper from "../db/mapper";
import { PostCreateType } from "../interfaces/post";

const postMapper = mapper.forModel('Post');

const createPost = async (post: PostCreateType) => {
    await postMapper.insert({id: uuid(), title: post.title, description: post.description});
};

const getAllPosts = async () => {
    const res = await postMapper.findAll();

    return res.toArray();
};

const getPostById = async (id: string) => {
    const res = await postMapper.find({id})

    return res.first();
};

export default {
    createPost,
    getAllPosts,
    getPostById
}