import { FC } from "react"

export interface SocialItem {
  id: number;
  icon: FC<{ className?: string }>;
  address: string;
  url: string; 
}