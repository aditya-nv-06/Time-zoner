
function UserProfile({username,email}: {username?: string, email?: string}) {
  return (
    <div className="flex items-center space-x-3">
     
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {username || "Guest User"}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {email || "No email provided"}
        </span>
      </div>
    </div>
  );
}

export default UserProfile;

