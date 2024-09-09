import {
  Apple,
  Bell,
  BriefcaseBusiness,
  Dumbbell,
  FileText,
  Heart,
  Pencil,
  Plane,
  Sparkle,
  Star,
  Sun,
  Users,
} from "lucide-react";

const ListOfIcons = {
  Sparkle,
  Star,
  Sun,
  Users,
  Apple,
  Heart,
  Bell,
  BriefcaseBusiness,
  Plane,
  FileText,
  Dumbbell,
  Pencil,
};

export type ListIcon = keyof typeof ListOfIcons;

export default ListOfIcons;
