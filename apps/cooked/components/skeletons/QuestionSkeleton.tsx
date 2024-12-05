import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export function QuestionSkeleton() {
  return (
    <ContentLoader foregroundColor="#F3ECE2">
      <Rect x="0" y="20" rx="5" ry="5" width="100%" height="80" />
      <Rect x="0" y="250" rx="5" ry="5" width="100%" height="40" />
      <Rect x="0" y="300" rx="5" ry="5" width="100%" height="40" />
      <Rect x="0" y="350" rx="5" ry="5" width="100%" height="40" />
      <Rect x="0" y="400" rx="5" ry="5" width="100%" height="40" />
    </ContentLoader>
  );
}
