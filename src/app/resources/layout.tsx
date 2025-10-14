import { Lora } from "next/font/google";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
