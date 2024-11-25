import z from "zod";
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
  problemTypes: {
      "mulitple_choice":{
        name:"Multiple Choice",
        contentSchema:z.string().array().min(1),
        answerSchema:z.string().min(1),
      },
    
      "drag-n-drop":{
        name:"Drag and Drop",
        contentSchema:z.string().array().min(1),
        answerSchema:z.string().min(1),
      },
      "matching":{
        name:"Matching",
        contentSchema:z.object({
          left:z.string().array().min(1),
          right:z.string().array().min(1),
        }),
        answerSchema:z.record(z.string().min(1),z.string().min(1)),
      },
      "single_word_response":{
        name:"Single Word Response",
        // This one really does not need a content schema
        contentSchema:z.string().min(1),
        answerSchema:z.string().min(1),
      },
    },
  defaultHearts: 5,
  defaultImageURL:"https://cpsaxb6waydelzll.public.blob.vercel-storage.com/kitty-UVMd9CJBBFxJ1MUifj0lysaqPkUGUT.jpeg"
} as const;
