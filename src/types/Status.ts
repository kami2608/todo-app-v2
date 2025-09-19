export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN PROGRESS",
  IN_REVIEW = "IN REVIEW",
  DEPLOY = "DEPLOY",
  IN_TESTING = "IN TESTING",
  DONE = "DONE",
}

export const statusOptions: { value: Status; label: string }[] = [
  { value: Status.TODO, label: "TODO" },
  { value: Status.IN_PROGRESS, label: "PROGRESS" },
  { value: Status.DONE, label: "DONE" },
  { value: Status.DEPLOY, label: "DEPLOY" },
  { value: Status.IN_REVIEW, label: "IN REVIEW" },
  { value: Status.IN_TESTING, label: "IN TESTING" },
];
