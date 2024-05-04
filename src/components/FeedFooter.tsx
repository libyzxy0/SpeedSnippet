import { Button } from "@/components/ui/button";

interface FeedFooterProps {
  onLoadMorePost: () => void;
  text: string;
  actionText: string;
}

export default function FeedFooter({
  onLoadMorePost,
  text,
  actionText,
}: FeedFooterProps) {
  return (
    <div className="bg-white dark:bg-gray-950 text-center flex flex-col justify-center items-center py-8">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white pb-2">
        You're All Caught Up!
      </h1>
      <p className="text-gray-300 dark:text-vray-600 text-md py-2">{text}</p>
      <Button onClick={onLoadMorePost} className="mt-3 py-5 px-8">
        {actionText}
      </Button>
    </div>
  );
}
