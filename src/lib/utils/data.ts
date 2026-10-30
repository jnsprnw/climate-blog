import postsData from '#posts' with { type: 'json' };
import entitiesData from '#entities' with { type: 'json' };
import linksData from '#links' with { type: 'json' };
import type { Entity, Link } from '#types/network';
import type { Post } from '#types/post';

// Typed access to the generated JSON files in src/data. The inferred JSON types are too
// narrow (e.g. empty arrays become `never[]`), so they are cast to the documented shapes.

export const posts = postsData as unknown as Post[];
export const entities = entitiesData as Entity[];
export const links = linksData as Link[];
