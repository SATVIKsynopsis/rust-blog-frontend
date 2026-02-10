import { PostEditor } from '../../components/post-editor';

export const metadata = {
  title: 'Create Post',
  description: 'Create a new blog post',
};

export default function CreatePostPage() {
  return <PostEditor />;
}
