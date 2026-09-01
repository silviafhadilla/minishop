function Badge({ text, type = "danger" }) {
  const isSuccess = type === "success";

  return (
    <span
      className={`text-xs px-2 py-1 rounded font-medium ${
        isSuccess
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-red-500 text-white"
      }`}
    >
      {text}
    </span>
  );
}

export default Badge;