export type Post = {
    sno: number,
    title: string,
    slug: string,
    content: string,
    tag_line: string,
    description: string,
    img_file: string | null,
};

export type PostsResponse = {
  posts: Post[],
  total_pages: number,
  current_page: number,
};

export type PostCreate = {
    title: string,
    slug: string,
    content: string,
    tag_line: string,
    description: string,
    img_file: string | null,
}

export type PostUpdate = {
    sno: number,
    title: string,
    slug: string,
    content: string,
    tag_line: string,
    description: string,
    img_file: string | null,
}