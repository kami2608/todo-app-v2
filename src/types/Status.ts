export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  IN_DEPLOY = "IN_DEPLOYMENT",
  IN_TESTING = "IN_TESTING",
  DONE = "DONE",
}

export const statusOptions: { value: Status; label: string }[] = [
  { value: Status.TODO, label: "TODO" },
  { value: Status.IN_PROGRESS, label: "IN PROGRESS" },
  { value: Status.IN_REVIEW, label: "IN REVIEW" },
  { value: Status.IN_DEPLOY, label: "IN DEPLOYMENT" },
  { value: Status.IN_TESTING, label: "IN TESTING" },
  { value: Status.DONE, label: "DONE" },
];
