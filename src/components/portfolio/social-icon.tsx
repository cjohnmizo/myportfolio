import type { ComponentType } from "react";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import type { SocialPlatform } from "@/types/portfolio";

const iconMap = {
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
} satisfies Record<SocialPlatform, ComponentType<{ className?: string }>>;

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = iconMap[platform];
  return <Icon className={className} />;
}
