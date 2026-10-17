export interface UserProgress {
  readonly bookmarked: boolean;
  readonly completed: boolean;
  readonly updatedAt: number;
}

export interface TopicProgress extends UserProgress {
  readonly note: string;
}