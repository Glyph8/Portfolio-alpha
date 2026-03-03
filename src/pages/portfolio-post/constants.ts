export const CATEGORY_MAP = {
    "Frontend": 1,
    "Backend": 2,
    "DevOps": 3,
    "Mobile": 4,
} as const;

export const CATEGORY_OPTIONS = Object.keys(CATEGORY_MAP) as (keyof typeof CATEGORY_MAP)[];