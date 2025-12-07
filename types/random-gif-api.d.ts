declare module 'random-gif-api' {
  export interface GifResult {
    url: string;
    title?: string;
    width?: number;
    height?: number;
  }

  export function fetchRandomGif(searchTerm: string): Promise<GifResult>;
}
