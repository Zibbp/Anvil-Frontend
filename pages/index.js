import Head from "next/head";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-red-500">Home</h1>
      <div>
        The current theme is: {theme}
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>

      <div className="dark:bg-gray-800 bg-gray-200">testing the theme mode</div>
    </div>
  );
}
