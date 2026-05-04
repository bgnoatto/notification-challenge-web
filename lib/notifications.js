export function parseNotificationForm(formData) {
  const body = {
    title: formData.get("title"),
    content: formData.get("content"),
    channelCode: Number(formData.get("channelCode")),
  };
  const errors = {
    title: !body.title ? "Title is required" : undefined,
    content: !body.content ? "Content is required" : undefined,
    channelCode: !body.channelCode ? "Channel is required" : undefined,
  };
  if (Object.values(errors).some(Boolean)) return { errors };
  return { body };
}
