export interface Gif {
    id: string;
    title: string;
    images: {
      fixed_height: {
        url: string;
      };
      original: {
        url: string;
      };
    };
    user?: {
      username: string;
    };
    import_datetime: string;
  }