export function getUsername(user: any): string {
  const provider = user.app_metadata.provider;
  let username = "";
  switch (provider) {
    case "email":
      username = user.user_metadata.username;
      break;
    case "google":
      username = user.user_metadata.full_name.split(" ").join("").toLowerCase();
      break;
    case "github":
      username = user.user_metadata.user_name;
      break;
    default:
      username = "";
  }
  return username;
}
