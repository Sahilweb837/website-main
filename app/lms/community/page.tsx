"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Plus, Send, Sparkles, Users } from "lucide-react";
import styles from "./community.module.css";

type CommunityPost = {
  id: string;
  category: "Discussion" | "Study group" | "Mentor" | "Student win";
  title: string;
  author: string;
  createdAt: number;
  likes: string[];
  replies: { id: string; author: string; text: string }[];
};

const starterPosts: CommunityPost[] = [
  { id: "discussion-hooks", category: "Discussion", title: "What finally made React hooks click for you?", author: "Priya Sharma", createdAt: Date.now() - 30 * 60_000, likes: [], replies: [{ id: "reply-1", author: "Nitin Kapoor · Mentor", text: "Try tracing each render and write down which values persist between renders." }] },
  { id: "study-group", category: "Study group", title: "Saturday system design practice — join us", author: "Arjun Mehta", createdAt: Date.now() - 2 * 60 * 60_000, likes: [], replies: [] },
  { id: "mentor-post", category: "Mentor", title: "A useful way to think about clean API boundaries", author: "Your Netcoder mentor", createdAt: Date.now() - 5 * 60 * 60_000, likes: [], replies: [{ id: "reply-2", author: "Your Netcoder mentor", text: "Keep each endpoint responsible for one clear job, and make its inputs and outputs predictable." }] },
  { id: "student-win", category: "Student win", title: "Shipped my first full-stack project!", author: "Rohan Mehta", createdAt: Date.now() - 24 * 60 * 60_000, likes: [], replies: [] },
];

function isCommunityPost(value: unknown): value is CommunityPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Record<string, unknown>;
  const categories: CommunityPost["category"][] = ["Discussion", "Study group", "Mentor", "Student win"];
  return typeof post.id === "string"
    && typeof post.title === "string"
    && typeof post.author === "string"
    && typeof post.createdAt === "number"
    && Number.isFinite(post.createdAt)
    && categories.includes(post.category as CommunityPost["category"])
    && Array.isArray(post.likes)
    && post.likes.every((like) => typeof like === "string")
    && Array.isArray(post.replies)
    && post.replies.every((reply) =>
      reply && typeof reply === "object"
      && typeof reply.id === "string"
      && typeof reply.author === "string"
      && typeof reply.text === "string",
    );
}

function readPosts(userId: string): CommunityPost[] {
  try {
    const raw = localStorage.getItem(`lms_community_${userId}`);
    if (!raw) return starterPosts;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isCommunityPost)) {
      throw new Error("Saved community posts are invalid.");
    }
    return parsed;
  } catch (error) {
    console.error("Unable to load community posts.", error);
    return starterPosts;
  }
}

function timeLabel(createdAt: number) {
  const minutes = Math.max(1, Math.floor((Date.now() - createdAt) / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
}

export default function CommunityPage() {
  const { user, isAuthLoaded } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [filter, setFilter] = useState("All");
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CommunityPost["category"]>("Discussion");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [notice, setNotice] = useState("");
  const categories = ["All", "Discussion", "Study group", "Mentor", "Student win"];

  useEffect(() => {
    if (user) setPosts(readPosts(user.id));
  }, [user]);

  const visiblePosts = useMemo(
    () => posts.filter((post) => filter === "All" || post.category === filter),
    [filter, posts],
  );

  function savePosts(next: CommunityPost[]) {
    if (!user) return;
    try {
      localStorage.setItem(`lms_community_${user.id}`, JSON.stringify(next));
      setPosts(next);
      setNotice("");
    } catch (error) {
      console.error("Unable to save community activity.", error);
      setNotice("We couldn’t save your update. Check your browser storage and try again.");
    }
  }

  function createPost(event: React.FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || !user) return;
    savePosts([{ id: `post-${Date.now()}`, category, title: cleanTitle, author: user.name, createdAt: Date.now(), likes: [], replies: [] }, ...posts]);
    setTitle("");
    setComposerOpen(false);
  }

  function addReply(postId: string) {
    const text = replyText.trim();
    if (!text || !user) return;
    savePosts(posts.map((post) => post.id === postId
      ? { ...post, replies: [...post.replies, { id: `reply-${Date.now()}`, author: user.name, text }] }
      : post));
    setReplyText("");
    setReplyingTo(null);
  }

  if (!isAuthLoaded) return <main className={styles.loading}>Opening your community…</main>;
  if (!user) return <main className={styles.empty}><Users size={28} /><h1>Your learning community awaits.</h1><p>Sign in to join discussions and save your posts.</p><Link href="/login?redirect=/lms/community">Sign in to continue <ArrowRight size={15} /></Link></main>;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/lms/courses" className={styles.back}><ArrowLeft size={15} /> My Courses</Link>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>LEARN BETTER, TOGETHER</span><h1>Your learning community</h1><p>Ask a question, share a win, or find people learning alongside you.</p></div>
          <button type="button" className={styles.createButton} onClick={() => setComposerOpen((open) => !open)}><Plus size={16} /> Start a discussion</button>
        </header>
        {composerOpen && <form className={styles.composer} onSubmit={createPost}><label htmlFor="community-title">What would you like to share?</label><textarea id="community-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ask a question, share a learning win, or invite others to study…" maxLength={240} required /><div><select aria-label="Post type" value={category} onChange={(event) => setCategory(event.target.value as CommunityPost["category"])}><option>Discussion</option><option>Study group</option><option>Student win</option></select><span>{title.length}/240</span><button type="submit"><Send size={14} /> Post</button></div></form>}
        {notice && <p className={styles.notice} role="alert">{notice}</p>}
        <section className={styles.groupCard}><span><Users size={20} /></span><div><strong>Find your people</strong><p>Join a study group to keep each other moving through the tough bits.</p></div><button type="button" onClick={() => { setCategory("Study group"); setComposerOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Start a study group <ArrowRight size={14} /></button></section>
        <div className={styles.feedHeader}><div><h2>Community feed</h2><p>Conversations and wins from your learning community.</p></div><span>{posts.length} posts</span></div>
        <nav className={styles.filters} aria-label="Filter community posts">{categories.map((item) => <button type="button" key={item} className={filter === item ? styles.filterActive : ""} onClick={() => setFilter(item)}>{item}</button>)}</nav>
        <section className={styles.feed}>
          {visiblePosts.length ? visiblePosts.map((post) => {
            const liked = post.likes.includes(user.id);
            return <article className={styles.post} key={post.id}><div className={styles.postHeader}><span className={styles.avatar}>{post.author.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{post.author}</strong><small>{timeLabel(post.createdAt)}</small></div><span className={styles.category}>{post.category}</span></div><h3>{post.title}</h3>{post.replies.map((reply) => <div className={styles.reply} key={reply.id}><strong>{reply.author}</strong><p>{reply.text}</p></div>)}<div className={styles.postActions}><button type="button" aria-pressed={liked} className={liked ? styles.liked : ""} onClick={() => savePosts(posts.map((item) => item.id === post.id ? { ...item, likes: liked ? item.likes.filter((id) => id !== user.id) : [...item.likes, user.id] } : item))}><Heart size={15} fill={liked ? "currentColor" : "none"} /> {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</button><button type="button" onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}><MessageCircle size={15} /> {post.replies.length} replies</button></div>{replyingTo === post.id && <form className={styles.replyForm} onSubmit={(event) => { event.preventDefault(); addReply(post.id); }}><input aria-label="Write a reply" value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Write a helpful reply…" maxLength={240} /><button type="submit" aria-label="Send reply"><Send size={15} /></button></form>}</article>;
          }) : <div className={styles.emptyFeed}><Sparkles size={22} /><strong>No {filter.toLowerCase()} posts just yet.</strong><p>Start the first conversation and help your community grow.</p><button type="button" onClick={() => setComposerOpen(true)}>Create a post</button></div>}
        </section>
        <Link className={styles.dashboardLink} href="/lms/courses">Back to your courses <ArrowRight size={15} /></Link>
      </div>
    </main>
  );
}
