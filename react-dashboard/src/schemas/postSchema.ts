export type Post = {
    sno: number;
    title: string;
    slug: string;
    content: string;
    tag_line: string;
    description: string;
    date: string;
    last_modified: string | null;
    img_file: string | null;
};