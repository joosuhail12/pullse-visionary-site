// Get all blog categories
export const categoriesQuery = `
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    color
  }
`;

// Get all blog authors
export const authorsQuery = `
  *[_type == "blogAuthor"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    avatar,
    jobTitle,
    bio
  }
`;

// Get all published blog posts
export const postsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      avatar,
      jobTitle
    },
    publishedAt,
    readTime,
    tags,
    isFeatured
  }
`;

// Get featured blog posts
export const featuredPostsQuery = `
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      avatar,
      jobTitle
    },
    publishedAt,
    readTime,
    tags,
    isFeatured
  }
`;

// Get single blog post by slug
export const postBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      avatar,
      jobTitle,
      bio
    },
    publishedAt,
    readTime,
    tags,
    isFeatured
  }
`;

// Get blog posts by category
export const postsByCategoryQuery = `
  *[_type == "blogPost" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      avatar,
      jobTitle
    },
    publishedAt,
    readTime,
    tags,
    isFeatured
  }
`;

// Get blog posts by author
export const postsByAuthorQuery = `
  *[_type == "blogPost" && author._ref == $authorId] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    "author": author->{
      _id,
      name,
      "slug": slug.current,
      avatar,
      jobTitle
    },
    publishedAt,
    readTime,
    tags,
    isFeatured
  }
`;
