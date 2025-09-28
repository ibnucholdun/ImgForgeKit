import {
  ArrowLeftRight,
  Code2,
  Crop,
  Eraser,
  FileArchive,
  FileImage,
  ImagePlus,
  Ratio,
  RotateCw,
  ScanFace,
  Stamp,
  Wand2,
  ZoomIn,
} from "lucide-react";

export type ListTools = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  route: string;
};

export const listTools: ListTools[] = [
  {
    id: 1,
    name: "Compress IMAGE",
    icon: FileArchive,
    description:
      "Compress JPG, PNG, SVG, and GIF with the best quality and compression.",
    category: "Optimize",
    route: "compress-image",
  },
  {
    id: 2,
    name: "Resize IMAGE",
    icon: Ratio,
    description:
      "Define your dimensions to resize JPG, PNG, SVG or GIF. Edit your photo, profile pic, or image.",
    category: "Edit",
    route: "resize-image",
  },
  {
    id: 3,
    name: "Crop IMAGE",
    icon: Crop,
    description:
      "Crop JPG, PNG, or GIFs with a rectangle. Cut an image to your desired size with our online photo editor.",
    category: "Edit",
    route: "crop-image",
  },
  {
    id: 4,
    name: "Convert to JPG",
    icon: FileImage,
    description:
      "Join PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW to JPG. Convert and save them as JPGs.",
    category: "Convert",
    route: "convert-to-jpg",
  },
  {
    id: 5,
    name: "Convert from JPG",
    icon: ArrowLeftRight,
    description:
      "Turn JPG images to PNG and GIF format. Convert multiple JPGs to other formats in seconds!",
    category: "Convert",
    route: "convert-from-jpg",
  },
  {
    id: 6,
    name: "Photo Editor",
    icon: Wand2,
    description:
      "Sign up your pictures with text, effects, frames or stickers. Do whatever edits on your image needs.",
    category: "Create",
    route: "photo-editor",
  },
  {
    id: 7,
    name: "Upscale Image",
    icon: ZoomIn,
    description:
      "Enlarge your images with high resolution. Upscale your images by up to 4x their original size while maintaining visual quality.",
    category: "Optimize",
    route: "upscale-image",
  },
  {
    id: 8,
    name: "Remove Background",
    icon: Eraser,
    description:
      "Use our new Al-powered tool to cut out backgrounds with ease.",
    category: "Optimize",
    route: "remove-background",
  },
  {
    id: 9,
    name: "Watermark IMAGE",
    icon: Stamp,
    description:
      "Stamp an image or text over your images. Choose the typography, transparency, and position.",
    category: "Security",
    route: "watermark-image",
  },
  {
    id: 10,
    name: "Meme Generator",
    icon: ImagePlus,
    description:
      "Create your memes online with our fast and easy-to-use editor. Choose your template or upload custom memes.",
    category: "Create",
    route: "meme-generator",
  },
  {
    id: 11,
    name: "Rotate IMAGE",
    icon: RotateCw,
    description:
      "Rotate several JPGs, PNGs or GIFs at the same time. Rotate landscape or portrait images!",
    category: "Edit",
    route: "rotate-image",
  },
  {
    id: 12,
    name: "HTML to IMAGE",
    icon: Code2,
    description:
      "Convert HTML/CSS to high-quality images. Capture your web designs as images effortlessly.",
    category: "Convert",
    route: "html-to-image",
  },
  {
    id: 13,
    name: "Blur face",
    icon: ScanFace,
    description:
      "Blur faces in your images with ease. Protect privacy or create artistic effects.",
    category: "Security",
    route: "blur-face",
  },
];
