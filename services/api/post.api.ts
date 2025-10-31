import { Post, Stat } from "@/utils/types";
import { baseUrl } from ".";

export const createPost = async (post: Post, token?: string) => {
  try {
    const bd = JSON.stringify({
      title: post.title,
      content: post.content,
      user_id: post.user_id,
      medias: JSON.stringify(post.medias),
      tags: JSON.stringify(post.tags),
    })
    const response = await fetch(`${baseUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: bd
    });

    console.log(bd);    
    console.log(response);
    
    if (!response.ok) throw new Error("Failed to create post");
    // console.log(await response.text());
    
    return response.json();
  } catch (e: any) {
    console.error("Error creating post:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }
};

export const getPostStat = async (token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/post/stat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error("Failed to get post");
    const data = await response.json();

    return Object.values(data.data) as Stat[];
  } catch (e: any) {
    console.error("Error getting post:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }  
}

export const getPost = async (id: number|string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error("Failed to get post");
    const data = await response.json();
    console.log(data);
    
    return data.post || data.data as Post;
  } catch (e: any) {
    console.error("Error getting post:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }
};

export const searchPostsRes = async (query: string, token?: string): Promise<Post[]> => {
  try {
    const url = new URL(`${baseUrl}/posts/search`);
    url.searchParams.append('q', query); 
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error('Failed to search posts');
    const data = await response.json();
    
    return data.posts||Object.values(data.data) as Post[]; // supposons que l'API retourne { posts: [...] }
  } catch (e: any) {
    console.error('Error searching posts:', e);
    throw new Error(e.message || 'Erreur de connexion');
  }
};

export const deletePost = async (id: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error("Failed to delete post");
    return response.json();
  } catch (e: any) {
    console.error("Error deleting post:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }
};

export const getPostsUser = async (id_user: string, token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${id_user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error("Failed to get posts");
    const data = await response.json();
    
    return Object.values(data.data) as Post[];
  } catch (e: any) {
    console.error("Error getting user posts:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }
};

export const getAllPosts = async (token?: string) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });    

    if (!response.ok) throw new Error("Failed to get posts");
    const data = await response.json();
    // console.log(Object.values(data.data));
    
    return Object.values(data.data) as Post[];
  } catch (e: any) {
    // console.error("Error:", e);
    throw new Error(e.response?.data?.message || "Erreur de connexion");
  }
};
