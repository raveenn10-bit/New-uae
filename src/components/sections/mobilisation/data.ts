import { howItWorksSteps } from '@/config/manpower';

export interface MobilisationStep {
  step: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  /** 1280px square transparent render used as a 3D texture. */
  texture: string;
  /** Tightly-cropped lightweight render for mobile / fallback. */
  image: string;
  alt: string;
}

const assets = [
  {
    texture: '/scenes/05-mobilisation/step-01-requirement.webp',
    image: '/scenes/05-mobilisation/step-01-requirement-m.webp',
    alt: 'Isometric 3D engineer reviewing technical blueprints at a drafting table',
  },
  {
    texture: '/scenes/05-mobilisation/step-02-selection.webp',
    image: '/scenes/05-mobilisation/step-02-selection-m.webp',
    alt: 'Isometric 3D engineer, welder and technician in industrial PPE',
  },
  {
    texture: '/scenes/05-mobilisation/step-03-contract.webp',
    image: '/scenes/05-mobilisation/step-03-contract-m.webp',
    alt: 'Isometric 3D contract documents on a clipboard with approval check and pen',
  },
  {
    texture: '/scenes/05-mobilisation/step-04-refinery.webp',
    image: '/scenes/05-mobilisation/step-04-refinery-m.webp',
    alt: 'Isometric 3D miniature oil refinery with pipelines, crane and site vehicles',
  },
];

/** Existing four-step copy (EN + AR) from config, paired with the 3D renders. */
export const mobilisationSteps: MobilisationStep[] = howItWorksSteps.map((s, i) => ({
  ...s,
  ...assets[i],
}));

/** Scroll progress (0–1) at which each step is fully in focus. */
export const STEP_KEYS = [0.07, 0.29, 0.51, 0.73];
/** Scroll progress at which the final assembled-refinery shot completes. */
export const FINAL_KEY = 0.95;

export function activeStepFor(p: number): number {
  for (let i = STEP_KEYS.length - 1; i >= 0; i--) {
    const prev = i === 0 ? -1 : STEP_KEYS[i - 1];
    if (p >= (prev + STEP_KEYS[i]) / 2) return i;
  }
  return 0;
}
