export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  HIGHEST = "HIGHEST",
  URGENT = "URGENT",
}

export const priorityOptions: { value: Priority; label: string }[] = [
  { value: Priority.HIGH, label: "HIGH" },
  { value: Priority.MEDIUM, label: "MEDIUM" },
  { value: Priority.LOW, label: "LOW" },
  { value: Priority.HIGHEST, label: "HIGHEST" },
  { value: Priority.URGENT, label: "URGENT" },
];
