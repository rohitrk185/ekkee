export async function submitAnswers(answers: Record<string, string[]>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function submitCurQuestionSelection(
  questionId: number,
  selections: string[],
  submissionDocId?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/submit/${questionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selections,
        submissionDocId: submissionDocId || null,
      }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}
