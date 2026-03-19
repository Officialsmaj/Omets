/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin' | 'expert';
  firstName?: string;
  lastName?: string;
  country?: string;
  dateOfBirth?: string;
  verified?: boolean;
  omtBalance?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  image: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  instructor: string;
  description: string;
  image: string;
}

export interface Consultation {
  id: string;
  category: string;
  expertId: string;
  date: string;
  time: string;
  problem: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
}
