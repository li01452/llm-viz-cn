/** Prefix public files when the static site is hosted below a project path. */
export function publicAsset(path: string): string {
    return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${path.replace(/^\/+/, '')}`;
}
