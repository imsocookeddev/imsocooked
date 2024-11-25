export default {
  name: "I'm So Cooked",
  admin: {
    tabs: [
      { name: "Overview", url: "/" },
      { name: "Users", url: "/users" },
      { name: "Cuisines", url: "/cuisines" },
      { name: "Countries", url: "/countries" },
      { name: "Lessons", url: "/lessons" },
      { name: "Problems", url: "/problems" },
      { name: "Problem Categories", url: "/categories" },
    ],
  },
  roles: ["user", "admin"],
  problem_types: [
    "mulitple_choice",
    "drag-n-drop",
    "matching",
    "single_word_response",
  ],
  defaultHearts: 5,
  defaultImageURL:"https://cpsaxb6waydelzll.public.blob.vercel-storage.com/kitty-UVMd9CJBBFxJ1MUifj0lysaqPkUGUT.jpeg"
} as const;
