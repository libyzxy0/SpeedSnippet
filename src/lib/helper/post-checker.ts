import axios from "axios";

interface CheckContentType {
  isHarmful?: boolean;
  reason?: string;
}

export async function checkContent(
  content: string,
): Promise<CheckContentType | null> {
  try {
    const response = await axios.post(
      "https://speedsnippet-post-checker.onrender.com/api/v1/speed-snippet-check-content",
      {
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
