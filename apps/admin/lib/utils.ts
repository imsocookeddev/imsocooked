import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { USER_GREETINGS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function greet(hour: number) {
  if (hour < 0 || hour > 23) return "Invalid hour";
  if (hour >= 4 && hour < 12)
    return USER_GREETINGS.morning[
      Math.floor(Math.random() * USER_GREETINGS.morning.length)
    ];
  if (hour >= 12 && hour < 18)
    return USER_GREETINGS.day[Math.floor(Math.random() * USER_GREETINGS.day.length)];
  return USER_GREETINGS.evening[
    Math.floor(Math.random() * USER_GREETINGS.evening.length)
  ];
}

